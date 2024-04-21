import { defineConfig } from 'vitest/config';
import { WxtVitest } from 'wxt/testing';
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  test: {
    mockReset: true,
    restoreMocks: true,
    globals: true,
    environment: "happy-dom",
    coverage: {
      provider: 'istanbul',
      reporter: ['text', 'lcov'],
      exclude: [
        '**/*.test.ts',
        '**/*.test.tsx',
        '**/*.config.ts',
        'entrypoints/background.ts',
        'entrypoints/isolated-world.content.ts',
        'entrypoints/main-world.content.ts',
      ],
    },
  },
  plugins: [WxtVitest(), react()],
  // If any dependencies rely on webextension-polyfill, add them here to the `ssr.noExternal` option.
  ssr: {
    noExternal: ['@webext-core/storage'],
  },
});
