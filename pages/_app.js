import { ChakraProvider } from '@chakra-ui/react';
import "react-datepicker/dist/react-datepicker.css"
import Layout from '../components/Layout'

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Layout />
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
export default MyApp;