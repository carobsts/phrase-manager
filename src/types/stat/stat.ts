type StatsCardColor = "purple" | "orange" | "blue" | "green";
type StatsCardIcon = "trending-up" | "calendar" | "bar-chart" | "pie-chart";

interface StatCardSchema {
  id: string;
  title: string;
  value: string;
  icon: StatsCardIcon;
  color: StatsCardColor;
  description: string;
}

const STAT_CARDS_TYPE = {
  TOTAL_PHRASES: "total-phrases",
  THIS_WEEK: "this-week",
  AVERAGE_LENGTH: "average-length",
  CATEGORIES: "categories",
};

export {
  type StatsCardColor,
  type StatsCardIcon,
  type StatCardSchema,
  STAT_CARDS_TYPE,
};
