import react from "@vitejs/plugin-react";
import "dotenv/config";

/**
 * @type {import('vite').UserConfig}
 */
export default {
  define: {
    "process.env.SHOPIFY_API_KEY": JSON.stringify(process.env.SHOPIFY_API_KEY),
  },
  server: {
    port: 3000,
    strictPort: true,
    hmr: {
      port: 9000,
    },
  },
  base: "./",
  plugins: [react()],
};
