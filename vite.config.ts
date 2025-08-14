import { defineConfig,  } from 'vite';
import react from '@vitejs/plugin-react';
import commonjs from 'vite-plugin-commonjs';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import path from 'path';

export default defineConfig({
  server: {
    open: true
  },
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
    },
    commonjsOptions: { transformMixedEsModules: true }
  },
  define: {
    'process.browser': true,
    'process.env.FLUID_CONFIGURATIONS_VERSION': parseInt('3.13.0')
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      'superagent-mock': path.resolve(
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
