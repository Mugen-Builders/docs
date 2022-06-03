module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  corePlugins: {
    preflight: false,
    container: false,
  },
  theme: {
    fontFamily: {
      sans: ["FK Grotesk", "sans-serif"],
      serif: ["FK Roman Display", "serif"],
    },
    extend: {
      colors: {
        gray: {
          50: "#FAFAFB",
          100: "#E0E0E8",
          200: "#C7C7D4",
          300: "#ADADBF",
          400: "#9494AB",
          500: "#7C7B96",
          600: "#646281",
          700: "#4C496C",
          800: "#353157",
          900: "#1E1941",
        },
        blue: {
          50: "#E1EBFF",
          100: "#C1DAF9",
          200: "#85B4FF",
          300: "#74a6f5",
          400: "#4D7BD2",
          500: "#2D5ABE",
          600: "#254DA9",
          700: "#1E4092",
          800: "#17347C",
          900: "#112864",
        },
        yellow: {
          50: "#FFFAE6",
          100: "#FFF9CB",
          200: "#FFF6A9",
          300: "#FFF38A",
          400: "#FFEF70",
          500: "#FFE95A",
          600: "#ffdc30",
          700: "#FFD700",
          800: "#9C6632",
          900: "#7A4426",
        },
      },
    },
  },
  plugins: [],
};
