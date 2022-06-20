import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { useEffect, useState, useCallback } from "react";
import {
  Provider as AppBridgeProvider,
  useAppBridge,
} from "@shopify/app-bridge-react";
import { authenticatedFetch } from "@shopify/app-bridge-utils";
import { Redirect } from "@shopify/app-bridge/actions";
import { AppProvider as PolarisProvider } from "@shopify/polaris";
import translations from "@shopify/polaris/locales/en.json";
import "@shopify/polaris/build/esm/styles.css";
import Cookies from "js-cookie";
import ProductCard from "./components/ProductsCard";

export default function App() {
  const [productCount, setProductCount] = useState(0);
  console.log(
    "🚀 ~ file: App.jsx ~ line 21 ~ App ~ productCount",
    productCount
  );

  const handleIframeLoad = (e) => {
    // const appb = useAppBridge();
    // const fetch = userLoggedInFetch(appb);
    // const updateProductCount = useCallback(async () => {
    //   const res = await fetch("/products-count").then((res) => res.json());
    //   console.log(
    //     "🚀 ~ file: App.jsx ~ line 41 ~ updateProductCount ~ res",
    //     res
    //   );
    //   setProductCount(res);
    // }, []);

    // updateProductCount();
    e.preventDefault();
    document.getElementById("mww-iframe").contentWindow.postMessage(
      {
        type: "mww-iframe-data",
        shop: new URL(location).searchParams.get("shop"),
        session: new URL(location)?.searchParams.get("code"),
      },
      "*"
    );
  };
  const shopOrigin = Cookies.get("shopOrigin");

  return (
    <PolarisProvider i18n={translations}>
      <AppBridgeProvider
        config={{
          apiKey: process.env.SHOPIFY_API_KEY,
          shopOrigin: shopOrigin,
          host: new URL(location).searchParams.get("host"),
          forceRedirect: true,
        }}
      >
        <MyProvider>
          <ProductCard />
          <iframe
            title="Printify: Print on Demand"
            src="https://mwwtesting.fingent.net/"
            name="mww-shop"
            context="Main"
            width="100%"
            height="550"
            frameBorder="0"
            onLoad={handleIframeLoad}
            id="mww-iframe"
          ></iframe>
        </MyProvider>
      </AppBridgeProvider>
    </PolarisProvider>
  );
}

function MyProvider({ children }) {
  const app = useAppBridge();

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      credentials: "include",
      fetch: userLoggedInFetch(app),
    }),
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}

export function userLoggedInFetch(app) {
  const fetchFunction = authenticatedFetch(app);

  async (uri, options) => {
    const response = await fetchFunction(uri, options);

    if (
      response.headers.get("X-Shopify-API-Request-Failure-Reauthorize") === "1"
    ) {
      const authUrlHeader = response.headers.get(
        "X-Shopify-API-Request-Failure-Reauthorize-Url"
      );

      const redirect = Redirect.create(app);
      redirect.dispatch(Redirect.Action.APP, authUrlHeader || `/auth`);
      return null;
    }

    return response;
  };
}
