import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { federation } from "@module-federation/vite";

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "profile",
      filename: "remoteEntry.js",
      exposes: {
        "./Profile": "./src/Profile.tsx",
      },
      shared: ["react", "react-dom"],
      dts: false,
    }),
  ],
  server: {
    port: 5003,
    strictPort: true,
    origin: "http://localhost:5003",
  },
  preview: {
    port: 5003,
    strictPort: true,
  },
  build: {
    target: "esnext",
  },
});