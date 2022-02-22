function Card({ className, children, ...props }) {
    return (
        <div
            className={`shadow-md rounded box-border p-4 ${
                className ? className : ""
            }`}
            {...props}
        >
            {children}
        </div>
    );
}

export default Card;
