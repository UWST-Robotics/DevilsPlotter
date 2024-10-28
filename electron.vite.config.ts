import react from '@vitejs/plugin-react'
import {defineConfig, externalizeDepsPlugin} from 'electron-vite'

export default defineConfig({
    main: {
        plugins: [externalizeDepsPlugin()],
    },
    preload: {
        plugins: [externalizeDepsPlugin()],
    },
    renderer: {
        publicDir: "public",
        build: {
            lib: {
                name: "AutoDevil",
                entry: "src/main/main.ts"
            }
        },
        plugins: [react()],
        base: "/",
        server: {
            port: 3000
        },
        define: {
            APP_VERSION: JSON.stringify(process.env.npm_package_version),
        },
    }
})