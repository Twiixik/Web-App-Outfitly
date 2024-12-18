import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig(({ command }) => {
  const config = {
    plugins: [react()],
    base: "/",
  };

  if (command !== "serve") {
    config.base = "https://twiixik.github.io/Web-App-Outfitly/";
  }

  return config;
});
