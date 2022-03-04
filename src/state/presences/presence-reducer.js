import { GET_PRESENCES, //EDIT_PRESENCES, ADD_PRESENCES, 
    ERROR } from "./presence-types";

const initialState = {
    isLoading: true,
    isError: false,
	data: [],
};

const presencesReducer = (state = initialState, action) => {
	const { type, payload } = action;

	switch (type) {
        case GET_PRESENCES:
            return {
                ...state,
                isLoading: false,
                isError: false,
                data: payload
            }
        case ERROR:
            return {
                ...state,
                data: payload,
                isLoading: false,
                isError: true,
            }
        default:
            return state
	}
};

export default presencesReducer;