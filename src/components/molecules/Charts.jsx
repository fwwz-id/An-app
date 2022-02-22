import { memo } from "react";

import {
    Chart as ChartJs,
    PointElement,
    LineElement,
    ArcElement,
    LinearScale,
    CategoryScale,
    RadialLinearScale,
    LineController,
    DoughnutController,
    Filler,
    Legend,
    Title,
    Tooltip,
} from "chart.js";

import { Doughnut, Line, Radar } from "react-chartjs-2";

ChartJs.register(
    ArcElement,
    PointElement,
    LineElement,
    LineController,
    DoughnutController,
    LinearScale,
    CategoryScale,
    RadialLinearScale,
    Filler,
    Legend,
    Title,
    Tooltip
);

function Charts({ type }) {
    return type === "line" ? (
        <Line
            data={{
                labels: ["Januari", "Februari", "Maret"],
                datasets: [
                    {
                        id: 1,
                        data: [1, 2, 4],
                        backgroundColor: "blue",
                    },
                    {
                        id: 3,
                        data: [2, 5, 1],
                        backgroundColor: "red",
                    },
                ],
            }}
            options={{ responsive: true }}
        />
    ) : type === "radar" ? (
        <Radar
            data={{
                labels: [
                    "Januari",
                    "Februari",
                    "Maret",
                    "April",
                    "Mei",
                    "Juni",
                    "Juli",
                ],
                datasets: [
                    {
                        id: 1,
                        data: [1, 2, 4, 5.5, 2, 4, 10],
                        backgroundColor: "rgba(99, 99, 255, 0.2)",
                        borderColor: "blue",
                        borderWidth: 1,
                    },
                    {
                        id: 3,
                        data: [2, 5, 2.5, 5, 3, 1, 10],
                        backgroundColor: "rgba(255, 99, 132, 0.2)",
                        borderColor: "red",
                        borderWidth: 1,
                    },
                ],
            }}
            options={{ responsive: true }}
        />
    ) : (
        <Doughnut
            data={{
                labels: ["Januari", "Februari", "Maret"],
                datasets: [
                    {
                        id: 1,
                        data: [1, 2, 4],
                        backgroundColor: "blue",
                    },
                    {
                        id: 3,
                        data: [2, 5, 1],
                        backgroundColor: "red",
                    },
                ],
            }}
            options={{ responsive: true }}
        />
    );
}

export default memo(Charts);
