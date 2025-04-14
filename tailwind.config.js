// tailwind.config.js
module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}'
  ],
  safelist: [
    'bg-white', 'text-white', 'dark:bg-[#1f2937]', 'dark:text-white',
    'bg-[#5b4ddb]', 'text-[#5b4ddb]', 'rounded-xl', 'rounded-md',
    'hover:bg-[#5b4ddb]', 'hover:text-white', 'transition', 'duration-300'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#5b4ddb',
        dark: '#1e1e2f'
      },
      fontFamily: {
        sans: ['DM Sans', 'Inter', 'sans-serif']
      }
    }
  },
  plugins: []
}