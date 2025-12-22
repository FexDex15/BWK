/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      /* ================= COLORS ================= */
      colors: {
        border: "rgba(0,255,255,0.35)",       // neon cyan
        input: "rgba(0,255,255,0.25)",
        ring: "#00ffff",

        background: "#05080f",
        foreground: "#dffcff",

        primary: {
          DEFAULT: "#00eaff",
          foreground: "#001418",
        },
        secondary: {
          DEFAULT: "#0077ff",
          foreground: "#e6f6ff",
        },
        accent: {
          DEFAULT: "#00ffff",
          foreground: "#001a1a",
        },
        muted: {
          DEFAULT: "rgba(255,255,255,0.08)",
          foreground: "#9ae6ff",
        },
        card: {
          DEFAULT: "rgba(0,20,40,0.85)",
          foreground: "#e0fbff",
        },
      },

      /* ================= FONTS ================= */
      fontFamily: {
        arcade: ["Orbitron", "sans-serif"],
      },

      /* ================= RADIUS ================= */
      borderRadius: {
        lg: "14px",
        md: "10px",
        sm: "6px",
      },

      /* ================= ANIMATIONS ================= */
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        glow: {
          "0%,100%": { boxShadow: "0 0 12px #00ffff" },
          "50%": { boxShadow: "0 0 25px #00ffff" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.25s ease-out",
        "accordion-up": "accordion-up 0.25s ease-out",
        glow: "glow 2s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],

  extend: {
 fontFamily: {
  retro: ["Orbitron", "sans-serif"],
},

  keyframes: {
    tv: {
      "0%": { filter: "brightness(1.8) contrast(2.6) grayscale(1)", opacity: "0.7" },
      "50%": { filter: "contrast(3.6) blur(1.5px)", opacity: "0.5" },
      "100%": { filter: "none", opacity: "1" },
    },
    fade: {
      "0%": { opacity: 0, transform: "translateY(8px)" },
      "100%": { opacity: 1, transform: "translateY(0)" },
    },
  },
  animation: {
    tv: "tv 0.45s ease",
    fade: "fade 0.4s ease",
  },
}
  
};
