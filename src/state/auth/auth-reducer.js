import {
    LOGIN_ERROR,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGOUT,
} from "./auth-types";

const initialAuthState = {
    isLoading: true,
    isError: false,
    loggedIn: false,
    as: {
        username: "",
        role: "",
        _id: "",
    },
};

const authReducer = (state = initialAuthState, action) => {
    const { type, payload } = action;

    switch (type) {
        case LOGIN_REQUEST:
            return {
                ...state,
                isLoading: true,
            };

        case LOGIN_SUCCESS:
            return {
                ...state,
                isLoading: false,
                loggedIn: payload.auth,
                as: payload.as,
            };

        case LOGIN_ERROR:
            return {
                ...state,
                isLoading: false,
                loggedIn: false,
                isError: payload,
            };

        case LOGOUT:
            return {
                ...state,
                isLoading: false,
                loggedIn: false,
                as: {
                    username: "",
                    role: "",
                    profile_id: "",
                },
            };

        default:
            return state;
    }
};

export default authReducer;
