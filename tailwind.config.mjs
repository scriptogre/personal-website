const plugin = require('tailwindcss/plugin');
import { addDynamicIconSelectors } from "@iconify/tailwind";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}"],
  plugins: [
    plugin(function({ addVariant }) {
      addVariant("side-nav-open", 'html:has(input#side-nav-toggle:checked) &')
    }),
    require("tailwindcss-animated"),
    require("@tailwindcss/typography"),
    addDynamicIconSelectors(),
  ],
  darkMode: "selector",
};
