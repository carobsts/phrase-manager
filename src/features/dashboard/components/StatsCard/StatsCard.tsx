import {
  TrendingUp,
  BarChart2,
  PieChart,
  Calendar,
  MoreVertical,
} from "lucide-react";

import type { StatCardSchema } from "../../../../types";

import {
  Card,
  CardContent,
  Description,
  DragIndicator,
  IconContainer,
  TextContainer,
  Title,
  Value,
} from "./StatsCard.styles";

export const StatsCard = ({
  title,
  value,
  icon,
  color,
  description,
}: StatCardSchema) => {
  const getIcon = () => {
    switch (icon) {
      case "trending-up":
        return (
          <TrendingUp size={20} color={getIconColor()} aria-hidden="true" />
        );
      case "calendar":
        return <Calendar size={20} color={getIconColor()} aria-hidden="true" />;
      case "bar-chart":
        return (
          <BarChart2 size={20} color={getIconColor()} aria-hidden="true" />
        );
      case "pie-chart":
        return <PieChart size={20} color={getIconColor()} aria-hidden="true" />;
      default:
        return (
          <TrendingUp size={20} color={getIconColor()} aria-hidden="true" />
        );
    }
  };

  const getIconColor = () => {
    switch (color) {
      case "purple":
        return "#7c3aed";
      case "orange":
        return "#ea580c";
      case "blue":
        return "#2563eb";
      case "green":
        return "#16a34a";
      default:
        return "#7c3aed";
    }
  };

  return (
    <Card role="region" aria-label={`${title} statistic`}>
      <DragIndicator aria-hidden="true" title="Drag to reorder">
        <MoreVertical size={16} />
      </DragIndicator>
      <CardContent>
        <TextContainer>
          <Title>{title}</Title>
          <Value>{value}</Value>
          <Description>{description}</Description>
        </TextContainer>
        <IconContainer color={color}>{getIcon()}</IconContainer>
      </CardContent>
    </Card>
  );
};
