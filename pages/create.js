import Double from '../components/Double'
import Single from '../components/Single'
import {Box, useColorMode, Tabs, TabList, Tab, TabPanels, TabPanel, Image, Center} from "@chakra-ui/react"


export default function create() {
    const { colorMode } = useColorMode()
return(
    <>
    <Box w="100%" mt={5}>
            <Center>
            <Box  bg={colorMode === "light" ? "gray.200" : "gray.600" } p={3} boxShadow="sm" rounded="lg">
            {/* <Image src= "/Lock.png" w="80px" mx="auto" my={6}/> */}
            <Tabs variant="enclosed-colored" isFitted m={4}>
                <TabList mt={3}>
                    <Tab>Record a Single's Match</Tab>
                    <Tab>Record a Double's Match</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <Single />
                    </TabPanel>
                    <TabPanel>
                        <Double />
                    </TabPanel>
                </TabPanels>
            </Tabs>
            </Box>
            </Center>
            </Box>
        </>
    )
}