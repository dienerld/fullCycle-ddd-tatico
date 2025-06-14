import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    alias: {
      '@': '/src',
      '@domain': '/src/domain',
      '@infrastructure': '/src/infrastructure',
    },
  },
  test: {
    globals: true,
    // ... Specify options here.
  },
});
