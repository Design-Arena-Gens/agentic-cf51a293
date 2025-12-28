import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        atlas: {
          50: "#f3f6ff",
          100: "#e6edff",
          200: "#c3d4ff",
          300: "#9fbafd",
          400: "#6f92fa",
          500: "#4a6df0",
          600: "#314edc",
          700: "#283dce",
          800: "#1f31a7",
          900: "#1c2b85"
        }
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"]
      }
    }
  },
  plugins: []
};

export default config;
