import {
    GET_MENTOR_REQUEST,
    GET_MENTOR_SUCCESS,
    GET_MENTOR_FAILURE,
} from "./mentor-types";

import { api } from "../../config/axios/apiClient";

// fetch all mentors
export const fetchMentors = () => {
    return (dispatch) => {
        dispatch({ type: GET_MENTOR_REQUEST });
        api({
            method: "GET",
            url: "/mentors",
        })
            .then((response) => {
                const { data } = response.data;

                dispatch({ type: GET_MENTOR_SUCCESS, payload: data });
            })
            .catch((err) => {
                dispatch({ type: GET_MENTOR_FAILURE, payload: err.message });
            });
    };
};

// function that trigger after logged in
// the "id" will be taken from auth.as._id
export const fetchMentor = (path) => {
    const url = `/mentors${path ? path : ""}`;

    return (dispatch) => {
        dispatch({ type: GET_MENTOR_REQUEST });

        api({
            method: "GET",
            url,
        })
            .then((response) => {
                const { data } = response.data;
                dispatch({ type: GET_MENTOR_SUCCESS, payload: data.disciples });
            })
            .catch((err) =>
                dispatch({ type: GET_MENTOR_FAILURE, payload: err.message })
            );
    };
};
