import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { federation } from "@module-federation/vite";
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "transactions",
      filename: "remoteEntry.js",
      exposes: {
        "./Transactions": "./src/Transactions.tsx",
      },
      shared: ["react", "react-dom"],
      dts: false,
    }),
  ],
  server: {
    port: 5004,
    strictPort: true,
    origin: "http://localhost:5004",
  },
  preview: {
    port: 5004,
    strictPort: true,
  },
  build: {
    target: "esnext",
  },
});
