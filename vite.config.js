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
    // hot module reload for dev server
    hmr: {
      host: "https://test-mww.herokuapp.com/",
      protocol: "wss",
      clientPort: 443,
    },
  },
  plugins: [react()],
};
