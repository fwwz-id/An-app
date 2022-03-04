import { api } from "../../config/axios/apiClient";
import { GET_PRESENCES, //ADD_PRESENCES, EDIT_PRESENCES, 
	ERROR } from "./presence-types";

export function getPresences(url) {
	return (dispatch) => {
		return api({
			method: "GET",
			url,
		})
			.then((response) => {
				const {
					data
				} = response;

				dispatch({type: GET_PRESENCES, payload: data})
			})
			.catch(() => dispatch({type: ERROR, payload: []}));
	};
}
