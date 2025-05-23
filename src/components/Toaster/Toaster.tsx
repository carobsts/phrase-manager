import { useContext } from "react";

import { type ToasterProps as SonnerProps } from "sonner";

import { ThemeContext, type DefaultTheme } from "styled-components";

import { StyledToaster } from "./Toaster.styles";

interface AppTheme extends DefaultTheme {
  mode: "light" | "dark" | "system";
}

type ToasterProps = Omit<SonnerProps, "theme">;

export function Toaster(props: ToasterProps) {
  const theme = useContext(ThemeContext) as AppTheme;
  const mode = theme.mode;

  return <StyledToaster {...props} theme={mode} className="toaster" />;
}
