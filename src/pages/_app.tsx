import { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClientProvider, QueryClient } from 'react-query';
import { theme } from "../styles/theme";


import { SidebarDrawerProvider } from "../contexts/SidebarDrawerContext";
import { makeServer } from "../services/mirage";

if (process.env.NODE_ENV === 'development') {
  makeServer();
}
makeServer();

const queryclient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryclient}>
      <ChakraProvider theme={theme}>
        <SidebarDrawerProvider>
          <Component {...pageProps} />
        </SidebarDrawerProvider>
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
