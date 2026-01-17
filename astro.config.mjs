// @ts-check
import { defineConfig } from 'astro/config';

import vue from '@astrojs/vue';

import react from '@astrojs/react';

import tailwindcss from '@tailwindcss/vite';

import db from '@astrojs/db';
import vercel from '@astrojs/vercel/serverless';
// https://astro.build/config
export default defineConfig({
  integrations: [vue(), react(), db()],
  output: 'server',

  vite: {
    plugins: [tailwindcss()]
  },

  adapter: vercel()
});