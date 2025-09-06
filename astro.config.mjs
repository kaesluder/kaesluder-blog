import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';
// import tailwindcss from '@tailwindcss/vite';
// import react from '@astrojs/react';
// https://astro.build/config
export default defineConfig({
  integrations: [react(), mdx()],

  vite: {
    plugins: [tailwindcss()]
  }
});