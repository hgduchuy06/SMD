/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // Hỗ trợ chế độ Dark Mode
  theme: {
    extend: {
      colors: {
        // Định nghĩa màu thương hiệu từ thiết kế
        primary: "#135bec",
        "background-light": "#f6f6f8",
        "background-dark": "#101622",
      },
      fontFamily: {
        // Font chữ Lexend chuyên nghiệp cho Dashboard
        display: ["Lexend", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        lg: "0.5rem",
        xl: "0.75rem",
        full: "9999px",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"), // Giúp các ô input search đẹp hơn
  ],
};
