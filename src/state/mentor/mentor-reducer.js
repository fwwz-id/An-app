import {
    GET_MENTOR_REQUEST,
    GET_MENTOR_SUCCESS,
    GET_MENTOR_FAILURE,
} from "./mentor-types";

const initState = {
    isLoading: true,
    isError: false,
    message: "",
    data: [],
};

const mentorReducer = (state = initState, action) => {
    const { type, payload } = action;

    switch (type) {
        case GET_MENTOR_REQUEST:
            return {
                ...state,
                isLoading: true,
            };
        case GET_MENTOR_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isError: false,
                data: payload,
            };
        case GET_MENTOR_FAILURE:
            return {
                ...state,
                isLoading: false,
                isError: true,
                message: payload,
            };

        default:
            return state;
    }
};

export default mentorReducer;
