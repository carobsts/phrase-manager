import styled from "styled-components";

export const Button = styled.button<{
  variant?: "primary" | "secondary" | "outline" | "ghost" | "destructive";
  size?: "sm" | "md" | "lg";
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.radii.md};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  transition: all 0.2s ease;
  cursor: pointer;

  ${({ size, theme }) => {
    switch (size) {
      case "sm":
        return `
          height: 2rem;
          padding: 0 ${theme.space[3]};
          font-size: ${theme.fontSizes.sm};
        `;
      case "lg":
        return `
          height: 2.75rem;
          padding: 0 ${theme.space[5]};
          font-size: ${theme.fontSizes.lg};
        `;
      default:
        return `
          height: 2.5rem;
          padding: 0 ${theme.space[4]};
          font-size: ${theme.fontSizes.md};
        `;
    }
  }}

  ${({ variant, theme }) => {
    switch (variant) {
      case "secondary":
        return `
          background-color: ${theme.colors.primary[100]};
          color: ${theme.colors.primary[700]};
          border: 1px solid ${theme.colors.primary[200]};
          &:hover {
            background-color: ${theme.colors.primary[200]};
          }
        `;
      case "outline":
        return `
          background-color: transparent;
          color: ${theme.colors.text.primary};
          border: 1px solid ${theme.colors.border};
          &:hover {
            background-color: ${theme.colors.background.primary};
          }
        `;
      case "ghost":
        return `
          background-color: transparent;
          color: ${theme.colors.text.primary};
          border: none;
          &:hover {
            background-color: ${theme.colors.background.primary};
          }
        `;
      case "destructive":
        return `
          background-color: ${theme.colors.error};
          color: white;
          border: none;
          &:hover {
            background-color: #dc2626;
          }
        `;
      default:
        return `
          background-color: ${theme.colors.primary[700]};
          color: white;
          border: none;
          &:hover {
            background-color: ${theme.colors.primary[700]};
          }
        `;
    }
  }}
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
