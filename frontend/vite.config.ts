import { defineConfig, loadEnv } from "vite";
import VueI18nPlugin from "@intlify/unplugin-vue-i18n/vite";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath } from "url";

export default ({ mode }: any) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    plugins: [
      vue(),
      VueI18nPlugin({
        include: fileURLToPath(new URL("./src/shared/i18n/locales/**\/*.json", import.meta.url)),
        runtimeOnly: false,
      }),
    ],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    define: { "process.env": {} },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@/app/styles/variables";`,
        },
      },
    },
    server: {
      port: 3000,
      open: true,
      proxy: {
        "/socket.io": {
          target: "http://localhost:4000",
          ws: true,
        },
        "/api": {
          target: "http://localhost:4000",
          changeOrigin: true,
        },
      },
    },
    build: {
      chunkSizeWarningLimit: 1100,
      sourcemap: false,
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ["vue", "vue-router"],
          },
        },
      },
    },
  });
};
