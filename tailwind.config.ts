import type { Config } from "tailwindcss";

import { theme } from "./src/utils/theme";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    listStyleType: {
      alpha: "lower-alpha",
      decimal: "decimal",
      disc: "disc",
    },
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        simpleGray900: "#101828",
        simpleGray700: "#344054",
        simpleGray600: "#475467",
        simpleGray500: "#667085",
        simpleGray400: "#98A2B3",
        simpleGray300: "#D0D5DD",
        simpleGray200: "#EAECF0",
        simpleWhite: theme.colors.brandWhite,
        simpleBlue: theme.colors.brandBlue,
        simpleYellow: theme.colors.brandYellow,
        simpleBlack: theme.colors.brandBlack,
        simpleGreen: theme.colors.brandGreen,
        simpleRed: theme.colors.brandRed,
        simplePink: theme.colors.brandPink,
        simplePurple: theme.colors.brandPurple,
      },
      fontFamily: {
        gambarino: ["Gambarino", "serif"],
        switzer: ["Switzer", "sans-serif"],
      },
      keyframes: {
        "shadow-rotate": {
          "0%": {
            "box-shadow":
              "inset 2px 4px 4px rgba(250, 255, 211, 0.75), inset -2px -4px 4px rgba(99, 104, 0, 0.25)",
          },
          "25%": {
            "box-shadow":
              "inset 4px 2px 4px rgba(250, 255, 211, 0.75), inset -4px -2px 4px rgba(99, 104, 0, 0.25)",
          },
          "50%": {
            "box-shadow":
              "inset 2px -4px 4px rgba(250, 255, 211, 0.75), inset -2px 4px 4px rgba(99, 104, 0, 0.25)",
          },
          "75%": {
            "box-shadow":
              "inset -2px -4px 4px rgba(250, 255, 211, 0.75), inset 2px 4px 4px rgba(99, 104, 0, 0.25)",
          },
          "100%": {
            "box-shadow":
              "inset 2px 4px 4px rgba(250, 255, 211, 0.75), inset -2px -4px 4px rgba(99, 104, 0, 0.25)",
          },
        },
      },
      animation: {
        "shadow-rotate": "shadow-rotate 2s linear infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
