import { memo } from "react";
import { useDispatch } from "react-redux";

import useCalendar from "../../hooks/useCalendar";

import { BiChevronUpCircle, BiChevronDownCircle } from "react-icons/bi";
import ButtonIcon from "../atoms/ButtonIcon";

import { getPresences } from "../../state/presences/presence-actions";

function Calendar({ date = new Date(), setDate, id }) {
	const {
		// variables
		days,
		months,

		// states
		currentDate,
		selectedDate,
		setCurrentDate,
		setSelectedDate,

		// functions
		renderCalendar,
		handleNextButton,
		handlePrevButton,
	} = useCalendar(date);

	const dispatch = useDispatch();

	// when you change the date, time will automatically set to 00:00:00
	// and this function below will handle time every selected date
	// this will set time to current time, not reset time to 00:00:00
	// ------------- example -------------------
	// current date is Sun 23 Jan 2022. 09:42:50
	// then you change the date to Mon 24 Jan 2022.
	//      automatically the date will reset to 00:00:00
	//      so it'll become Mon 24 Jan 2022. 00:00:00, instead of Mon 24 Jan 2022. 09:42:50
	function handleCalendarOnClick(selected) {
		if(!selected instanceof Date){
			return 'Param should be an instanceof Date';
		}

		selected.setHours(new Date(Date.now()).getHours());
		selected.setMinutes(new Date(Date.now()).getMinutes());
		selected.setSeconds(new Date(Date.now()).getSeconds());
		selected.setMilliseconds(new Date(Date.now()).getMilliseconds());

		getPresences(`/presence/list/${id}?date=${selected.toISOString()}`)(dispatch);
		
		setSelectedDate(selected);
		setCurrentDate(selected);
		setDate(selected);
	}

	return (
		<div className="calendar">
			<div className="calendar--calendar-label">
				<div className="calendar--calendar-label--label-text">
					<p className="font-bold">
						{months[selectedDate.getMonth()]}
					</p>
					<p className="text-xs">{selectedDate.getFullYear()}</p>
				</div>
				<div className="calendar--calendar-label--buttons">
					<ButtonIcon
						className="calendar--calendar-label--buttons--button"
						onClick={() => handlePrevButton()}>
						<BiChevronUpCircle />
					</ButtonIcon>
					<ButtonIcon
						className="calendar--calendar-label--buttons--button"
						onClick={() => handleNextButton()}>
						<BiChevronDownCircle />
					</ButtonIcon>
				</div>
			</div>
			<div className="calendar--calendar-views">
				<div className="calendar--calendar-views--weekdays">
					{days.map((day, key) => (
						<div key={key}>{day}</div>
					))}
				</div>
				<div className="calendar--calendar-views--dates">
					{
						//
						renderCalendar().map(({ date, classess }, key) => (
							<div
								className={`calendar--calendar-views--dates--date ${classess} ${
									date.getFullYear() ===
										currentDate.getFullYear() &&
									date.getMonth() ===
										currentDate.getMonth() &&
									date.getDate() === currentDate.getDate()
										? "date-now"
										: ""
								}`}
								key={key}
								onClick={() => handleCalendarOnClick(date)}>
								{date.getDate()}
							</div>
						))
					}
				</div>
			</div>
		</div>
	);
}

export default memo(Calendar);
