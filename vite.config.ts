import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
    css: {
        devSourcemap: true,
    },
    plugins: [react()],
    resolve: {
        alias: {
            '@root': path.resolve(__dirname, './src'),
            '@assets': path.resolve(__dirname, './src/assets'),
            '@globalStyles': path.resolve(__dirname, './src/styles'),
        },
    },
})
