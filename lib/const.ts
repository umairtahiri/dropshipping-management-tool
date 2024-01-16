export const API_URL = process.env.NEXT_PUBLIC_IP_LINK;
export const API_URL_B2C = process.env.NEXT_PUBLIC_IP_LINK_MIDDLEWARE_B2C;
export const GEOLOCATION = process.env.NEXT_PUBLIC_GEOLOCATION === "true";
export const ENGINE_NAME = process.env.NEXT_PUBLIC_ENGINE_NAME;
export const ELASTIC_SEARCH_TOKEN =
  process.env.NEXT_PUBLIC_ELASTIC_SEARCH_TOKEN;
export const ENTERPRISE_SEARCH_BASE_URL =
  process.env.NEXT_PUBLIC_ENTERPRISE_SEARCH_BASE_URL;
export const AUTH0_CONNECTION = "Username-Password-Authentication" || "";
export const AUTH0_CLIENT_ID = process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID || "";
export const AUTH0_DOMAIN = process.env.NEXT_PUBLIC_AUTH0_DOMAIN || "";
export const AUTH0_SCOPES = "openid profile email offline_access";
export const AUTH0_AUDIENCE = "sharove-dev-authorization";
export const AUTH0_RESPONSE_TYPE = "token id_token";
export const LOCAL_API_URL = process.env.NEXT_PUBLIC_LOCAL_LINK;
export const SITE_ORIGIN =
  (typeof window !== "undefined" && window.location.origin) || "";
export const B2B_SHOP_URL = process.env.NEXT_PUBLIC_IP_LINK_B2B;
export const STRIPE_SECRET_KEY = process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY;
export const B2B_SHOP_URL_AUTHENTICATED =
  process.env.NEXT_PUBLIC_IP_LINK_B2B_AUTHENTICATED;
export const B2B_DEV_TOKEN = "Bearer 8HZaFAxMgZOPOCCDpqtjdz59RLomyr";
export const B2C_DEV_TOKEN = "Bearer m51wFTt0lsnVN9hxtDOzuaSZezs1Co";
export const HOST_NAME =
  typeof window !== "undefined" ? window.location.hostname : "";
export const IS_LOCALHOST =
  typeof window !== "undefined" && HOST_NAME === "localhost";
export const GITHUB_WEBHOOK_KEY = process.env.NEXT_PUBLIC_GITHUB_WEBHOOK_SECRET;
export const AUTO_SYNC_URL = process.env.NEXT_PUBLIC_AUTO_SYNC_URL;
export const AUTO_SYNC_WEBSOCKET_URL =
  process.env.NEXT_PUBLIC_AUTO_SYNC_WEBSOCKET_URL;
