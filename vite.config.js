import react from "@vitejs/plugin-react";
import "dotenv/config";

/**
 * @type {import('vite').UserConfig}
 */
export default {
  devServer: {
    proxy: "https://test-mww.herokuapp.com",
  },
  define: {
    "process.env.SHOPIFY_API_KEY": JSON.stringify(process.env.SHOPIFY_API_KEY),
  },
  server: {
    hmr: false,
  },
  plugins: [react()],
};
