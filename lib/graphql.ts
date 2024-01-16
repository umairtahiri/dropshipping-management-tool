import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { createFetch, createSaleorClient } from "@saleor/sdk";

import { API_URL } from "./const";
import { DEFAULT_CHANNEL } from "./regions";
import { typePolicies } from "./typePolicies";

const httpLink = createHttpLink({
  uri: API_URL,
  fetch: createFetch(),
});

const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache({ typePolicies }),
  ssrMode: !process.browser,
});

export const saleorClient = createSaleorClient({
  apiUrl: API_URL || "",
  channel: DEFAULT_CHANNEL.slug,
});

export default apolloClient;
