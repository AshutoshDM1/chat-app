"use client"
import React from 'react';
import {FullConversationType} from "@/types";
// import {useRouter} from "next/navigation";
import useConversation from "@/hooks/conversations/useCurrentConversation";
import clsx from "clsx";
import {MdOutlineGroupAdd} from "react-icons/md";
import ConversationBox from "@/components/conversations/ConversationBox";
import {User} from "@prisma/client";
// import {find} from "lodash";

interface ConversationListProps {
    initialItems: FullConversationType[];
    users: User[];
}

const ConversationList: React.FC<ConversationListProps> = ({ initialItems }) => {
    const items = initialItems; // Removed setItems since it's unused
    const { conversationId, isOpen } = useConversation();

    return (
        <>
            <aside className={clsx(`fixed inset-y-0 pb-20 lg:pb-0 lg:left-20 lg:w-80 lg:block overflow-y-auto border-r border-gray-200`, isOpen ? "hidden" : "block w-full left-0")}>
            <div className={"px-5"}>
                <div className={"flex justify-between mb-4 pt-4"}>
                    <div className={"text-2xl font-bold text-neutral-800"}>
                        Messages
                    </div>
                    <div className={"rounded-full p-2 bg-gray-100 text-gray-600 cursor-pointer hover:opacity-75 transition"}>
                        <MdOutlineGroupAdd size={20}/>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-900">
                    {items.map((item) => (
                        <ConversationBox key={item.id} data={item} selected={conversationId === item.id}/>
                    ))}
                </div>
            </div>
        </aside>
        </>
    );
};

export default ConversationList;