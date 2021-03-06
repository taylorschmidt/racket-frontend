import React, { useState } from "react";
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
  Spacer
} from "@chakra-ui/react";
import { InfoIcon, EmailIcon, LockIcon } from "@chakra-ui/icons";
import DatePicker from "react-datepicker";
import { getCurrentUser } from "../services/user.services";

export default function Single() {
  const [startDate, setStartDate] = useState("");
  const [opponent, setOpponent] = useState("");
  const [score, setScore] = useState("");
  const [win, setWin] = useState(undefined);
  const [notes, setNotes] = useState("");
  const [userId, setUserId] = useState(undefined);

  const onSubmitMatch = () => {
      //fixing radio boolean issue
      let myWin
    if (win === "true") {
        myWin = true
    } else if (win === "false") {
        myWin = false
    }
    getCurrentUser()
      .then((data) => {
        console.log(data.data.data);
        let userId = data.data.data[0].id;
        setUserId(userId);
      })
      .then(
        axios
          .post(
            process.env.NEXT_PUBLIC_BACKEND_URL + `/api/v1/singles/`,
            {
              person_id: userId,
              date: startDate,
              opponent: opponent,
              score: score,
              notes: notes,
              win: myWin,
            },
            {
              withCredentials: true,
            }
          )
          .then((data) => {
            console.log("singles posted", data.data.data);
            window.location.replace("/profile")
          })
          .catch((err) => {
            console.log(err);
          })
      );
  };

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


  return (
    <>
      <Stack spacing={4}>
      <Flex>
      <FormControl>
              <InputGroup>
                <Input
                  type="date"
                  format="MM/dd/yyyy"
                  placeholder="Match Date"
                  name="date"
                  mb={-4}
                  onChange={onDateChange}
                  focusBorderColor="#008566"
                />
              </InputGroup>
            </FormControl>
        </Flex>
        <FormControl isRequired>
          <InputGroup>
            <InputLeftElement children={<>????</>} />
            <Input
              type="text"
              placeholder="Opponent"
              aria-label="Opponent"
              border="1px"
              focusBorderColor="#008566"
              value={opponent}
              onChange={onChangeOpponent}
            />
          </InputGroup>
          <InputGroup>
            <InputLeftElement children={<>????</>} /> 
            <Input
              type="text"
              placeholder="Score"
              aria-label="Score"
              value={score}
              focusBorderColor="#008566"
              onChange={onChangeScore}
            />
          </InputGroup>
         <InputGroup >
          <RadioGroup focusBorderColor="#008566" colorScheme="green" borderWidth="2px" borderRadius="lg" overflow="hidden" p="2" w="110%" onChange={setWin} value={win}>
            <Stack direction="row">
              <Radio value='true'>Win</Radio>
              <Radio value='false'>Loss</Radio>
            </Stack>
          </RadioGroup>
          </InputGroup>
          
          <Textarea 
          focusBorderColor="#008566"
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
          onClick={onSubmitMatch}
        >
          Submit Match
        </Button>
      </Stack>
    </>
  );
}
