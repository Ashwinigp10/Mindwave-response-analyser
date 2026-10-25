/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./login.html",
    "./screening.html",
    "./schizophrenia-test.html",
    "./react-component/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkBg: '#0B1220',
        brandPurple: '#8B5CF6',
        infoBlue: '#3B82F6',
        positiveGreen: '#10B981',
        cautionYellow: '#F59E0B',
        severityRed: '#EF4444',
      },
      fontFamily: {
        sans: ['Poppins', 'Sora', 'sans-serif'],
        heading: ['Sora', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 15px rgba(139, 92, 246, 0.15)',
      }
    },
  },
  plugins: [],
}
