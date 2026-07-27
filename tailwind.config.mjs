/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        ivoire: {
          DEFAULT: '#FAF7F0',
          50: '#FCFAF4',
          100: '#FAF7F0',
          200: '#F2EBDB',
          300: '#E6DBBF',
        },
        encre: {
          DEFAULT: '#1A1A1A',
          80: '#3A3A3A',
          60: '#5C5C5C',
          40: '#8A8A8A',
        },
        or: {
          DEFAULT: '#B89B5E',
          dark: '#8E7544',
          light: '#D6BC85',
        },
      },
      fontFamily: {
        // Calligraphie pour le nom et titres décoratifs
        script: ['"Pinyon Script"', 'cursive'],
        // Police Daydream (voir @font-face dans global.css). En attendant le
        // fichier de police, elle utilise "Pinyon Script" en repli.
        daydream: ['"Daydream"', '"Pinyon Script"', 'cursive'],
        // Serif élégant pour titres et corps de texte
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        // Sans-serif fine pour l'interface
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        widest2: '0.25em',
      },
      boxShadow: {
        soft: '0 1px 2px rgba(26,26,26,0.04), 0 8px 24px rgba(26,26,26,0.06)',
        softer: '0 1px 2px rgba(26,26,26,0.03), 0 16px 40px rgba(26,26,26,0.05)',
        lift: '0 2px 4px rgba(26,26,26,0.06), 0 20px 50px rgba(26,26,26,0.10)',
      },
      transitionTimingFunction: {
        soft: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
};
