import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@providers": path.resolve(__dirname, "src/Providers"),
      "@icons": path.resolve(__dirname, "src/Icons"),
      "@components": path.resolve(__dirname, "src/Components"),
      "@rest": path.resolve(__dirname, "src/Rest"),
      "@specs": path.resolve(__dirname, "src/Specs"),
    },
  },
});
