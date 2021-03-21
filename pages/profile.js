import axios from "axios";
import { useEffect, useState } from "react";
import {
  getCurrentUser,
  getSinglesMatches,
  getDoublesMatches,
} from "../services/user.services";
import { Box, Center, VStack, Text } from "@chakra-ui/react";
import DisplaySingles from "../components/DisplaySingles";
import DisplayDoubles from "../components/DisplayDoubles";
import SinglesStats from "../components/SinglesStats"
import DatePicker from "react-datepicker";

export default function profile() {
  const [doubles, setDoubles] = useState(undefined);
  const [singles, setSingles] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [startDate, setStartDate] = useState(new Date());

  useEffect(() => {
    getCurrentUser().then(
      (data) => {
        setCurrentUser(data.data.data);
      },
      (error) => {
        console.log(error);
      }
    );
    getSinglesMatches().then(
      (data) => {
        console.log("backend singles", data.data.data);
        setSingles(data.data.data);
      },
      (error) => {
        console.log(error);
      }
    );
    getDoublesMatches()
      .then((data) => {
        console.log("backend doubles", data.data.data);
        setDoubles(data.data.data);
      })
      .then(() => {
          setTimeout(()=>{
            setLoading(false);
          }, 2000)
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      {loading && <div>Loading...</div>}
      {!loading && (
        <Box w="100%" m={5}>
            <Center><Text>{currentUser[0].username}'s Profile: </Text></Center>
          <Center>
          <SinglesStats data={singles} doubles={doubles}/>
          </Center>
          <Box w="100%">
            <DisplaySingles singles={singles} />
          </Box>
          <Box w="100%">
            <DisplayDoubles doubles={doubles} />
          </Box>
        
        </Box>
      )}
    </>
  );
}
