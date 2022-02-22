import React from "react";

function Input({ color, size, type, placeholder, ...props }) {
    return (
        <input
            type={type || "text"}
            placeholder={placeholder}
            className={`py-2 bg-transparent w-full border-b focus:outline-none ${
                color || "border-white text-white"
            } ${size || "text-sm"}`}
            {...props}
        />
    );
}

export default Input;
