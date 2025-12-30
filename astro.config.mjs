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

  // mode: 不同的网站 cn/top/moe
  siteMode: "icu",

  vite: {
    plugins: [
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['favicons/*.png', 'favicons/*.ico', 'fonts/*.ttf', 'icons/*.jpg', 'icons/*.png'],
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
          maximumFileSizeToCacheInBytes: 10 * 1024 * 1024,
          globPatterns: ['**/*.{js,css,html,ico,png,jpg,jpeg,svg,woff,woff2,ttf,eot}'],
          runtimeCaching: [
            {
              urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
              handler: 'CacheFirst',
              options: {
                cacheName: 'google-fonts-cache',
                expiration: {
                  maxEntries: 10,
                  maxAgeSeconds: 60 * 60 * 24 * 365
                },
                cacheableResponse: {
                  statuses: [0, 200]
                }
              }
            },
            {
              urlPattern: /^https:\/\/www\.houxiongxiong\.icu\/.*/i,
              handler: 'NetworkFirst',
              options: {
                cacheName: 'site-cache',
                expiration: {
                  maxEntries: 50,
                  maxAgeSeconds: 60 * 60 * 24 * 7
                },
                cacheableResponse: {
                  statuses: [0, 200]
                }
              }
            }
          ]
        }
      })
    ]
  }
});
