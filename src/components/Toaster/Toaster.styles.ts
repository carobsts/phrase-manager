import styled from "styled-components";

import { Toaster as Sonner, type ToasterProps as SonnerProps } from "sonner";

const StyledToaster = styled(Sonner)<SonnerProps>`
  &.toaster {
    .toast {
      background-color: ${({ theme }) => theme.colors.background.primary};
      color: ${({ theme }) => theme.colors.text.primary};
      border: 1px solid ${({ theme }) => theme.colors.border};
      box-shadow: ${({ theme }) => theme.shadows.lg};
    }
    .description {
      color: ${({ theme }) => theme.colors.text.muted};
    }
    .actionButton {
      background-color: ${({ theme }) => theme.colors.primary[500]};
      color: ${({ theme }) => theme.colors.white};
    }
    .cancelButton {
      background-color: ${({ theme }) => theme.colors.text.muted};
      color: ${({ theme }) => theme.colors.text.muted};
    }
  }
`;

export { StyledToaster };
