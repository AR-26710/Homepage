import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import { VitePWA } from "vite-plugin-pwa";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind()],

  // dev mode
  // site: 'http://localhost:4321',

  // production mode
  site: 'https://www.houxiongxiong.icu',

  vite: {
    plugins: [
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['*.html', 'favicons/*.png', 'favicons/*.ico', 'fonts/*.ttf', 'icons/*.jpg', 'icons/*.png'],
        strategies: 'generateSW',
        devOptions: {
          enabled: false,
          type: 'module'
        },
        selfDestroying: false,
        manifest: {
          name: "呀哈喽",
          short_name: "呀哈喽",
          description: "呀哈喽的个人主页",
          theme_color: "#ffffff",
          background_color: "#ffffff",
          display: "standalone",
          icons: [
            {
              src: "favicons/android-chrome-192x192.png",
              sizes: "192x192",
              type: "image/png"
            },
            {
              src: "favicons/android-chrome-512x512.png",
              sizes: "512x512",
              type: "image/png"
            }
          ]
        },
        workbox: {
          clientsClaim: true,
          skipWaiting: true,
          navigateFallback: 'index.html'
        }
      })
    ]
  }
});
