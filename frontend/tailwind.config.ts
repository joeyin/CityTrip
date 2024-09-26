import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/react";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        roboto: ["Roboto", "Arial", "sans-serif"],
        poppins: ["Poppins", "Arial", "sans-serif"],
        inter: ["Inter", "Arial", "sans-serif"],
        archivo: ["Archivo", "Arial", "sans-serif"],
      },
      colors: {
        primary: "#62b354",
        secondary: "#1b568e",
        danger: "#dc3545",
        warning: "#f6a610",
        foreground: "#8b8b8b",
        "gray-50": "#f7f7f7",
        "gray-200": "#ececec",
        "gray-500": "#8b8b8b",
        "green-100": "#6ac85a",
        "green-400": "#498A3E",
        "green-600": "#386D2E",
        "blue-200": "#194e81",
        "blue-400": "#113659",
      },
    },
  },
  plugins: [nextui()],
};

export default config;
