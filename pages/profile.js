import axios from "axios";
import { useEffect, useState } from "react";
import {
  getCurrentUser,
  getSinglesMatches,
  getDoublesMatches,
} from "../services/user.services";
import { Box, Center, VStack, Text, Button } from "@chakra-ui/react";
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
  const [displaySingles, setDisplaySingles] = useState(false)
  const [displayDoubles, setDisplayDoubles] = useState(false)

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

  const displaySinglesMatches = () => {
    setDisplaySingles(true)
  }
  const displayDoublesMatches = () => {
    setDisplayDoubles(true)
  }

  return (
    <>
      {loading && <div>Loading...</div>}
      {!loading && (
        <Box w="100%" m={5}>
            <Center><Text>{currentUser[0].username}'s Profile: </Text></Center>
          <Center>
            My Stats
          <SinglesStats data={singles} doubles={doubles}/>
          </Center>
          {!displaySingles && (<Button onClick={displaySinglesMatches}>Display Singles Matches</Button>)}
          {displaySingles && (<Box w="100%">
            <DisplaySingles singles={singles} />
          </Box>)}
          {!displayDoubles && (<Button onClick={displayDoublesMatches}>Display Doubles Matches</Button>)}
          {displayDoubles && (<Box w="100%">
            <DisplayDoubles doubles={doubles} />
          </Box>)}
          
        
        
        </Box>
      )}
    </>
  );
}
