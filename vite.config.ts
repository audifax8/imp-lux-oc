import { defineConfig,  } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import commonjs from 'vite-plugin-commonjs';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

export default defineConfig({
  base: 'imp-lux-oc',
  plugins: [
    react(),
    commonjs(),
    nodePolyfills()
  ],
  build: {
    chunkSizeWarningLimit: 500,
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        format: 'es',
        manualChunks: {
          vendor: ['@cfg.plat/configure-core']
        },
        inlineDynamicImports: false
      }
    }
  },
  define: {
    'process.browser': true,
    'process.env.FLUID_CONFIGURATIONS_VERSION': parseInt('3.13.0')
  },
  resolve: {
    alias: {
      'superagent-mock': resolve(
        __dirname,
        'node_modules',
        '@cfg.plat',
        'configuration-loader',
        'node_modules',
        'superagent-mock',
        'src',
        'superagent-mock.js'
      )
    }
  }
});
