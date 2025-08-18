import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
    plugins: [react()],
    // Do NOT change "root" unless you know why. With this layout, it should be the frontend folder itself.
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
});
