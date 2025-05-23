import { useMemo } from "react";
import { usePhraseContext } from "../../../../hooks";

export const PhraseCalendar = () => {
  const { phrases } = usePhraseContext();

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const daysInMonth = useMemo(() => {
    return new Date(currentYear, currentMonth + 1, 0).getDate();
  }, [currentMonth, currentYear]);

  const firstDayOfMonth = useMemo(() => {
    return new Date(currentYear, currentMonth, 1).getDay();
  }, [currentMonth, currentYear]);

  const monthName = useMemo(() => {
    return new Date(currentYear, currentMonth).toLocaleString("default", {
      month: "long",
    });
  }, [currentMonth, currentYear]);

  const daysWithPhrases = useMemo(() => {
    const days: Record<number, number> = {};

    phrases.forEach((phrase) => {
      const phraseDate = new Date(phrase.createdAt);
      if (
        phraseDate.getMonth() === currentMonth &&
        phraseDate.getFullYear() === currentYear
      ) {
        const day = phraseDate.getDate();
        days[day] = (days[day] || 0) + 1;
      }
    });

    return days;
  }, [phrases, currentMonth, currentYear]);

  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const renderCalendarDays = () => {
    const days = [];

    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(
        <div key={`empty-${i}`} className="h-8 w-8" aria-hidden="true" />
      );
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const isToday =
        day === currentDate.getDate() &&
        currentMonth === currentDate.getMonth() &&
        currentYear === currentDate.getFullYear();

      const hasPhrase = daysWithPhrases[day] > 0;
      const phraseCount = daysWithPhrases[day] || 0;

      const formattedDay = day < 10 ? `0${day}` : day;

      days.push(
        <div
          key={day}
          className={`
            h-8 w-8 flex items-center justify-center rounded-full text-sm
            ${isToday ? "bg-purple-700 text-white" : ""}
            ${hasPhrase && !isToday ? "bg-purple-100 text-purple-700" : ""}
            ${!hasPhrase && !isToday ? "text-gray-700" : ""}
          `}
          aria-label={`${monthName} ${formattedDay}, ${currentYear}${
            isToday && ", Today"
          }${
            phraseCount > 0 &&
            `, ${phraseCount} phrase${phraseCount > 1 && "s"} added`
          }`}
        >
          {formattedDay}
        </div>
      );
    }

    return days;
  };

  return (
    <div role="region" aria-label={`Calendar for ${monthName} ${currentYear}`}>
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-medium">
          {monthName} {currentYear}
        </h3>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center mb-2">
        {weekdays.map((day) => (
          <div key={day} className="text-xs text-gray-500" aria-hidden="true">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">{renderCalendarDays()}</div>
    </div>
  );
};
