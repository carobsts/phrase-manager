import styled from "styled-components";
import type { StatsCardColor } from "../../../../types/stat";

const Card = styled.div`
  background-color: white;
  border-radius: 0.75rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: 1rem;
  height: 100%;
  cursor: grab;
  transition: box-shadow 0.2s ease;
  position: relative;

  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.sm};
  }

  &:active {
    cursor: grabbing;
  }
`;

const DragIndicator = styled.div`
  position: absolute;
  right: 0.5rem;
  bottom: 0.9rem;
  color: ${({ theme }) => theme.colors.text.muted};
  opacity: 0.6;
  transition: opacity 0.2s ease;

  ${Card}:hover & {
    opacity: 1;
  }
`;

const CardContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.p`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin: 0;
`;

const Value = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0.25rem 0;
  transition: all 0.5s ease-in-out;
`;

const Description = styled.p`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.text.muted};
  margin: 0;
`;

const IconContainer = styled.div<{ color: StatsCardColor }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 9999px;

  ${({ color, theme }) => {
    switch (color) {
      case "purple":
        return `background-color: ${theme.colors.primary[100]};`;
      case "orange":
        return `background-color: #ffedd5;`;
      case "blue":
        return `background-color: #dbeafe;`;
      case "green":
        return `background-color: #dcfce7;`;
      default:
        return `background-color: ${theme.colors.primary[100]};`;
    }
  }}
`;

export {
  Card,
  DragIndicator,
  CardContent,
  TextContainer,
  Title,
  Value,
  Description,
  IconContainer,
};
