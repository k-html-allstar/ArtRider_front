const px0_1000 = { ...Array.from(Array(1001)).map((_, i) => `${i}px`) };

/** @type {import('tailwindcss').Config} */
export default {
  mode: "jit", // css calc()
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      'bg-primary' : '#16BE5C',
      'bg-secondary' : '#E3FFE7',
      'mainWhite' : '#FFFFFF',
      'bg-mainWhite' : '#F7F8FA',
      'bg-strokeWhite' : '#D5F0E1',
      'primary-gray' : '#767676',
      'secondary-gray' : '#AAAAAA',
      'mainRed' : '#E5E5E5',
      'mainBlack' : '#000000',
    },
    extend: {
      minWidth: px0_1000,
      minHeight: px0_1000,
      maxWidth: px0_1000,
      maxHeight: px0_1000,
      width: px0_1000,
      height: px0_1000,
      borderRadius: px0_1000,
      fontSize: px0_1000,
      lineHeight: px0_1000,
      padding: px0_1000,
      margin: px0_1000,
      colors: {
        // 필요할 때 추가 
      }
    },
  },
  plugins: [],
}

