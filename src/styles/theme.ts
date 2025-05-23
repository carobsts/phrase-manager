export const theme = {
  mode: "system" as "light" | "dark" | "system",

  colors: {
    white: "#ffffff",
    black: "#000000",

    background: {
      primary: "#f5f3ff",
      card: "#ffffff",
    },

    text: {
      primary: "#1f2937",
      secondary: "#6b7280",
      muted: "#9ca3af",
    },

    primary: {
      50: "#f5f3ff",
      100: "#ede9fe",
      200: "#ddd6fe",
      300: "#c4b5fd",
      400: "#a78bfa",
      500: "#8b5cf6",
      600: "#7c3aed",
      700: "#6d28d9",
      800: "#5b21b6",
      900: "#4c1d95",
    },

    category: {
      general: {
        bg: "#ede9fe",
        text: "#5b21b6",
        border: "#c4b5fd",
        hover: "#ddd6fe",
      },
      quote: {
        bg: "#ffedd5",
        text: "#9a3412",
        border: "#fdba74",
        hover: "#fed7aa",
      },
      reminder: {
        bg: "#dbeafe",
        text: "#1e40af",
        border: "#93c5fd",
        hover: "#bfdbfe",
      },
      note: {
        bg: "#dcfce7",
        text: "#166534",
        border: "#86efac",
        hover: "#bbf7d0",
      },
    },

    border: "#e5e7eb",
    error: "#ef4444",
    success: "#10b981",
  },

  space: {
    0: "0",
    1: "0.25rem",
    2: "0.5rem",
    3: "0.75rem",
    4: "1rem",
    5: "1.25rem",
    6: "1.5rem",
    8: "2rem",
    10: "2.5rem",
    12: "3rem",
    16: "4rem",
    20: "5rem",
    24: "6rem",
  },

  fontSizes: {
    xs: "0.75rem",
    sm: "0.875rem",
    md: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
    "2xl": "1.5rem",
    "3xl": "1.875rem",
    "4xl": "2.25rem",
  },

  fontWeights: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },

  radii: {
    sm: "0.125rem",
    md: "0.375rem",
    lg: "0.5rem",
    xl: "0.75rem",
    "2xl": "1rem",
    full: "9999px",
  },

  shadows: {
    sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
  },

  breakpoints: {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    "2xl": "1536px",
  },

  zIndices: {
    0: 0,
    10: 10,
    20: 20,
    30: 30,
    40: 40,
    50: 50,
    auto: "auto",
  },
};

export type Theme = typeof theme;

declare module "styled-components" {
  /* eslint-disable-next-line @typescript-eslint/no-empty-object-type */
  export interface DefaultTheme extends Theme {}
}
