import { memo } from "react";

function ButtonIcon({ className, children, ...props }) {
    return (
        <button className={`btn-icon ${className ? className : ""}`} {...props}>
            {children}
        </button>
    );
}

export default memo(ButtonIcon);
