/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ['var(--font-poppins)', 'sans-serif'],
        body: ['var(--font-roboto)', 'sans-serif'],
      },
      letterSpacing: {
        tightest: '-0.02em', // tracking plus serré pour h1
        tighter: '-0.01em',  // tracking -10 pour les titres
      },
      colors: {
        // Définir les couleurs de la marque pour une utilisation facile dans Tailwind
        'fps-primary': 'var(--primary)',
        'fps-secondary': 'var(--secondary)',
        'fps-accent': 'var(--accent)',
        'fps-danger': 'var(--danger)',
      },
    },
  },
  plugins: [],
}; 