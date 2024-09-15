/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Adjust based on your project structure
  ],
  theme: {
    extend: {
      keyframes: {
        'jump-in': {
          '0%': { transform: 'translateY(-50%)', opacity: '0' },  // Reduced initial movement
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      animation: {
        'jump-in': 'jump-in 0.8s ease-out forwards',  // Slower, smoother easing
      },
    },
  },
  plugins: [],
}