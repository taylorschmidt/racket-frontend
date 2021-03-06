import { useRouter } from "next/router";
import {Button, Flex, Spacer, Box} from '@chakra-ui/react'
import axios from 'axios'

export default function DisplayDoubles({doubles}) {

    const displayDoubles = () =>{
        const router = useRouter();
        return doubles.map((match, index) => {
            const deleteMatch = () => {
                axios.delete(process.env.NEXT_PUBLIC_BACKEND_URL + `/api/v1/doubles/${match.id}`, {
                    withCredentials: true,
                  }).then(data=>{console.log('deleted match', data)}).then(()=>{window.location.reload()})
            }
            let dateString = match.date
        return (
            <>
            <Flex flexWrap="wrap" borderWidth="2px" borderRadius="lg" overflow="hidden" p="2" w="100%" m={2}>
            <Box>
            <div>{dateString.substring(0, dateString.length - 13)}</div>
              {match.opponent && <div>Opponent: {match.opponent}</div>}
              <div>Partner: {match.partner}</div>
              <div>Score: {match.score}</div>
              {match.win && <div>Win</div>}
              {!match.win && <div>Loss</div>}
            </Box>
            <Spacer />
            <Box>
            <Button 
                 bg="1"
                 _hover={{ background: "2", boxShadow: "lg" }}
                 color="white"
                 type="submit"
                 variant="solid"
                 variantColor="red"
                 boxShadow="sm"
                 _active={{ boxShadow: "lg" }}
                 onClick={() => {
                    router.push({
                      pathname: `/showDouble`,
                      query: { id: match.id },
                    });
                  }}
              >
                View/Edit Match
              </Button>
              <Button 
                 bg="1"
                 _hover={{ background: "2", boxShadow: "lg" }}
                 color="white"
                 type="submit"
                 variant="solid"
                 variantColor="red"
                 boxShadow="sm"
                 _active={{ boxShadow: "lg" }}
               onClick={deleteMatch}>Delete Match</Button>
            </Box>
        </Flex>
        </>
        )
        })
    }

    return(
        <>
        My Double's Matches:
        <div>{displayDoubles()}</div>
        </>
    )
}