import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        pearl: {
          slate: "#F8FAFC",
          charcoal: "#0F172A",
          cyan: "#0EA5E9",
          coral: "#F97316",
          emerald: "#10B981"
        }
      },
      boxShadow: {
        soft: "0 18px 60px rgba(15, 23, 42, 0.12)",
        lift: "0 14px 30px rgba(14, 165, 233, 0.16)"
      }
    }
  },
  plugins: []
};

export default config;
