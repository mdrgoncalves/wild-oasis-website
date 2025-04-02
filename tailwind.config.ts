import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          200: '#bfdbfe',
          900: '#1e3a8a',
        },
        accent: {
          500: '#f59e0b',
          600: '#d97706',
        },
      },
    },
  },
  plugins: [],
};
export default config;
