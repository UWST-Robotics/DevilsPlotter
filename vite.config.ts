import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    root: "src/renderer",
    base: "/",
    plugins: [react()],
    server: {
        port: 3000
    },
    define: {
        APP_VERSION: JSON.stringify(process.env.npm_package_version),
        electronAPI: undefined
    },
});