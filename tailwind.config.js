/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidiana: '#0D0D12',
        champagne: '#C9A84C',
        marfil: '#FAF8F5',
        pizarra: '#2A2A35',
        secondary: {
          900: '#16161D',
          800: '#23232C',
          gold: '#B8913C',
          light: '#F5F3EF'
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        drama: ['"Playfair Display"', 'serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      }
    },
  },
  plugins: [],
}
