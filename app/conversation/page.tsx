'use client';

import clsx from "clsx";
import useConversation from "@/hooks/conversations/useCurrentConversation";
import EmptyState from "@/components/Empty-state";

const Home = () => {
    const { isOpen } = useConversation();

    return (
        <div
            className={clsx(
                "lg:pl-80 h-full lg:block",
                isOpen ? 'block' : 'hidden'
            )}
        >
            <EmptyState />
        </div>
    );
}

export default Home;