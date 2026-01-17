import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    // This tells Tailwind to look inside your 'app' folder
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // These are the custom colors that were missing
      colors: {
        brand: {
          primary: '#0a5c4a', // Deep Green
          accent: '#85c226',  // Bright Green
          dark: '#051f18',    // Dark Text
          light: '#f8faf7',   // Pale Background
        }
      },
    },
  },
  plugins: [],
};
export default config;