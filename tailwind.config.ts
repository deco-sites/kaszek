export const theme = {
  "primary": "#2FD180",
  "secondary": "hsl(0 39% 39%)",
  "accent": "hsl(150 100% 50%)",
  "neutral": "hsl(0 0% 20%)",
  "base-100": "hsl(0 0% 100%)",
  "success": "hsl(150 62% 95%)",
  "warning": "hsl(43 100% 95%)",
  "error": "hsl(9 100% 95%)",
  "info": "hsl(220 100% 97%)",
  "--rounded-box": "1rem", // border radius rounded-box utility class, used in card and other large boxes
  "--rounded-btn": "0.5rem", // border radius rounded-btn utility class, used in buttons and similar element
  "--rounded-badge": "1.9rem", // border radius rounded-badge utility class, used in badges and similar
  "--animation-btn": "0.25s", // duration of animation when you click on button
  "--animation-input": "0.2s", // duration of animation for inputs like checkbox, toggle, radio, etc
  "--btn-text-case": "uppercase", // set default text transform for buttons
  "--btn-focus-scale": "0.95", // scale transform of button when you focus on it
  "--border-btn": "1px", // border width of buttons
  "--tab-border": "1px", // border width of tabs
  "--tab-radius": "0.5rem", // border radius of tabs
  extend: {
    gridTemplateColumns: {
      "two": "repeat(2, 1fr)",
      "three": "repeat(3, 1fr)",
      "four": "repeat(4, 1fr)",
      "five": "repeat(5, 1fr)",
      "six": "repeat(6, 1fr)",
    },
    maxWidth: {
      "category-desktop": "calc(33% - 12px)",
      "category-tablet": "calc(50% - 12px)",
    },
    screens: {
      "mobile": "576px",
    },
  },
};

export default {
  content: ["./**/*.tsx"],
  theme,
  variants: {},
  plugins: [],
};
