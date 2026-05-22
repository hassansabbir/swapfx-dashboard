import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom", "react-router-dom", "react-redux", "@reduxjs/toolkit"],
          ui: ["antd", "react-icons"],
          chart: ["recharts"],
          editor: ["jodit-react"]
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
  server: {
    // host: "192.168.10.20",
    // port: 3003,
  },
});
