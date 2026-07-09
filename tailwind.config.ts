import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#030405",
          900: "#07090d",
          850: "#0b0f14",
          800: "#101620",
          700: "#17202b",
          600: "#253241"
        },
        silver: {
          50: "#f7f8fa",
          100: "#ecf0f4",
          200: "#d7dfe7",
          300: "#aebbc8",
          400: "#7e8c9a",
          500: "#5f6a78"
        },
        signal: {
          300: "#8fe8ff",
          400: "#46d8ff",
          500: "#00b8e6",
          600: "#0091b8"
        }
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Inter", "ui-sans-serif", "system-ui", "sans-serif"]
      },
      boxShadow: {
        glow: "0 0 55px rgba(70, 216, 255, 0.22)",
        "soft-card": "0 24px 80px rgba(0, 0, 0, 0.38)"
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.25rem",
        "3xl": "1.75rem"
      }
    }
  },
  plugins: []
};

export default config;
