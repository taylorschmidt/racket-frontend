import Head from 'next/head'
import {useEffect} from 'react'
import {Button, Box, Center, Image} from '@chakra-ui/react'

export default function Home() {
  return (
    <>
     <Box w="100%" m={5}>
      <Center>
        <Box><Center><Image src="/Courtside.png"></Image></Center></Box>
      </Center>
    </Box>
    </>
  )
}
