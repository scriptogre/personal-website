import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/serverless";
import svelte from "@astrojs/svelte";
import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind({
    applyBaseStyles: false
  }), svelte(), mdx()],
  output: "hybrid",
  adapter: vercel({
    webAnalytics: {
      enabled: true
    },
    imageService: true,
    imagesConfig: { sizes: [40, 80, 96, 192, 224, 300, 448, 480, 600, 640, 750, 828, 960, 1080, 1200], domains: [] }
  })
});
