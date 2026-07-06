import path from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  root: "desktop",
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname)
    }
  },
  server: {
    host: "127.0.0.1",
    port: 1420,
    strictPort: true
  },
  clearScreen: false,
  build: {
    outDir: "../dist-desktop",
    emptyOutDir: true,
    sourcemap: true
  }
});
