import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  daisyui: {
    themes: [
      "lemonade",
      {
        mytheme: {
          primary: "#003cff",

          secondary: "#00a7ff",

          accent: "#00e5ff",

          neutral: "#1f1307",

          "base-100": "#f8fff6",

          info: "#4aa9ff",

          success: "#5aff00",

          warning: "#e75c00",

          error: "#ff9bb3",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
export default config;
