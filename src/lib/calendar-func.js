import { getPresences } from "../state/presences/presence-actions";

export function onCalendarClick(date, setDate, dispatch) {
	if (!date instanceof Date) return "value.date should be an instanceof Date";

	setDate(() => date);

	getPresences(`/presence/list/${_id}?date=${date}`)(dispatch);
}
