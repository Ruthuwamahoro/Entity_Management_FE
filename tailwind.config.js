/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          'dark': '#121212',
          'dark-secondary': '#1E1E1E',
          'dark-accent': '#2D2D2D',
          'dark-hover': '#333333',
          'accent': '#6366F1',
          'accent-hover': '#4F46E5',
          'text-primary': '#F3F4F6',
          'text-secondary': '#9CA3AF',
        }
      },
    },
    plugins: [],
  }