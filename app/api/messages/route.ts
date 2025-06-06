import { NextResponse } from "next/server";
import getCurrentUser from "@/hooks/users/getCurrentUser";
import { db } from "@/lib/db";
import { pusherServer } from "@/lib/pusher";

export async function POST(request: Request) {
    try {
        const currentUser = await getCurrentUser();
        const body = await request.json();
        const { message, image, conversationId } = body;

        if (!currentUser?.id || !currentUser?.email) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const newMessage = await db.message.create({
            data: {
                body: message,
                image: image,
                conversation: {
                    connect: {
                        id: conversationId,
                    },
                },
                sender: {
                    connect: {
                        id: currentUser.id,
                    },
                },
                seenBy: {
                    connect: {
                        id: currentUser.id,
                    },
                },
            },
            include: {
                seenBy: true,
                sender: true,
            },
        });

        await pusherServer.trigger(conversationId, "messages:new", {
            ...newMessage,
            conversationId,
        });

        await db.conversation.update({
            where: {
                id: conversationId,
            },
            data: {
                lastMessageAt: new Date(),
            },
        });

        const conversation = await db.conversation.findUnique({
            where: { id: conversationId },
            include: { users: true },
        });

        if (conversation) {
            conversation.users.forEach((user) => {
                if (user.email) {
                    pusherServer.trigger(user.email, "conversation:update", {
                        id: conversationId,
                        lastMessageAt: new Date(),
                        lastMessage: newMessage,
                    });
                }
            });
        }

        return NextResponse.json(newMessage);
    } catch (error) {
        console.log(error, "ERROR_MESSAGES");
        return new NextResponse("Internal Error", { status: 500 });
    }
}
