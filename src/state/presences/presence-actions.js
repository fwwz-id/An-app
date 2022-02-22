import { api } from "../../config/axios/apiClient";
import { GET_PRESENCES, ADD_PRESENCES, EDIT_PRESENCES, ERROR } from "./presence-types";

export function getPrensences(url) {
	return (dispatch) => {
		return api({
			method: "GET",
			url,
		})
			.then((response) => {
				const {
					data: { message },
				} = response;

				dispatch({type: GET_PRESENCES, payload: message})
			})
			.catch(() => dispatch({type: ERROR, payload: []}));
	};
}
