import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { federation } from "@module-federation/vite";

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "dashboard",
      filename: "remoteEntry.js",
      exposes: {
        "./Dashboard": "./src/Dashboard.tsx",
      },
      shared: ["react", "react-dom"],
      dts: false,
    }),
  ],
  server: {
    port: 5001,
    strictPort: true,
    origin: "http://localhost:5001",
  },
  preview: {
    port: 5001,
    strictPort: true,
  },
  build: {
    target: "esnext",
  },
});
