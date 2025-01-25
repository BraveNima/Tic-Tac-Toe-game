import type { Config } from "tailwindcss";

export default {
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
        Saffron: "#F7BE38",
      },
      
      boxShadow: {
        custom:
          "2px 2px 6px rgba(206, 204, 204, 1), -1px -1px 5px rgba(206, 204, 204, 1)",
      },
      backgroundImage: {
        "game-cover": "url('../public/Cover.jpeg')",
      },
    },
  },
  plugins: [],
} satisfies Config;
