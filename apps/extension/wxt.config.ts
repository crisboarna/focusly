import { defineConfig } from "wxt";
import react from "@vitejs/plugin-react";

// See https://wxt.dev/api/config.html
export default defineConfig({
  manifest: {
    name: "Focusly: Active & Focused Tabs",
    permissions: ["storage", "tabs"],
    icons: {
      16: "icon/enabled/16.png",
      32: "icon/enabled/32.png",
      48: "icon/enabled/48.png",
      96: "icon/enabled/96.png",
      128: "icon/enabled/128.png",
    },
  },
  vite: () => ({
    build: {
      rollupOptions: {
        onwarn(warning, warn) {
          if (warning.code !== "NULLISH_COALESCING_ALWAYS_LEFT" && warning.code !== "USELESS_NULLISH_COALESCING") {
            warn(warning);
          }
        },
      },
    },
    plugins: [react()],
  }),
});
