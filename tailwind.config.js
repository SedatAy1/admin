// tailwind.config.js
module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}'
  ],
  safelist: [
    // Tema renkleri
    'bg-white', 'text-white', 'dark:bg-[#1f2937]', 'dark:text-white',

    // Aktif buton class’ları
    'bg-[#5b4ddb]', 'text-[#5b4ddb]', 'hover:bg-[#5b4ddb]', 'hover:text-white',

    // Boyut ve şekil class’ları
    'rounded-xl', 'rounded-md', 'rounded-full',

    // Tema konumları
    'fixed', 'scrollable', 'active', 'enable', 'disable',

    // Animasyonlar
    'transition', 'duration-300', 'ease-in-out',

    // Layout class’ları (Netlify için hayati)
    'menu-click', 'icon-hover', 'icon-default', 'full-width', 'boxed', 'light', 'dark'
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