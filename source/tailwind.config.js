/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: { DEFAULT: "#0A0A0A", 2: "#111111", 3: "#161616", 4: "#1F1F1F" },
        neon: { DEFAULT: "#FACC15", hot: "#FFE600" },
        mist: "#E5E7EB",
      },
      fontFamily: {
        display: ['"Archivo"', '"Arial Black"', "system-ui", "sans-serif"],
        sans: ['"Archivo"', "system-ui", "-apple-system", '"Segoe UI"', "Roboto", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(250,204,21,.6), 0 0 32px -4px rgba(250,204,21,.55)",
        "glow-soft": "0 0 60px -12px rgba(250,204,21,.35)",
        card: "0 30px 80px -20px rgba(0,0,0,.8)",
      },
      keyframes: {
        sheen: { "0%": { transform: "translateX(-120%) skewX(-20deg)" }, "100%": { transform: "translateX(220%) skewX(-20deg)" } },
        pulseDot: { "0%,100%": { boxShadow: "0 0 0 0 rgba(250,204,21,.55)" }, "50%": { boxShadow: "0 0 0 8px rgba(250,204,21,0)" } },
      },
      animation: { sheen: "sheen 1.1s ease-out", pulseDot: "pulseDot 2.2s ease-in-out infinite" },
    },
  },
  plugins: [],
};
