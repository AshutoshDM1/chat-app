"use client";
import React from "react";
import clsx from "clsx";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface InputProps {
    label?: string;
    id: string;
    type?: string;
    required?: boolean;
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors;
    disabled?: boolean;
    placeholder?: string;
    className?: string;
}

const Input: React.FC<InputProps> = ({
    label,
    id,
    type,
    required,
    register,
    errors,
    disabled,
    placeholder,
    className,
}) => {
    return (
        <div>
            <label
                className={
                    "block text-sm font-medium leading-6 text-gray-900 dark:text-gray-300"
                }
                htmlFor={id}
            >
                {label}
            </label>
            <div className={"mt-2"}>
                <input
                    id={id}
                    type={type}
                    autoComplete={id}
                    disabled={disabled}
                    placeholder={placeholder}
                    {...register(id, { required })}
                    className={clsx(
                        `
                        form-input
                        block
                        w-full
                        rounded-md
                        border-0
                        py-1.5
                        text-gray-900
                        dark:text-gray-100
                        dark:bg-gray-800
                        shadow-sm
                        ring-1
                        ring-inset
                        ring-gray-300
                        dark:ring-gray-700
                        placeholder:text-gray-400
                        dark:placeholder:text-gray-500
                        focus:ring-2
                        focus:ring-inset
                        focus:ring-purple-600
                        dark:focus:ring-purple-500
                        sm:text-sm
                        sm:leading-6
                        `,
                        errors[id] && "focus:ring-rose-500",
                        disabled && "opacity-50 cursor-default",
                        className,
                    )}
                />
            </div>
        </div>
    );
};

export default Input;
