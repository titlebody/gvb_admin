import { fileURLToPath, URL } from 'node:url';
import { defineConfig, loadEnv } from 'vite';
import { resolve } from 'node:path';

import vue from '@vitejs/plugin-vue';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import Icons from 'unplugin-icons/vite';
import { terser } from 'rollup-plugin-terser';
import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
import { createStyleImportPlugin, AndDesignVueResolve } from 'vite-plugin-style-import';
import { visualizer } from 'rollup-plugin-visualizer'; // 引入可视化插件
import compression from 'vite-plugin-compression'; // 引入压缩插件

export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  const baseUrl = env.VITE_API;

  return defineConfig({
    envPrefix: ["VITE_"],
    plugins: [
      vue(),
      Icons({
        autoInstall: true,
      }),
      terser({ // 添加 terser 插件配置
        compress: {
          drop_console: true, // 去掉 console.log
        },
      }),
      Components({
        resolvers: [
          AntDesignVueResolver({
            importStyle: "less", // 按需引入 Ant Design Vue 样式
          }),
        ],
      }),
      visualizer({ // 可视化打包结果
        open: true, // 是否自动打开报告
        gzipSize: true, // 是否显示 gzip 压缩后的大小
        brotliSize: true, // 是否显示 brotli 压缩后的大小
      }),
      compression({ // 启用压缩插件
        ext: '.gz',
        deleteOriginFile: false,
      }),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    css: {
      postcss: {
        plugins: [tailwindcss, autoprefixer],
      },
    },
    server: {
      host: '0.0.0.0',
      port: 8080,
      hmr: {
        overlay: false,
      },
      open: true,
      proxy: {
        '/uploads': {
          target: 'https://www.huchenxi.fun',
          secure: false, // 忽略证书验证
        },
        "/api": {
          target: "https://www.huchenxi.fun",
          secure: false, // 忽略证书验证
        },
      },
    },
    build: {
      sourcemap: false,
      // 消除打包大小超过500kb警告
      chunkSizeWarningLimit: 4000,

      // 启用代码分割
      rollupOptions: {
        input: {
          index: resolve("index.html")
        },
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              const moduleName = id.toString().split('node_modules/')[1].split('/')[0];
              if (moduleName.startsWith('@lezer')) {
                return 'lezer';
              }
              if (moduleName.startsWith('@codemirror')) {
                return 'codemirror';
              }
              return moduleName;
            }
            if (id.includes('md-editor-v3')) {
              return 'editor'; // 将 md-editor-v3 打包成一个单独的 chunk
            }
          },
        },
      },
    },
    optimizeDeps: {
      include: ['md-editor-v3'],
    },
  });
};