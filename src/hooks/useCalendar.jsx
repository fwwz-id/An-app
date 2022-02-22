import { useState } from "react";

const days = ["Ahad", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];
const months = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
];

export default function useCalendar(now = new Date()) {
    const [currentDate, setCurrentDate] = useState(now);
    const [selectedDate, setSelectedDate] = useState(now);

    // functions
    function renderCalendar() {
        const totalDaysInMonth = [];
        // basically, we need to know what day of
        // currently selected date is started,
        // so, the calendar becomes accurate
        // e.g November 2021 has Monday as its first day
        // and Tuesday as its last day

        // to achieve that,
        // we keep the first date and first day,
        // so we can use that for conditioning

        // first date of currently selected date
        const startOfCurrentSelectedDate = new Date(
            selectedDate.getFullYear(),
            selectedDate.getMonth(),
            1
        ).getDate();
        // last date or end date of currently selected date
        const endOfCurrentSelectedDate = new Date(
            selectedDate.getFullYear(),
            selectedDate.getMonth() + 1,
            0
        ).getDate();

        // first day of currently selected date
        const firstDayOfSelectedDate = new Date(
            selectedDate.getFullYear(),
            selectedDate.getMonth(),
            1
        ).getDay();

        // last day of currently selected date
        const lastDayOfSelectedDate = new Date(
            selectedDate.getFullYear(),
            selectedDate.getMonth() + 1,
            0
        ).getDay();

        // append total days in month
        for (
            let i = startOfCurrentSelectedDate;
            i <= endOfCurrentSelectedDate;
            i++
        ) {
            const date = new Date(
                selectedDate.getFullYear(),
                selectedDate.getMonth(),
                i
            );

            if (i <= endOfCurrentSelectedDate) {
                totalDaysInMonth.push({
                    classess: "",
                    date,
                });
            }
        }

        // append prev days and after
        if (firstDayOfSelectedDate !== 0) {
            const temp = [];
            for (let i = firstDayOfSelectedDate; i > 0; i--) {
                const date = new Date(
                    selectedDate.getFullYear(),
                    selectedDate.getMonth(),
                    1 - i
                );

                temp.push({
                    classess: "date-prev",
                    date,
                });
            }
            // append in front of
            totalDaysInMonth.unshift(...temp);
        }

        if (lastDayOfSelectedDate !== 6) {
            let next = 1;
            for (let i = lastDayOfSelectedDate; i < 6; i++) {
                const date = new Date(
                    selectedDate.getFullYear(),
                    selectedDate.getMonth() + 1,
                    0 + next
                );
                totalDaysInMonth.push({ classess: "date-next", date });
                next++;
            }
        }

        return totalDaysInMonth;
    }

    const handlePrevButton = () => {
        setSelectedDate(
            (prev) => new Date(prev.getFullYear(), prev.getMonth() - 1)
        );
    };
    const handleNextButton = () => {
        setSelectedDate(
            (prev) => new Date(prev.getFullYear(), prev.getMonth() + 1)
        );
    };

    return {
        // variables
        days,
        months,

        // states
        currentDate,
        selectedDate,
        setCurrentDate,
        setSelectedDate,

        // functions
        handlePrevButton,
        handleNextButton,
        //
        renderCalendar,
    };
}
