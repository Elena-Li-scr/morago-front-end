import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  root: __dirname,
  plugins: [react()],
  resolve: {
    alias: {
      "@shared": path.resolve(__dirname, "../../shared"),
    },
  },
  build: {
    outDir: "../../dist/traslator",
    emptyOutDir: true,
  },
  define: {
    global: "window",
  },
});
