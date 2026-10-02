import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { viteSingleFile } from 'vite-plugin-singlefile';

// `npm run build` → normal Vercel build.
// `npm run build:preview` → one self-contained HTML file for sharing a preview.
export default defineConfig(({ mode }) => ({
  plugins: [react(), tailwindcss(), ...(mode === 'singlefile' ? [viteSingleFile()] : [])],
  build: mode === 'singlefile' ? { outDir: 'dist-preview', assetsInlineLimit: 100000000 } : {},
}));
