import { useMemo } from "react";

import { Doughnut } from "react-chartjs-2";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import { usePhraseContext } from "../../../../hooks";

import type { PhraseCategory } from "../../../../types";

ChartJS.register(ArcElement, Tooltip, Legend);

export const PhraseCategoryChart = () => {
  const { phrases } = usePhraseContext();

  const chartData = useMemo(() => {
    const categoryCounts = {
      general: phrases.filter(
        (p) => p.category === ("general" as PhraseCategory)
      ).length,
      quote: phrases.filter((p) => p.category === ("quote" as PhraseCategory))
        .length,
      reminder: phrases.filter(
        (p) => p.category === ("reminder" as PhraseCategory)
      ).length,
      note: phrases.filter((p) => p.category === ("note" as PhraseCategory))
        .length,
    };

    return {
      labels: ["General", "Quotes", "Reminders", "Notes"],
      datasets: [
        {
          data: [
            categoryCounts.general,
            categoryCounts.quote,
            categoryCounts.reminder,
            categoryCounts.note,
          ],
          backgroundColor: [
            "rgba(99, 102, 241, 0.8)",
            "rgba(249, 115, 22, 0.8)",
            "rgba(14, 165, 233, 0.8)",
            "rgba(34, 197, 94, 0.8)",
          ],
          borderColor: [
            "rgba(99, 102, 241, 1)",
            "rgba(249, 115, 22, 1)",
            "rgba(14, 165, 233, 1)",
            "rgba(34, 197, 94, 1)",
          ],
          borderWidth: 1,
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
    },
    cutout: "70%",
  };

  return (
    <div
      className="h-48"
      role="img"
      aria-label="Doughnut chart showing distribution of phrases by category"
    >
      {phrases.length > 0 ? (
        <Doughnut data={chartData} options={options} />
      ) : (
        <div className="h-full flex items-center justify-center text-gray-400 text-sm">
          Add phrases to see category distribution
        </div>
      )}
    </div>
  );
};
