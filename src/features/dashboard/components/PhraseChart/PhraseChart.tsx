import { useMemo } from "react";

import { Line } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

import { usePhraseContext } from "../../../../hooks";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export const PhraseChart = () => {
  const { phrases } = usePhraseContext();

  const chartData = useMemo(() => {
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (6 - i));
      return date.toISOString().split("T")[0];
    });

    // Count phrases per day and category
    const generalCounts = last7Days.map(
      (day) =>
        phrases.filter(
          (p) => p.createdAt.split("T")[0] === day && p.category === "general"
        ).length
    );

    const quoteCounts = last7Days.map(
      (day) =>
        phrases.filter(
          (p) => p.createdAt.split("T")[0] === day && p.category === "quote"
        ).length
    );

    const reminderCounts = last7Days.map(
      (day) =>
        phrases.filter(
          (p) => p.createdAt.split("T")[0] === day && p.category === "reminder"
        ).length
    );

    const noteCounts = last7Days.map(
      (day) =>
        phrases.filter(
          (p) => p.createdAt.split("T")[0] === day && p.category === "note"
        ).length
    );

    // Format dates for display with leading zeros for day
    const labels = last7Days.map((day) => {
      const date = new Date(day);
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
      });
    });

    return {
      labels,
      datasets: [
        {
          label: "General",
          data: generalCounts,
          borderColor: "rgba(99, 102, 241, 1)",
          backgroundColor: "rgba(99, 102, 241, 0.1)",
          tension: 0.4,
          fill: true,
        },
        {
          label: "Quotes",
          data: quoteCounts,
          borderColor: "rgba(249, 115, 22, 1)",
          backgroundColor: "rgba(249, 115, 22, 0.1)",
          tension: 0.4,
          fill: true,
        },
        {
          label: "Reminders",
          data: reminderCounts,
          borderColor: "rgba(14, 165, 233, 1)",
          backgroundColor: "rgba(14, 165, 233, 0.1)",
          tension: 0.4,
          fill: true,
        },
        {
          label: "Notes",
          data: noteCounts,
          borderColor: "rgba(34, 197, 94, 1)",
          backgroundColor: "rgba(34, 197, 94, 0.1)",
          tension: 0.4,
          fill: true,
        },
      ],
    };
  }, [phrases]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          boxWidth: 12,
          boxHeight: 12,
          padding: 15,
          usePointStyle: true,
          pointStyle: "circle" as const,
        },
      },
      tooltip: {
        mode: "index" as const,
        intersect: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          precision: 0,
        },
      },
    },
    interaction: {
      mode: "nearest" as const,
      axis: "x" as const,
      intersect: false,
    },
  };

  return (
    <div
      className="h-64"
      role="img"
      aria-label="Phrase activity chart showing phrases added over the last 7 days by category"
    >
      {phrases.length > 0 ? (
        <Line data={chartData} options={options} />
      ) : (
        <div className="h-full flex items-center justify-center text-gray-400 text-sm">
          Add phrases to see activity chart
        </div>
      )}
    </div>
  );
};
