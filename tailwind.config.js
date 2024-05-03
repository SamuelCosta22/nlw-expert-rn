/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/index.tsx', './src/app/_layout.tsx',
    './src/components/loading.tsx', './src/components/header.tsx', './src/components/category-button.tsx'
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: "Inter_600SemiBold",
        subtitle: "Inter_500Medium",
        body: "Inter_400Regular",
        bold: "Inter_700Bold",
      }
    },
  },
  plugins: [],
}