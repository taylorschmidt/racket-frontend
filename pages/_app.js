import { ChakraProvider, extendTheme, Flex } from '@chakra-ui/react';
import "react-datepicker/dist/react-datepicker.css"
import Layout from '../components/Layout'
import NoUserLayout from '../components/NoUserLayout'
import '../public/styles.css'
import { useEffect, useState } from "react";
import axios from 'axios'

function MyApp({ Component, pageProps }) {
  const [isUser, setIsUser] = useState(false)


	const theme = extendTheme({
		colors: {
			1: "#008566",
			2: "#00a67f"
		}
  })
  const isThereAUser = () => {
    axios
        .get(process.env.NEXT_PUBLIC_BACKEND_URL + `/api/v1/user/`, { withCredentials: true })
        .then((data) => {
        if (data.data.status.code === 200) {
          setIsUser(true)
        } else if (data.data.status.code === 400) {
          setIsUser(false)
        }
       }).catch(err=>{console.log(err)}) 
    }
  
    useEffect(() => {
      isThereAUser();
      }, []);

  return (
    <ChakraProvider theme={theme}>
      {isUser && (<Layout />)}
				{!isUser && (<NoUserLayout />)}
      <Flex>
			
						<Component {...pageProps} />

				
			</Flex>
    </ChakraProvider>
  );
}
export default MyApp;