import SignUp from '../components/SignUp'
import SignIn from '../components/SignIn'
import {Box, useColorMode, Tabs, TabList, Tab, TabPanels, TabPanel, Image, Center} from "@chakra-ui/react"

export default function form() {
const { colorMode } = useColorMode()
return(
    <>
    <Box w="100%" mt={5}>
            <Center>
            <Box w="400px" bg={colorMode === "light" ? "gray.200" : "gray.600" } p={3} boxShadow="sm" rounded="lg">
            <Image src= "/Lock.png" w="80px" mx="auto" my={6}/>
            <Tabs variant="enclosed-colored" isFitted m={4}>
                <TabList mt={3}>
                    <Tab>Sign Up</Tab>
                    <Tab>Log In</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <SignUp />
                    </TabPanel>
                    <TabPanel>
                        <SignIn />
                    </TabPanel>
                </TabPanels>
            </Tabs>
            </Box>
            </Center>
            </Box>
        </>
    )
}