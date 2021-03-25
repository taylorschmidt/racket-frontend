import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import {
  Stack,
  Input,
  FormControl,
  InputLeftElement,
  Icon,
  InputGroup,
  Button,
  FormHelperText,
  Radio,
  RadioGroup,
  Textarea,
  Text,
  Flex,
  Spacer,
  Box,
  Center,
  useColorMode,
} from "@chakra-ui/react";
import { InfoIcon, EmailIcon, LockIcon } from "@chakra-ui/icons";
import DatePicker from "react-datepicker";
import { getCurrentUser } from "../services/user.services";

export default function show() {
  const { colorMode } = useColorMode();
  const { query } = useRouter();
  const [newEdit, setNewEdit] = useState(false);
  const [loading, setLoading] = useState(true);
  const [pageData, setPageData] = useState(undefined);
  const [startDate, setStartDate] = useState("");
  const [opponent, setOpponent] = useState("");
  const [score, setScore] = useState("");
  const [win, setWin] = useState(undefined);
  const [notes, setNotes] = useState("");
  const [userId, setUserId] = useState(undefined);

  const onChangeOpponent = (e) => {
    const opponent = e.target.value;
    setOpponent(opponent);
  };

  const onChangeScore = (e) => {
    const score = e.target.value;
    setScore(score);
  };

  const onChangeNotes = (e) => {
    const notes = e.target.value;
    setNotes(notes);
  };

  const onDateChange = (e) => {
    const date = e.target.value;
    setStartDate(date);
  };

  const onSubmitEdit = () => {
    let myWin;
    if (win === "true") {
      myWin = true;
    } else if (win === "false") {
      myWin = false;
    }
    getCurrentUser()
      .then((data) => {
        console.log(data.data.data);
        let userId = data.data.data[0].id;
        setUserId(userId);
      })
      .then(
        axios
          .put(
            process.env.NEXT_PUBLIC_BACKEND_URL + `/api/v1/singles/${query.id}`,
            {
              person_id: userId,
              opponent: opponent,
              score: score,
              notes: notes,
              win: myWin,
              date: startDate,
            },
            {
              withCredentials: true,
            }
          )
          .then((data) => {
            console.log("singles updated", data.data.data);
            window.location.replace("/profile");
          })
          .catch((err) => {
            console.log(err);
          })
      );
  };

  const deleteMatch = () => {
    axios
      .delete(
        process.env.NEXT_PUBLIC_BACKEND_URL + `/api/v1/singles/${query.id}`,
        {
          withCredentials: true,
        }
      )
      .then((data) => {
        console.log("deleted match", data);
      })
      .then(() => {
        window.location.replace("/profile");
      });
  };
  const setEdit = () => {
    setNewEdit(true);
  };

  const display = () => {
    return (
      <>
        <Flex
          borderWidth="2px"
          borderRadius="lg"
          overflow="hidden"
          p="2"
          w="100%"
          m={2}
        >
          <Box>
          <div>{pageData.date.substring(0, pageData.date.length - 13)}</div>
            {pageData.opponent && <div>Opponent: {pageData.opponent}</div>}
            <div>Partner: {pageData.parner}</div>
            <div>Score: {pageData.score}</div>
            {pageData.win && <div>Win</div>}
            {!pageData.win && <div>Loss</div>}
            {pageData.notes && <div>Notes: {pageData.notes}</div>}
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
              onClick={setEdit}
            >
              Edit Match
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
              onClick={deleteMatch}
            >
              Delete Match
            </Button>
          </Box>
        </Flex>
      </>
    );
  };

  console.log("here is the date", startDate);

  const editDisplay = () => {
    return (
      <>
        <div>
          <Center m={2}>
            <h1>You're editing data for this match:</h1>
          </Center>
          <p>Date: {pageData.date.substring(0, pageData.date.length - 13)}</p>
          <p>Opponent: {pageData.opponent}</p>
          <p>Score: {pageData.score}</p>
          <p>Notes: {pageData.notes}</p>
          <br></br>
        </div>
        <Stack spacing={4}>
          <Flex>
            <FormControl>
              <InputGroup>
                <Input
                  type="date"
                  format="MM/dd/yyyy"
                  placeholder="Match Date"
                  name="date"
                  onChange={onDateChange}
                />
              </InputGroup>
            </FormControl>
          </Flex>
          <FormControl isRequired>
            <InputGroup>
              <InputLeftElement children={<>🎾</>} />
              <Input
                type="text"
                placeholder="Opponent"
                aria-label="Opponent"
                value={opponent}
                onChange={onChangeOpponent}
              />
            </InputGroup>
            <InputGroup>
              <InputLeftElement children={<>🗒</>} />
              <Input
                type="text"
                placeholder="Score"
                aria-label="Score"
                value={score}
                onChange={onChangeScore}
              />
            </InputGroup>
            <RadioGroup
              borderWidth="2px"
              borderRadius="lg"
              overflow="hidden"
              p="2"
              w="100%"
              m={2}
              onChange={setWin}
              value={win}
            >
              <Stack direction="row">
                <Radio value="true">Win</Radio>
                <Radio value="false">Loss</Radio>
              </Stack>
            </RadioGroup>
            <Textarea
              value={notes}
              onChange={onChangeNotes}
              placeholder="Notes"
              size="sm"
            />
          </FormControl>
          <Button
            bg="1"
            _hover={{ background: "2", boxShadow: "lg" }}
            color="white"
            variant="solid"
            variantColor="red"
            boxShadow="sm"
            _active={{ boxShadow: "lg" }}
            onClick={onSubmitEdit}
          >
            Submit Edits
          </Button>
        </Stack>
      </>
    );
  };

  useEffect(() => {
    axios
      .get(
        process.env.NEXT_PUBLIC_BACKEND_URL + `/api/v1/singles/${query.id}`,
        {
          withCredentials: true,
        }
      )
      .then((data) => {
        console.log("singles match data", data.data.data);
        setPageData(data.data.data);
        setTimeout(() => {
          setLoading(false);
        }, 500);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      {loading && !newEdit && <>Loading...</>}
      {!loading && !newEdit && <>{display()}</>}
      {newEdit && (
        <>
          <Box w="100%" mt={5}>
            <Center>
              <Box
                w="400px"
                bg={colorMode === "light" ? "gray.200" : "gray.600"}
                p={3}
                boxShadow="sm"
                rounded="lg"
              >
                {editDisplay()}
              </Box>
            </Center>
          </Box>
        </>
      )}
    </>
  );
}
