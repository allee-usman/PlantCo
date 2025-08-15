/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: [
    "./src/components/**/*.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  darkMode: "class",
  theme: {
    // Custom font families - properly mapped to font weights
    fontFamily: {
      // Primary Nexa font family with proper fallbacks
      "nexa-thin": ["Nexa-100", "system-ui", "sans-serif"],
      "nexa-light": ["Nexa-300", "system-ui", "sans-serif"],
      nexa: ["Nexa-400", "system-ui", "sans-serif"],
      "nexa-italic": ["Nexa-400-Italic", "system-ui", "sans-serif"],
      "nexa-book": ["Nexa-500", "system-ui", "sans-serif"],
      "nexa-bold": ["Nexa-600", "system-ui", "sans-serif"],
      "nexa-extrabold": ["Nexa-700", "system-ui", "sans-serif"],
      "nexa-heavy": ["Nexa-800", "system-ui", "sans-serif"],
      "nexa-black": ["Nexa-900", "system-ui", "sans-serif"],

      // Secondary font family
      montserrat: ["Montserrat", "system-ui", "sans-serif"],
    },

    // Optimized font sizes with proper line heights and letter spacing
    fontSize: {
      // Body text sizes
      xs: ["12px"],
      sm: ["14px"],
      base: ["16px"],
      lg: ["18px"],

      // Heading sizes
      xl: ["20px"],
      "2xl": ["24px"],
      "3xl": ["28px"],
      "4xl": [
        "32px",
        {
          letterSpacing: "-0.025em",
        },
      ],
      "5xl": [
        "36px",
        {
          letterSpacing: "-0.025em",
        },
      ],
      "6xl": [
        "42px",
        {
          letterSpacing: "-0.05em",
        },
      ],
    },

    extend: {
      colors: {
        primary: "#6CC51D", // brand main color
        secondary: "#01c38d",

        light: {
          // Base Backgrounds
          screen: "#F7F7FF",
          surface: "#FFFFFF",
          accent: "#4d7111",

          // Light brand color palette
          pallete: {
            50: "#f8fde8",
            100: "#effbcc",
            200: "#ddf6a0",
            300: "#c5ee68",
            400: "#abe13a",
            500: "#8dc71b", // default
            600: "#6c9f11",
            700: "#4d7111",
            800: "#436014",
            900: "#395116",
            950: "#1c2d06",
          },

          // Text Colors
          title: "#172505", // titles, product name
          subtitle: "#1c2d06", // section title, card titles, labels for grouped content
          disabled: "#9CA3AF", // Added missing disabled color
          inactive: "#6B7280", // Added missing inactive color
        },

        // Dark theme colors
        dark: {
          // Base Backgrounds
          screen: "#132d46",
          surface: "#191e29",
          accent: "#00a377",

          // Dark brand color palette
          pallete: {
            50: "#eafff6",
            100: "#cdfee8",
            200: "#a0fad6",
            300: "#63f2c1",
            400: "#26e1a7",
            500: "#01c38d", // default
            600: "#00a377",
            700: "#008262",
            800: "#00674e",
            900: "#005442",
            950: "#003027",
          },

          // Text Colors
          title: "#FFFFFF", // titles, product name
          subtitle: "#9CA3AF", // section title, card titles, labels for grouped content
        },
      },
      boxShadow: {
        "3xl": "0 10px 40px rgba(0, 0, 0, 0.1)",
      },
    },
  },
  plugins: [],
  debug: true,
};
