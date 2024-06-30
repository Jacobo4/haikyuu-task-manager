import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
    css: {
        devSourcemap: true,
    },
    plugins: [react(), svgr()],
    resolve: {
        alias: {
            '@root': path.resolve(__dirname, './src'),
            '@styles': path.resolve(__dirname, './src/styles'),
            '@assets': path.resolve(__dirname, './src/assets'),
            '@globalStyles': path.resolve(__dirname, './src/styles'),
            '@components': path.resolve(__dirname, './src/components'),
        },
    },
})
