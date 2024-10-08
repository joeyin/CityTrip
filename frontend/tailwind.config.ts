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
      backgroundImage: {
        "modal-backdrop":
          "linear-gradient(to right, rgba(255, 255, 255, 0.73), rgba(255, 255, 255, 0.73)), linear-gradient(to right, rgba(0, 0, 0, 0.44), rgba(0, 0, 0, 0.44))",
      },
      boxShadow: {
        default: "0 0 10px 1px #ABABAB",
      },
      fontFamily: {
        roboto: ["Roboto", "Arial", "sans-serif"],
        poppins: ["Poppins", "Arial", "sans-serif"],
        inter: ["Inter", "Arial", "sans-serif"],
        archivo: ["Archivo", "Arial", "sans-serif"],
        arial: ["Arial", "sans-serif"],
      },
      colors: {
        primary: "#62b354",
        secondary: "#1b568e",
        danger: "#dc3545",
        warning: "#f6a610",
        foreground: "#8b8b8b",
        "gray-50": "#f7f7f7",
        "gray-150": "#eaeaea",
        "gray-200": "#ececec",
        "gray-500": "#8b8b8b",
        "green-100": "#6ac85a",
        "green-400": "#498A3E",
        "green-600": "#386D2E",
        "blue-200": "#194e81",
        "blue-400": "#113659",
      },
      outlineColor: {
        focus: "#62b354",
      },
    },
  },
  plugins: [nextui()],
};

export default config;
