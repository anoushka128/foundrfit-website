import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        sand: "#f4efe7",
        oat: "#ebe1d2",
        espresso: "#32261b",
        sage: "#a2b69c",
        moss: "#60725c",
        mist: "#f8f6f2",
        clay: "#b78264",
        blush: "#d8b3a7",
        ink: "#241d17",
        line: "rgba(36, 29, 23, 0.08)"
      },
      boxShadow: {
        soft: "0 16px 40px rgba(50, 38, 27, 0.08)",
        card: "0 10px 24px rgba(50, 38, 27, 0.07)"
      },
      fontFamily: {
        sans: ["ui-sans-serif", "system-ui", "sans-serif"]
      },
      backgroundImage: {
        "wellness-glow":
          "radial-gradient(circle at top left, rgba(162, 182, 156, 0.25), transparent 40%), radial-gradient(circle at top right, rgba(216, 179, 167, 0.20), transparent 32%)"
      }
    }
  },
  plugins: []
};

export default config;
