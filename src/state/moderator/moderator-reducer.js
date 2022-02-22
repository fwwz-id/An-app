const {
    GET_MODERATOR_REQUEST,
    GET_MODERATOR_SUCCESS,
    GET_MODERATOR_FAILURE,
} = require("./moderator-types");

const initialState = {
    isLoading: true,
    isError: false,
    data: [],
};

const moderatorReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case GET_MODERATOR_REQUEST:
            return {
                ...state,
                isLoading: true,
            };
        case GET_MODERATOR_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isError: false,
                data: payload,
            };
        case GET_MODERATOR_FAILURE:
            return {
                ...state,
                isLoading: false,
                isError: true,
                data: [],
            };

        default:
            return state;
    }
};

export default moderatorReducer;
