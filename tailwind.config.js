/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background)  / <alpha-value>)",
        foreground: "hsl(var(--foreground)  / <alpha-value>)",
        card: "hsl(var(--card)        / <alpha-value>)",
        "card-foreground": "hsl(var(--card-foreground) / <alpha-value>)",
        popover: "hsl(var(--popover)     / <alpha-value>)",
        "popover-foreground": "hsl(var(--popover-foreground) / <alpha-value>)",
        primary: "hsl(var(--primary)     / <alpha-value>)",
        "primary-foreground": "hsl(var(--primary-foreground) / <alpha-value>)",
        secondary: "hsl(var(--secondary)   / <alpha-value>)",
        "secondary-foreground":
          "hsl(var(--secondary-foreground) / <alpha-value>)",
        muted: "hsl(var(--muted)       / <alpha-value>)",
        "muted-foreground": "hsl(var(--muted-foreground) / <alpha-value>)",
        accent: "hsl(var(--accent)      / <alpha-value>)",
        "accent-foreground": "hsl(var(--accent-foreground) / <alpha-value>)",
        destructive: "hsl(var(--destructive) / <alpha-value>)",
        "destructive-foreground":
          "hsl(var(--destructive-foreground) / <alpha-value>)",
        border: "hsl(var(--border)      / <alpha-value>)",
        input: "hsl(var(--input)       / <alpha-value>)",
        ring: "hsl(var(--ring)        / <alpha-value>)",
        "chart-1": "hsl(var(--chart-1)     / <alpha-value>)",
        "chart-2": "hsl(var(--chart-2)     / <alpha-value>)",
        "chart-3": "hsl(var(--chart-3)     / <alpha-value>)",
        "chart-4": "hsl(var(--chart-4)     / <alpha-value>)",
        "chart-5": "hsl(var(--chart-5)     / <alpha-value>)",
        "sidebar-background": "hsl(var(--sidebar-background)  / <alpha-value>)",
        "sidebar-foreground": "hsl(var(--sidebar-foreground)  / <alpha-value>)",
        "sidebar-primary": "hsl(var(--sidebar-primary)     / <alpha-value>)",
        "sidebar-primary-foreground":
          "hsl(var(--sidebar-primary-foreground) / <alpha-value>)",
        "sidebar-accent": "hsl(var(--sidebar-accent)      / <alpha-value>)",
        "sidebar-accent-foreground":
          "hsl(var(--sidebar-accent-foreground) / <alpha-value>)",
        "sidebar-border": "hsl(var(--sidebar-border)      / <alpha-value>)",
        "sidebar-ring": "hsl(var(--sidebar-ring)        / <alpha-value>)",
      },
      borderRadius: {
        DEFAULT: "var(--radius)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
