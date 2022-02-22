import { api } from "../../config/axios/apiClient";
import jwtDecode from "jwt-decode";
import {
    LOGIN_ERROR,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGOUT,
} from "./auth-types";

export const login = (method = "POST", payload) => {
    return (dispatch) => {
        dispatch({ type: LOGIN_REQUEST });

        if (method === "POST") {
            api({
                method,
                data: payload,
                url: "/login",
            })
                .then((response) => {
                    const { token } = response.data;

                    const data = jwtDecode(token);

                    return dispatch({
                        type: LOGIN_SUCCESS,
                        payload: {
                            auth: data.auth,
                            as: {
                                username: data.username,
                                role: data.role,
                                _id: data.id,
                            },
                        },
                    });
                })
                .catch(() => {
                    dispatch({ type: LOGIN_ERROR, payload: true });
                });
        }

        if (method === "GET") {
            api({
                method,
                url: "/login",
            })
                .then((response) => {
                    const { data } = response;

                    if (data) {
                        const {
                            auth,
                            username,
                            role,
                            id: _id,
                        } = jwtDecode(data);

                        return dispatch({
                            type: LOGIN_SUCCESS,
                            payload: {
                                auth: auth,
                                as: {
                                    username,
                                    role,
                                    _id,
                                },
                            },
                        });
                    }

                    if (!data) {
                        const error = new Error(
                            "Sessions or Cookies are not found"
                        );
                        error.status = 401;
                        console.log(error)
                        throw error;
                    }
                })
                .catch(() => {
                    dispatch({ type: LOGIN_ERROR, payload: false });
                });
        }
    };
};

export const logout = () => {
    return (dispatch) => {
        api({
            method: "GET",
            url: "/logout",
        }).then(() => {
            dispatch({ type: LOGOUT });
        });
    };
};
