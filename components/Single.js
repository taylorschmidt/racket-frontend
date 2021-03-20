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
} from "@chakra-ui/react";
import { InfoIcon, EmailIcon, LockIcon } from "@chakra-ui/icons";
import DatePicker from "react-datepicker";
import { getCurrentUser } from "../services/user.services";

export default function Single() {
  const [startDate, setStartDate] = useState(new Date());
  const [opponent, setOpponent] = useState("");
  const [score, setScore] = useState("");
  const [win, setWin] = useState(true);
  const [notes, setNotes] = useState("");
  const [userId, setUserId] = useState(undefined);

  const onSubmitMatch = () => {
    getCurrentUser()
      .then((data) => {
        console.log(data.data.data);
        let userId = data.data.data[0].id;
        setUserId(userId);
      })
      .then(
        axios
          .post(
            "http://localhost:8000" + `/api/v1/singles/`,
            {
              person_id: userId,
              opponent: opponent,
              score: score,
              notes: notes,
              win: win,
            },
            {
              withCredentials: true,
            }
          )
          .then((data) => {
            console.log("singles posted", data.data.data);
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

  console.log(win);

  return (
    <>
      <Stack spacing={4}>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
        />
        <FormControl isRequired>
          <InputGroup>
            ☕
            <InputLeftElement children={<>🤺</>} />
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
          <RadioGroup onChange={setWin} value={win}>
            <Stack direction="row">
              <Radio value="true">Win</Radio>
              <Radio value="false">Loss</Radio>
            </Stack>
          </RadioGroup>
          <Text mb="8px">Notes: </Text>
          <Textarea
            value={notes}
            onChange={onChangeNotes}
            placeholder="Record any notes here."
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
