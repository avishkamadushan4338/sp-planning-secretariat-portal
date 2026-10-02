import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  server: {
    port: 7001,
  },
  preview: {
    port: 7001,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "react-router-dom": path.resolve(__dirname, "./src/shared/react-router-dom-shim.ts"),
    },
  },
  plugins: [
    tanstackStart(),
    nitro({ preset: "node-server" }),
    viteReact(),
  ],
});
