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
};
