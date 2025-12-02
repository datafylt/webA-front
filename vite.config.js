import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import UnoCSS from 'unocss/vite'
import { createHtmlPlugin } from 'vite-plugin-html'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'  // IMPORTANT!

export default defineConfig(() => {
  return {
    base: '/',

    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '~': path.resolve(__dirname, './'),
      },
    },

    plugins: [
      vue(),
      UnoCSS(),

      createHtmlPlugin({
        inject: {
          data: { title: 'Datafylt Admin' },
        },
      }),

      // SVG Icons Plugin - THIS IS CRITICAL!
      createSvgIconsPlugin({
        iconDirs: [path.resolve(__dirname, 'src/assets/svg')],
        symbolId: 'icon-custom-[name]',
        inject: 'body-first',
        customDomId: '__svg__icons__dom__',
      }),

      AutoImport({
        imports: ['vue', 'vue-router', {
          'naive-ui': ['useDialog', 'useMessage', 'useNotification', 'useLoadingBar'],
        }],
        dts: false,
      }),

      Components({
        resolvers: [NaiveUiResolver()],
        dts: false,
      }),
    ],

    server: {
      host: '0.0.0.0',
      port: 3101,  // Changed from 3100
      open: true,

          proxy: {
            '/api/v1': {
              target: 'http://localhost:8001',  // Website A backend
              changeOrigin: true,
              configure: (proxy) => {
                proxy.on('proxyReq', (proxyReq, req) => {
                  console.log('[WEBSITE-A]', req.method, req.url, '→ 8001')
                })
              },
            },
          },
        },

    build: {
      target: 'es2015',
      outDir: 'dist',
      reportCompressedSize: false,
      chunkSizeWarningLimit: 1024,
    },
  }
})