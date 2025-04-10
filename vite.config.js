import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import vueDevTools from 'vite-plugin-vue-devtools';
import inkline from '@inkline/plugin/vite';

const inklineConfig = {
    outputDir: 'src/css/variables'
};

// https://vite.dev/config/
export default defineConfig({
    plugins: [inkline(inklineConfig), vue(), vueJsx(), vueDevTools()],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    }
});
