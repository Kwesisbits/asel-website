import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "asel-yellow": "#F5A800",
        "asel-yellow-light": "#FFC84A",
        "asel-orange": "#F07020",
        "asel-navy": "#1A2E4A",
        "asel-off-white": "#F8F6F1",
        "asel-mid-gray": "#6B7280",
      },
      fontFamily: {
        display: ["Sora", "sans-serif"],
        body: ["DM Sans", "sans-serif"],
        mono: ["DM Mono", "monospace"],
      },
      boxShadow: {
        solar: "0 18px 60px rgba(245, 168, 0, 0.22)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(18px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        "fade-up": "fade-up 700ms ease-out both",
        float: "float 5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
