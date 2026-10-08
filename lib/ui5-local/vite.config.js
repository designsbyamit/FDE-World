import { defineConfig } from 'vite';
export default defineConfig({
  build: {
    lib: {
      entry: './ui5-bundle-entry.js',
      name: 'UI5',
      fileName: () => 'ui5-bundle.js',
      formats: ['es']
    },
    outDir: '../ui5-bundle',
    rollupOptions: {
      output: { inlineDynamicImports: true }
    }
  }
});
