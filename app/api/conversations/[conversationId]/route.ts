import { NextResponse } from "next/server";
import getCurrentUser from "@/hooks/users/getCurrentUser";
import { db } from "@/lib/db";
import { pusherServer } from "@/lib/pusher";

interface IParams {
    conversationId?: string;
}

export async function DELETE(
    request: Request,
    { params }: { params: IParams },
) {
    try {
        const { conversationId } = params;
        const currentUser = await getCurrentUser();

        if (!currentUser?.id) {
            return new Response("Unauthorized", { status: 401 });
        }

        const existingConversation = await db.conversation.findUnique({
            where: {
                id: conversationId,
            },
            include: {
                users: true,
            },
        });

        if (!existingConversation) {
            return new NextResponse("Invalid ID", { status: 400 });
        }

        const deletedConversation = await db.conversation.deleteMany({
            where: {
                id: conversationId,
                users: {
                    some: {
                        id: currentUser.id,
                    },
                },
            },
        });

        existingConversation.users.forEach((user) => {
            if (user.email) {
                pusherServer.trigger(
                    user.email,
                    "conversation:remove",
                    existingConversation,
                );
            }
        });

        return NextResponse.json(deletedConversation);
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.log(error.message, "ERROR_CONVERSATION_DELETE");
        }
        return new NextResponse("Internal Error", { status: 500 });
    }
}
