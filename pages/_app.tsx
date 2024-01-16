import "styles/globals.css";
import "styles/responsiveStyles.scss";

import { ApolloProvider } from "@apollo/client";
import { ThemeProvider } from "@mui/material/styles";
import { NextPage } from "next";
import { AppProps } from "next/app";
import NextNProgress from "nextjs-progressbar";
import { SnackbarProvider } from "notistack";
import React, { ReactElement, ReactNode } from "react";
import { Provider } from "react-redux";
import { sharoveTheme } from "styles/sharoveTheme";

import { RegionsProvider } from "@/components/RegionsProvider";
import { SaleorProviderWithChannels } from "@/components/SaleorProviderWithChannels";
import apolloClient from "@/lib/graphql";

import { store } from "../lib/redux/store";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page: ReactElement) => page);

  return (
    <ApolloProvider client={apolloClient}>
      <SnackbarProvider
        maxSnack={3}
        autoHideDuration={3000}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <RegionsProvider>
          <SaleorProviderWithChannels>
            <ThemeProvider theme={sharoveTheme}>
              <Provider store={store}>
                <NextNProgress
                  color="#4bbcaa"
                  options={{ showSpinner: false }}
                />
                {getLayout(<Component {...pageProps} />)}
              </Provider>
            </ThemeProvider>
          </SaleorProviderWithChannels>
        </RegionsProvider>
      </SnackbarProvider>
    </ApolloProvider>
  );
}

export default MyApp;
