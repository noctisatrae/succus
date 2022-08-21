import { defineConfig } from "vite";
import {NodeGlobalsPolyfillPlugin} from "@esbuild-plugins/node-globals-polyfill";

export default defineConfig({
    optimizeDeps: {
        esbuildOptions: {
            define: {
                global: 'globalThis'
            },
            // Enable esbuild polyfill plugins
            plugins: [
                NodeGlobalsPolyfillPlugin({
                    buffer: true,
                    events: true,
                    util: true,
                    stream: true
                })
            ]
        }
    }
})