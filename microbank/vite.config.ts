import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { federation } from "@module-federation/vite";

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "microbank_host",
      remotes: {
        dashboard: {
          type: "module",
          name: "dashboard",
          entry: "http://localhost:5001/remoteEntry.js",
        },
        transfers: {
          type: "module",
          name: "transfers",
          entry: "http://localhost:5002/remoteEntry.js",
        },
        profile: {
          type: "module",
          name: "profile",
          entry: "http://localhost:5003/remoteEntry.js",
        },
        transactions: {
          type: "module",
          name: "transactions",
          entry: "http://localhost:5004/remoteEntry.js",
        },
      },
      shared: ["react", "react-dom"],
      dts: false,
    }),
  ],
  server: {
    port: 5000,
    strictPort: true,
  },
  preview: {
    port: 5000,
    strictPort: true,
  },
  build: {
    target: "esnext",
  },
});
