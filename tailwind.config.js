/** @type {import('tailwindcss').Config} */
const withAlpha = (v) => `rgb(var(${v}) / <alpha-value>)`

export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        background: withAlpha('--background'),
        foreground: withAlpha('--foreground'),
        card: withAlpha('--card'),
        muted: withAlpha('--muted'),
        'muted-foreground': withAlpha('--muted-foreground'),
        border: withAlpha('--border'),
        primary: withAlpha('--primary'),
        'primary-foreground': withAlpha('--primary-foreground'),
        signal: withAlpha('--signal'),
      },
      fontFamily: {
        sans: ['"Manrope Variable"', 'Manrope', 'system-ui', 'sans-serif'],
      },
      transitionTimingFunction: {
        fluid: 'cubic-bezier(0.32, 0.72, 0, 1)',
      },
    },
  },
  plugins: [],
}
