/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'libertador-blue': '#3A5A40', // Verde Oliva Oscuro (reemplaza al azul)
        'libertador-blue-hover': '#2D4532', // Verde más oscuro para hover
        'libertador-orange': '#D4AF37', // Dorado (reemplaza al naranja)
        'libertador-orange-dark': '#B5952F', // Dorado oscuro
        'pintada-green': '#3A5A40',
        'pintada-gold': '#D4AF37',
        'pintada-cream': '#F9F7F2',
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': {
            opacity: '0',
            transform: 'translateY(20px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        float: {
          '0%, 100%': {
            transform: 'translateY(0px)',
          },
          '50%': {
            transform: 'translateY(-10px)',
          },
        },
      },
    },
  },
  plugins: [],
}