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
import Calendar from 'react-calendar';

export default function Single() {
  const [startDate, setStartDate] = useState(new Date());
  const [opponent, setOpponent] = useState("");
  const [score, setScore] = useState("");
  const [win, setWin] = useState(true);
  const [notes, setNotes] = useState("");
  const [userId, setUserId] = useState(undefined);
  const [partner, setPartner] = useState('')
  const [hand, setHand] = useState('')
  const [change, setChange] = useState(true)

  const onSubmitMatch = () => {
         //fixing radio boolean issue
         let myWin
         if (win === "true") {
             myWin = true
         } else if (win === "false") {
             myWin = false
         }
            //fixing radio boolean issue
      let myChange
      if (change === "true") {
          myChange = true
      } else if (change === "false") {
          myChange = false
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
            process.env.NEXT_PUBLIC_BACKEND_URL + `/api/v1/doubles/`,
            {
              person_id: userId,
              opponent: opponent,
              partner: partner,
              hand: hand,
              score: score,
              change: myChange,
              notes: notes,
              win: myWin,
            },
            {
              withCredentials: true,
            }
          )
          .then((data) => {
            console.log("doubles posted", data.data.data);
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

  const onChangePartner = (e) => {
      const partner = e.target.value
      setPartner(partner)
  }


  return (
    <>
      <Stack spacing={4}>
        <Flex>
        <Text>Match Date: </Text> <Spacer />
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
        />
        </Flex>
        <FormControl isRequired>
          <InputGroup>
            <InputLeftElement overflow="hidden" children={<>🎾</>} />
            <Input
              type="text"
              placeholder="Opponent"
              aria-label="Opponent"
              value={opponent}
              onChange={onChangeOpponent}
            />
          </InputGroup>
          <InputGroup>
            <InputLeftElement children={<>🤝</>} />
            <Input
              type="text"
              placeholder="Partner"
              aria-label="Partner"
              value={partner}
              onChange={onChangePartner}
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
          <RadioGroup borderWidth="2px" borderRadius="lg" overflow="hidden" p="2" w="100%" m={2} onChange={setHand} value={hand}>
            <Stack direction="row">
              <Radio value="forehand">Forehand</Radio>
              <Radio value="backhand">Backhand</Radio>
            </Stack>
          </RadioGroup>
          <RadioGroup borderWidth="2px" borderRadius="lg" overflow="hidden" p="2" w="100%" m={2} onChange={setChange} value={change}>
            <Stack direction="row">
              <Radio value="true">Changed Hands</Radio>
              <Radio value="false">Did Not Change Hands</Radio>
            </Stack>
          </RadioGroup>
        
          <RadioGroup borderWidth="2px" borderRadius="lg" overflow="hidden" p="2" w="100%" m={2} onChange={setWin} value={win}>
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
          // type="submit"
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
