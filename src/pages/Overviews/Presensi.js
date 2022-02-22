import { useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";

import { RoleContext } from "../../context/role-context";

import Input from "../../components/atoms/Input";
import Preload from "../../components/molecules/Preload";
import Calendar from "../../components/molecules/Calendar";
import Sweetalert from "../../components/molecules/Sweetalert";
import Card from "../../components/molecules/Card";
import Layout from "../../components/organism/Layout";

//utils | lib
import "../../lib/_locale";
import dayjs from "dayjs";
import { api } from "../../config/axios/apiClient";

// custom vars
const select_options = [
	{ key: "Hadir", value: "hadir" },
	{ key: "Sakit", value: "sakit" },
	{ key: "Ijin", value: "ijin" },
	{ key: "Alpha", value: "alpha" },
];

const times = {
	dawn: {
		start: 4,
		end: 6,
	},
	dusk: {
		start: 15,
		end: 17,
	},
};

function Presensi() {
	const dispatch = useDispatch();
	const { auth, mentor, moderator } = useSelector((state) => state);

	const { content } = useContext(RoleContext);
	const [isPagi, setIsPagi] = useState(true);
	const [calendar, setCalendar] = useState(
		dayjs().hour(6).minute(0).second(0).millisecond(0).toDate()
	);
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [data, setData] = useState(content.data);

	const condition =
		!content.isLoading && !content.isError && content.data.length;

	console.log(getIndexOf(data, calendar));

	const handleSubmission = () => {
		const validRole = ["koordinator", "pengampu"];

		return api({
			method: "PATCH",
			url: `/mentor/${auth.as._id}`,
			data,
		})
			.then((res) => console.log(res))
			.catch((err) => console.log(err));
	};

	return (
		<Layout>
			<Preload isLoading={content.isLoading} />
			{isDialogOpen && (
				<Sweetalert
					isOpen={isDialogOpen}
					message="Are you sure?"
					className="space-y-4">
					<p>
						You're about to update this content. It may make a
						change for your content
					</p>
					<div className="text-right space-x-2">
						<button
							className="btn btn-primary"
							onClick={() => handleSubmission()}>
							Sure
						</button>
						<button
							className="btn border-sky-500 border rounded"
							onClick={() => setIsDialogOpen(false)}>
							Nope
						</button>
					</div>
				</Sweetalert>
			)}
			<section className="container">
				<header className="py-2">
					<h1>Presence</h1>

					<div className="my-4">
						<Calendar date={calendar} setter={setCalendar} />
					</div>
				</header>

				<main className="pt-1 pb-2 space-y-3">
					<div className="flex space-x-2 my-2">
						<button
							className={`btn borde rounded font-bold w-full md:w-60 transition-colors duration-300 ${
								isPagi
									? "bg-sky-500 text-white border-sky-500"
									: "bg-white text-gray-800 border-white"
							}`}
							onClick={() => setIsPagi(true)}>
							Pagi
						</button>
						<button
							className={`btn border rounded font-bold w-full md:w-60 transition-colors duration-300 ${
								isPagi
									? "bg-white text-gray-800 border-white"
									: "bg-sky-500 text-white border-sky-500"
							}`}
							onClick={() => setIsPagi(false)}>
							Sore
						</button>
					</div>

					{content.data.map(({ username, presences }, index) => {
						
						const current = mapData(presences, calendar, isPagi);
						console.log(current);

						return (
							<Card
								className="relative bg-gray-800 text-white"
								key={index}>
								<div className="flex items-center py-1 justify-between">
									<p className="border-white border-b font-bold">
										{username}
									</p>
									<select
										name="presensi"
										id="presensi"
										className="text-gray-800"
										defaultValue={current.status.toLowerCase()}
										onChange={(evt) =>
											handlePresenceSelect(
												evt,
												setData,
												index,
												calendar,
												isPagi
											)
										}>
										{select_options.map(
											({ key, value }) => (
												<option key={key} value={value}>
													{key}
												</option>
											)
										)}
									</select>
								</div>
								<Input
									size="text-sm"
									placeholder="Tambahkan keterangan jika tidak hadir (optional)."
									defaultValue={current.description}
								/>
							</Card>
						);
					})}

					{
						// !condition ? (
						// 	<p className="text-trueGray-600 opacity-50 text-center font-bold">
						// 		No data found.
						// 	</p>
						// ) : null}
						// <ButtonSubmit
						// 	handler={setIsDialogOpen} //isDisabled={handleDisabledButton(calendar.getHours())}
						// />
					}
				</main>
			</section>
		</Layout>
	);
}

// component
function ButtonSubmit({ handler, isDisabled, ...props }) {
	return (
		<div className="text-right">
			<button
				className="btn btn-primary disabled:bg-sky-900 disabled:bg-opacity-50 disabled:cursor-not-allowed"
				onClick={() => handler(true)}
				disabled={isDisabled || false}
				{...props}>
				Submit
			</button>
		</div>
	);
}
// end of component

function mapData(obj, comparter, isPagi) {
	const { dawn, dusk } = times;
	const _comparter = dayjs(comparter).format("YYYY-MM-DDTH").split("T");

	const x = obj.filter(({ date }, i) => {
		const _format = dayjs(date).format("YYYY-MM-DDTH");
		const _date = _format.split("T");

		const _match = _date[0] === _comparter[0];
		const _dawn = _date[1] >= dawn.start && _date[1] <= dawn.end;
		const _dusk = _date[1] >= dusk.start && _date[1] <= dusk.end;

		if (_match) {
			if (isPagi && _dawn) {
				return obj[i];
			}

			if (!isPagi && _dusk) {
				return obj[i];
			}
		}

		return null;
	});

	if (x.length < 1) {
		return {
			date: dayjs(comparter).toISOString(),
			status: "Alpha",
			description: "",
		};
	}

	return x[0];
}

function handleDisabledButton(currentTime) {
	const { dawn, dusk } = times;

	if (
		(currentTime >= dawn.start && currentTime <= dawn.end) ||
		(currentTime >= dusk.start && currentTime <= dusk.end)
	) {
		return false;
	}

	return true;
}

function handlePresenceSelect(evt, setState, index, date, isPagi) {
	const { value } = evt.target;

	setState((prevState) => [
		...prevState.slice(0, index),
		{
			...prevState[index],
			presences: [
				...prevState[index]["presences"].slice(
					0,
					getIndexOf(prevState[index]["presences"], date, isPagi)
				),
			],
		},
		...prevState.slice(index + 1),
	]);
}

function handleDescriptionChange(evt, setState, index) {
	const { value } = evt.target;

	setState((prevState) => [
		...prevState.slice(0, index),
		{
			...prevState[index],
			presence: {
				...prevState[index]["presence"],
				description: value,
			},
		},
		...prevState.slice(index + 1),
	]);
}

// x value is bool that represent value of isPagi
function getIndexOf(n, m, x) {
	const _m = dayjs(m);

	const _index = n.findIndex((value, index, self) => {
		const _date = value.date;
		const _n = dayjs(_date);

		const result = x
			? _n.hour() >= _m.hour() && _n.hour() <= _m.hour()
				? true
				: false
			: _n.hour() >= _m.hour() && _n.hour <= _m.hour()
			? true
			: false;

		return result;
	});

	return _index;
}

export default Presensi;
