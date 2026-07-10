import type { Config } from "tailwindcss";

const config: Config = {
  // 1. Enable Dark Mode based on the "class" we added to ThemeProvider
  darkMode: ["class"], 

  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}", // Ensure app folder is covered
    "./components/**/*.{js,ts,jsx,tsx,mdx}", // Ensure components folder is covered
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f7ff',
          600: '#2563eb',
          900: '#0f172a', // This matches your "Standard Mode" navy
        },
        // Adding a specific slate for luxury dark mode backgrounds
        dark: {
          bg: '#0B0F1A',
          card: '#161B26',
          border: '#1E293B',
        }
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '3rem',
      }
    },
  },
  plugins: [],
};

export default config;