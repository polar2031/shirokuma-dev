import "../styles/globals.css";
import "../styles/prism.css";
import type { AppProps } from "next/app";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import type { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";
import { DefaultSeo } from "next-seo";
import SEO from "../next-seo.config";

const theme = createTheme({
  palette: {
    primary: {
      main: "#4b71a6",
    },
    secondary: {
      main: "#bbdefb",
    },
  },
});

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <>
      <DefaultSeo {...SEO} />
      <ThemeProvider theme={theme}>
        {getLayout(<Component {...pageProps} />)}
      </ThemeProvider>
    </>
  );
}
