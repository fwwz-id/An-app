import { createContext, useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";

export const RoleContext = createContext();

function RoleProvider({ children }) {
    const {
        auth: { loggedIn, as },
        mentor,
        moderator,
    } = useSelector((state) => state);
    const [formatedRole, setFormatedRole] = useState(null);
    const [content, setContent] = useState(null);

    // function
    const handleSetState = useCallback(() => {
        if (loggedIn) {
            if (as.role === "moderator") {
                setContent(moderator);
                return setFormatedRole("Koordinator");
            }

            if (as.role === "mentor") {
                setContent(mentor);
                return setFormatedRole("Pengampu");
            }
        }
    }, [loggedIn, as, mentor, moderator]);

    useEffect(() => {
        handleSetState();
    }, [handleSetState]);

    return (
        <RoleContext.Provider value={{ formatedRole, content, setContent }}>
            {children}
        </RoleContext.Provider>
    );
}

export default RoleProvider;
