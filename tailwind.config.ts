// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        forest: '#1b3b2f',     // deep green
        moss: '#3c6e47',       // earthy green
        sky: '#4a90e2',        // soft blue
        bark: '#3e2214ff',       // rich brown
        leaf: '#a3c9a8',       // pale green
      },
    },
  },
  plugins: [],
};

export default config;
