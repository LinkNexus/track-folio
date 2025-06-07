import {defineConfig} from "vite";
import symfonyPlugin from "vite-plugin-symfony";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";

/* if you're using React */

export default defineConfig({
    plugins: [
        /* react(), // if you're using React */
        symfonyPlugin(),
        viteReact(),
        tailwindcss()
    ],
    build: {
        rollupOptions: {
            input: {
                app: "./assets/main.tsx"
            },
        }
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "assets")
        }
    }
});
