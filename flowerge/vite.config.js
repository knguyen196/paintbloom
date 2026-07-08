import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  base: "https://github.com/knguyen196/paintbloom",
  plugins: [react(), tailwindcss()],
});
