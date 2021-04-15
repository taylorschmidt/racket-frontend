import Head from 'next/head'
import {useEffect} from 'react'
import {Button, Box, Center, Image, Text, Flex} from '@chakra-ui/react'

export default function Home() {
  return (
    <>
     <Box w="100%" h="100%">
       <Center>
     <Box w="60%" mt="1%">
     
     <Image src= "/Courtside.png" w="400px" mx="auto" my={6}/>
     
     </Box>
     </Center>
       <Flex flexWrap="wrap">
         <Box w="35%" mt={20} ml="5%" mr="5%">
     <Text fontSize="2xl" textAlign="center">Track your doubles and singles tennis match data with Courtside. Visualize your stats in graphs and percentages to make easy adjustments for your next match!</Text>
     </Box>
     <Box w="55%">
     <Image src="/Screen Shot 2021-04-15 at 4.32.21 PM.png" w="700px"></Image>
     </Box>
     
     
     </Flex>
    </Box>
    </>
  )
}
