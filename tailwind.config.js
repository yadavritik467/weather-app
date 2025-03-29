/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: {
          bg: "#0B0F15",
          card: "#171C23",
          border: "#2A2E35",
          text: "#FFFFFF",
          subtext: "#9CA3AF",
          accent: "#3B82F6",
          chart: "#2563EB",
          hover: "#1E2A3B",
        },
        weather: {
          blue: "#2563EB",
          teal: "#A5F3FC",
          slate: "#1E293B",
        },
      },
    },
  },
  plugins: [],
};
