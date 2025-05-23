import styled from "styled-components";

import { motion } from "framer-motion";

const Card = styled(motion.div)`
  height: 100%;
  display: flex;
  flex-direction: column;
  border: 1px solid #e5e7eb;
  border-radius: 0.75rem;
  transition: box-shadow 0.2s;
  background-color: white;

  &:hover {
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }
`;

const CardContent = styled.div`
  flex: 1;
  padding: 1.5rem 1rem 1rem 1rem;
`;

const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  border-top: 1px solid #e5e7eb;
  padding-top: 1rem;
  padding: 1rem;
`;

const Text = styled.p`
  word-break: break-word;
`;

const BadgeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Badge = styled.span<{ category: string }>`
  border-radius: 9999px;
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;
  border: 1px solid;

  ${({ category }) => {
    switch (category) {
      case "quote":
        return `
          background-color: #ffedd5;
          color: #9a3412;
          border-color: #fdba74;
          &:hover { background-color: #fed7aa; }
        `;
      case "reminder":
        return `
          background-color: #dbeafe;
          color: #1e40af;
          border-color: #93c5fd;
          &:hover { background-color: #bfdbfe; }
        `;
      case "note":
        return `
          background-color: #dcfce7;
          color: #166534;
          border-color: #86efac;
          &:hover { background-color: #bbf7d0; }
        `;
      default:
        return `
          background-color: #ede9fe;
          color: #5b21b6;
          border-color: #c4b5fd;
          &:hover { background-color: #ddd6fe; }
        `;
    }
  }}
`;

const DateText = styled.span`
  font-size: 0.75rem;
  color: #9ca3af;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const IconButton = styled(motion.button)<{ variant?: "edit" | "delete" }>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.7rem;
  border-radius: 0.375rem;
  background: transparent;
  color: #6b7280;
  transition: all 0.2s;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: ${(props) =>
      props.variant === "delete" ? "#fee2e2" : "#f3e8ff"};
    color: ${(props) => (props.variant === "delete" ? "#ef4444" : "#8b5cf6")};
  }
`;

const VisuallyHidden = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
`;

export {
  Card,
  CardContent,
  CardFooter,
  Text,
  BadgeContainer,
  Badge,
  DateText,
  ButtonContainer,
  IconButton,
  VisuallyHidden,
};
