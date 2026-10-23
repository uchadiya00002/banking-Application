import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { federation } from "@module-federation/vite";

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "transfers",
      filename: "remoteEntry.js",
      exposes: {
        "./Transfers": "./src/Transfers.tsx",
      },
      shared: ["react", "react-dom"],
      dts: false,
    }),
  ],
  server: {
    port: 5002,
    strictPort: true,
    origin: "http://localhost:5002",
  },
  preview: {
    port: 5002,
    strictPort: true,
  },
  build: {
    target: "esnext",
  },
});
