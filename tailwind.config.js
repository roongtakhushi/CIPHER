/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'canvas': '#0A0E17',
        'surface-dark': '#121826',
        'surface-card': '#181B25',
        'border-subtle': '#1F293D',
        'paper': '#F3EFE3',
        'paper-ink': '#0A0E17',
        'paper-muted': '#4A5568',
        'lime': '#C6FF3D',
        'lime-dark': '#263500',
        'pink': '#FF4FA3',
        'pink-dark': '#640038',
        'yellow-tape': '#FFD84D',
        'ash': '#A8AFC0',
        'ash-dark': '#5A6578',
        'stamp-red': '#FF334B'
      },
      fontFamily: {
        'display': ['"Space Grotesk"', 'sans-serif'],
        'body': ['"Inter"', 'sans-serif'],
        'mono': ['"JetBrains Mono"', 'monospace'],
        'marker': ['"Caveat"', 'cursive']
      },
      boxShadow: {
        'hard-sm': '2px 2px 0px #000000',
        'hard-md': '4px 4px 0px #000000',
        'hard-lg': '8px 8px 0px #000000',
        'hard-card': '5px 5px 0px #0A0E17',
        'hard-card-hover': '8px 8px 0px #0A0E17',
        'hard-lime': '4px 4px 0px #C6FF3D',
        'hard-pink': '4px 4px 0px #FF4FA3',
        'btn-primary': '3px 3px 0px #FF4FA3',
        'btn-secondary': '3px 3px 0px #C6FF3D',
      }
    },
  },
  plugins: [],
}
