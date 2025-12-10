// @ts-check
import { defineConfig } from 'astro/config';

import vue from '@astrojs/vue';

import react from '@astrojs/react';

import tailwindcss from '@tailwindcss/vite';

import db from '@astrojs/db';

// https://astro.build/config
export default defineConfig({
  integrations: [vue(), react(), db()],

  vite: {
    plugins: [tailwindcss()]
  }
});