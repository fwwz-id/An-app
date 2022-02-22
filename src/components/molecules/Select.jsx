import { Children, isValidElement, cloneElement, useState, memo } from "react";

import ButtonIcon from "../atoms/ButtonIcon";

import { BiChevronDown } from "react-icons/bi";

function Select({
    children,
    value,
    setValue,
    selectedClassName,
    optionsClassName,
}) {
    const [isOpen, setIsOpen] = useState(false);

    function handleSelectOpen(evt) {
        evt.preventDefault();

        setIsOpen(!isOpen);
    }

    return (
        <div className="dropdown-select" onClick={(e) => handleSelectOpen(e)}>
            <ButtonIcon
                className={`dropdown-select--current-value ${selectedClassName}`}
            >
                <span>{value}</span>
                <BiChevronDown
                    className={`transition-transform duration-300 ${
                        isOpen && "rotate-180"
                    }`}
                />
            </ButtonIcon>
            <div
                className={`dropdown-select--options ${optionsClassName} ${
                    isOpen ? "scale-y-100 opacity-1" : "scale-y-0 opacity-0"
                }`}
            >
                {Children.map(children, (child) => {
                    if (isValidElement(child)) {
                        return cloneElement(child, {
                            setValue,
                        });
                    }
                    return child;
                })}
            </div>
        </div>
    );
}

export default memo(Select);
