import react from "@vitejs/plugin-react";
import "dotenv/config";

/**
 * @type {import('vite').UserConfig}
 */
export default {
  mode: "development",
  define: {
    "process.env.SHOPIFY_API_KEY": JSON.stringify(process.env.SHOPIFY_API_KEY),
  },
  plugins: [react()],
  clearScreen: false,
  server: {
    port: 3000,
    https: true,
    hmr: {
      host: "https://test-mww.herokuapp.com",
      port: 3001,
      protocol: "wss",
    },
  },
};
