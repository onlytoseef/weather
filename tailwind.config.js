/** @type {import('tailwindcss').Config} */
export default {
   content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
   theme: {
      extend: {
         colors: {
            grey: "#BFBFD4",
            option: "#3B3B54",
            blue: "#8FB2F5",
            bgBlack: "#131319",
         },
      },
   },
   plugins: [],
};
