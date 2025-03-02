import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: function (id) {
          if (id.includes("lodash-es")) {
            return "lodash-es";
          }
          if (id.includes("radix-ui")) {
            return "radix-ui";
          }
          if (id.includes("formik")) {
            return "formik";
          }
          return null;
        },
      },
    },
  },
  resolve: {
    alias: {
      "@providers": path.resolve(__dirname, "src/Providers"),
      "@icons": path.resolve(__dirname, "src/Icons"),
      "@components": path.resolve(__dirname, "src/Components"),
      "@rest": path.resolve(__dirname, "src/Rest"),
      "@specs": path.resolve(__dirname, "src/Specs"),
      "@helpers": path.resolve(__dirname, "src/Helpers"),
      "@nexus": path.resolve(__dirname, "src/Nexus"),
    },
  },
});
