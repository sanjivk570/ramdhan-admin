// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';
// import tailwindcss from "@tailwindcss/vite";
// // import path from "node:path";

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react(),tailwindcss()],
//   // resolve: {
//   //   alias: {
//   //     "@": path.resolve(`import.meta.dirname`, "./src"),
//   //   },
//   // },
// })

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

import { fileURLToPath, URL } from "node:url";

export default defineConfig({
    plugins: [
        react(),
        tailwindcss(),
    ],

    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url)),
        },
    },
});