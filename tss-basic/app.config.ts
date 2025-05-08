import { defineConfig } from "@tanstack/react-start/config";
import { InlineConfig } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";

const vite: InlineConfig = {
  server: {
    allowedHosts: ["sp-dev"], // Allow the specified host
  },
  plugins: [
    tsConfigPaths({
      projects: ["./tsconfig.json"],
    }),
  ],
};
export default defineConfig({
  vite,
});
