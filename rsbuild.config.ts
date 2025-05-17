import path from "path";
import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import { readFileSync } from "fs";

// Extract version from package.json
const { version } = JSON.parse(readFileSync("./package.json", "utf-8"));

export default defineConfig({
  source: {
    define: {
      "process.env.APP_VERSION": JSON.stringify(version),
    },
  },
  plugins: [pluginReact()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  html: {
    title: "TicketSoup",
    favicon: "./public/ticketsoup.svg",
  },
});
