/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: "#050505",
          purple: "#6d28d9",
          "purple-light": "#8b5cf6",
        }
      },
      animation: {
        'matrix': 'matrix 20s linear infinite',
        'marquee': 'marquee 25s linear infinite',
        'scroll': 'scroll 40s linear infinite',
      },
      keyframes: {
        matrix: {
          '0%': { transform: 'translateY(-50%)' },
          '100%': { transform: 'translateY(0%)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        scroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        }
      }
    },
  },
  plugins: [],
}
