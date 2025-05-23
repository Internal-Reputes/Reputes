import { Link, Outlet, useLoaderData, useRouteError } from "@remix-run/react";
import { boundary } from "@shopify/shopify-app-remix/server";
import { AppProvider } from "@shopify/shopify-app-remix/react";
import { NavMenu } from "@shopify/app-bridge-react";
import { AppProvider as PolarisProvider } from "@shopify/polaris";
import enTranslations from "@shopify/polaris/locales/en.json";

import polarisStyles from "@shopify/polaris/build/esm/styles.css?url";
// import { authenticate } from "../shopify.server";

// Polaris CSS link
export const links = () => [{ rel: "stylesheet", href: polarisStyles }];

// Shopify auth loader
export const loader = async ({ request }) => {
  // await authenticate.admin(request);
  return { apiKey: process.env.SHOPIFY_API_KEY || "" };
};

// Main App Component
export default function App() {
  const { apiKey } = useLoaderData();

  return (
    <PolarisProvider i18n={enTranslations}>
      <AppProvider isEmbeddedApp apiKey={apiKey}>
        <NavMenu>
          <Link to="/app" rel="home">
            Home
          </Link>
          <Link to="/app/additional">Additional page</Link>
          <Link to="/add-location">Location page</Link>
        </NavMenu>
        <Outlet />
      </AppProvider>
    </PolarisProvider>
  );
}

// Error Boundary for Shopify
export function ErrorBoundary() {
  return boundary.error(useRouteError());
}

export const headers = (headersArgs) => {
  return boundary.headers(headersArgs);
};
