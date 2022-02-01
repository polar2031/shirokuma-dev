import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#4b71a6',
    },
    secondary: {
      main: '#bbdefb',
    },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (<ThemeProvider theme={theme}>
    <Component {...pageProps} />
  </ThemeProvider>)
}

export default MyApp
