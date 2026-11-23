// @ts-check
import { defineConfig } from 'astro/config';

// L'adresse définitive sera renseignée au branchement du nom de domaine.
export default defineConfig({
  site: 'https://ortra-intendance.netlify.app',
  trailingSlash: 'ignore',
  build: { format: 'directory' },
});
