import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, passthroughImageService } from "astro/config";
import icon from "astro-icon";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeCallouts from "rehype-callouts";
import rehypeExternalLinks from "rehype-external-links";
import rehypeKatex from "rehype-katex";
import rehypeSlug from "rehype-slug";
import remarkMath from "remark-math";

export default defineConfig({
  site: "https://actelos.github.io",
  base: "/",
  image: {
    service: passthroughImageService(),
  },
  markdown: {
    shikiConfig: {
      wrap: false,
      themes: {
        dark: "catppuccin-mocha",
        light: "catppuccin-latte",
      },
    },
    remarkPlugins: [remarkMath],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeExternalLinks,
        { target: "_blank", rel: ["noopener", "noreferrer"] },
      ],
      rehypeKatex,
      rehypeCallouts,
      [
        rehypeAutolinkHeadings,
        { behavior: "wrap", properties: { className: "heading-anchor" } },
      ],
    ],
  },
  vite: { plugins: [tailwindcss()] },
  integrations: [mdx(), sitemap(), icon()],
});
