import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

import { mockDevServerPlugin } from "vite-plugin-mock-dev-server";

// const enableMock = process.env.NODE_ENV !== "production";

export default defineConfig({
  root: __dirname,
  plugins: [
    react(),
    mockDevServerPlugin({
      include: ["src/mock/**/*.mock.ts"],
      prefix: "/admin",
    }),
  ],
  resolve: {
    alias: {
      "@shared": path.resolve(__dirname, "../../shared"),
    },
  },
  build: {
    outDir: "../../dist/admin",
    emptyOutDir: true,
  },
  server: {
    open: true,
    port: 5175,
  },
});
