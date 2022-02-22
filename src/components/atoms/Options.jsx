import { useRef, memo } from "react";

function Options({ value, setValue, className }) {
    const ref = useRef();

    return (
        <div
            ref={ref}
            className={`dropdown-select--options--option ${className}`}
            data-value={value}
            onClick={() => setValue(ref.current.dataset.value)}
        >
            {value}
        </div>
    );
}

export default memo(Options);
