import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { mockDevServerPlugin } from "vite-plugin-mock-dev-server";

export default defineConfig({
  root: __dirname,
  plugins: [
    react(),
    mockDevServerPlugin({
      include: ["mocks/**/*.ts"],
      log: true,
    }),
  ],
  resolve: {
    alias: {
      "@shared": path.resolve(__dirname, "../../shared"),
    },
  },
  build: {
    outDir: "../../dist/client",
    emptyOutDir: true,
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:9999", // сюда фактически не уйдём — моки ответят раньше
        changeOrigin: true,
        secure: false,
      },
    },
  },
  define: {
    global: "window",
  },
});
