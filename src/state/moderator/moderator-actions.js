import { api } from "../../config/axios/apiClient";
import {
    GET_MODERATOR_FAILURE,
    GET_MODERATOR_REQUEST,
    GET_MODERATOR_SUCCESS,
} from "./moderator-types";

export const fetchModerator = (path) => {
    const url = `/moderators${path ? path : ''}`;

    return (dispatch) => {
        dispatch({ type: GET_MODERATOR_REQUEST });

        api({
            method: "GET",
            url,
        })
            .then((response) => {
                const { data } = response.data;

                dispatch({
                    type: GET_MODERATOR_SUCCESS,
                    payload: data.mentors,
                });
            })
            .catch(() => {
                dispatch({
                    type: GET_MODERATOR_FAILURE,
                });
            });
    };
};
