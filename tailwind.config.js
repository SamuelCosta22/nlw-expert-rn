/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/index.tsx', './src/app/_layout.tsx', './src/app/product/[id].tsx',
    './src/stores/cart-store.ts', './src/stores/helpers/cart-in-memory.ts',
    './src/components/loading.tsx', './src/components/header.tsx', './src/components/category-button.tsx', './src/components/products.tsx', './src/components/button.tsx', './src/components/link-button.tsx',
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