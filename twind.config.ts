/** @type {import('$fresh/plugins/twind').Options} */
export default {
  plugins: {
    "l-container": "max-w-[1200px] sm:w-[calc(100% - 24px)]",
    "flex-center-between": "flex items-center justify-between",
    "flex-center-end": "flex items-center justify-end",
    "flex-center-center" : "flex items-center justify-center",
    "is-sticky": {
      filter:
        "invert(100%) sepia(100%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%)",
    },
    "letter-spacing": { letterSpacing: "1px" },
    "color-green": { color: "#005046" },
    "color-green-lemon": {
      filter:
        "invert(84%) sepia(20%) saturate(530%) hue-rotate(112deg) brightness(200%) contrast(95%)",
    },
    "Noe-Display-Font": { fontFamily: "Noe Display Bold" },
    "Maax-Bold-Font": { fontFamily: "Maax Bold" },
    "Maax-Regular-Font": { fontFamily: "Maax Regular" },
  },
  theme: {
    extend: {
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
      colors: {
        primary: "#2FD180",
        "primary-dark": "#003232",
        "primary-light": "#C5FFE9",
        transparent: "transparent",
      },
      fontFamily: {      
        serif: ["serif"],
      },
    },
  },
};
