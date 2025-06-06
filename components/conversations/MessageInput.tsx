import React from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface MessageInputProps {
    placeholder?: string;
    id: string;
    type?: string;
    required: boolean;
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors;
}

const MessageInput: React.FC<MessageInputProps> = ({
    placeholder,
    id,
    type,
    required,
    register,
}) => {
    return (
        <div className={"relative w-full"}>
            <input
                id={id}
                type={type}
                autoComplete={id}
                {...register(id, { required })}
                placeholder={placeholder}
                className={
                    "text-black dark:text-white font-light py-2 px-4 bg-neutral-200 dark:bg-gray-800 w-full rounded-full focus:outline-none focus:ring-0 border-none"
                }
            />
        </div>
    );
};

export default MessageInput;
