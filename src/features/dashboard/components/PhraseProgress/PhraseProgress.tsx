import { useMemo } from "react";

import { usePhraseContext } from "../../../../hooks";

export const PhraseProgress = () => {
  const { phrases } = usePhraseContext();

  const goalCount = 20;

  const progress = useMemo(() => {
    const percentage = (phrases.length / goalCount) * 100;
    return Math.min(percentage, 100);
  }, [phrases, goalCount]);

  const radius = 70;
  const circumference = 2 * Math.PI * radius;

  const dashOffset = circumference - (progress / 100) * circumference;

  const diffFromGoal = phrases.length - goalCount;
  const goalMessage = useMemo(() => {
    if (phrases.length === 0) {
      return "Add your first phrase to get started!";
    } else if (diffFromGoal < 0) {
      return `${Math.abs(diffFromGoal)} more to reach your goal`;
    } else if (diffFromGoal === 0) {
      return "You've reached your goal!";
    } else {
      return `+${diffFromGoal} phrases beyond your goal!`;
    }
  }, [phrases.length, diffFromGoal]);

  return (
    <div
      className="flex flex-col items-center justify-center"
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={`Progress toward goal: ${Math.round(progress)}% complete`}
    >
      <div className="relative w-40 h-40">
        <svg className="w-full h-full" viewBox="0 0 160 160">
          <circle
            cx="80"
            cy="80"
            r={radius}
            fill="none"
            stroke="#EEE6FF"
            strokeWidth="12"
          />

          <circle
            cx="80"
            cy="80"
            r={radius}
            fill="none"
            stroke="#7C3AED"
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            transform="rotate(-90 80 80)"
            className="transition-all duration-700 ease-in-out"
          />
        </svg>

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <span
              className="text-3xl font-bold text-gray-800 transition-all duration-500 ease-in-out"
              aria-hidden="true"
            >
              {Math.round(progress)}%
            </span>
          </div>
        </div>
      </div>

      <div className="mt-4 text-center">
        <p className="text-sm text-gray-500">
          {`${phrases.length} of ${goalCount} phrases`}
        </p>
        <p
          className={`text-xs mt-1 ${
            diffFromGoal >= 0 ? "text-green-600" : "text-gray-400"
          }`}
        >
          {goalMessage}
        </p>
      </div>
    </div>
  );
};
