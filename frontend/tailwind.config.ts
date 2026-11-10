import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#0A0D0B",
          soft: "#12160F",
          muted: "#2A2F27"
        },
        paper: {
          DEFAULT: "#F7F7F4",
          soft: "#EFEFEA"
        },
        brand: {
          50: "#EAF6EF",
          100: "#CDEBD9",
          200: "#9ED8B8",
          300: "#6BC294",
          400: "#3AA872",
          500: "#0E7A4F",
          600: "#0C6A45",
          700: "#0A5738",
          800: "#08452D",
          900: "#063322"
        },
        lime: {
          DEFAULT: "#C7F284",
          soft: "#DDF8B4",
          deep: "#A9DC5B"
        }
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        sans: ["var(--font-body)", "sans-serif"]
      },
      fontSize: {
        "display-1": ["clamp(3.25rem, 8vw, 7.5rem)", { lineHeight: "0.95", letterSpacing: "-0.035em" }],
        "display-2": ["clamp(2.5rem, 5.5vw, 5rem)", { lineHeight: "0.98", letterSpacing: "-0.03em" }],
        "display-3": ["clamp(2rem, 3.6vw, 3.25rem)", { lineHeight: "1.05", letterSpacing: "-0.02em" }]
      },
      maxWidth: {
        shell: "84rem"
      },
      spacing: {
        section: "clamp(5rem, 9vw, 9rem)"
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" }
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        }
      },
      animation: {
        marquee: "marquee 32s linear infinite",
        "fade-up": "fade-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) both"
      }
    }
  },
  plugins: []
};

export default config;
