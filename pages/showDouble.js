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
} from "@chakra-ui/react";
import { InfoIcon, EmailIcon, LockIcon } from "@chakra-ui/icons";
import DatePicker from "react-datepicker";
import { getCurrentUser } from "../services/user.services";

export default function show() {
  const { query } = useRouter();
  const [newEdit, setNewEdit] = useState(false);
  const [loading, setLoading] = useState(true);
  const [pageData, setPageData] = useState(undefined);
  const [startDate, setStartDate] = useState(new Date());
  const [opponent, setOpponent] = useState("");
  const [score, setScore] = useState("");
  const [win, setWin] = useState(true);
  const [notes, setNotes] = useState("");
  const [userId, setUserId] = useState(undefined);
  const [partner, setPartner] = useState('')
  const [hand, setHand] = useState('')
  const [change, setChange] = useState(true)

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

  const onSubmitEdit = () => {
    getCurrentUser()
      .then((data) => {
        console.log(data.data.data);
        let userId = data.data.data[0].id;
        setUserId(userId);
      })
      .then(
        axios
          .put(
            "http://localhost:8000" + `/api/v1/doubles/${query.id}`,
            {
                person_id: userId,
              opponent: opponent,
              partner: partner,
              hand: hand,
              score: score,
              change: change,
              notes: notes,
              win: win
            },
            {
              withCredentials: true,
            }
          )
          .then((data) => {
            console.log("doubles updated", data.data.data);
          })
          .catch((err) => {
            console.log(err);
          })
      );
  };

  const setEdit = () => {
    setNewEdit(true);
  };

  const deleteMatch = () => {
    axios.delete("http://localhost:8000" + `/api/v1/doubles/${query.id}`, {
        withCredentials: true,
      }).then(data=>{console.log('deleted match', data)}).then(()=>{window.location.replace("/profile")})
}

  const display = () => {
    return (
      <>
        <div>Here is the current match data:</div>
        <div>{pageData.id}</div>
        <div>{pageData.date}</div>
        <div>{pageData.opponent}</div>
        <div>{pageData.partner}</div>
        <div>{pageData.win}</div>
        <div>{pageData.hand}</div>
        <div>{pageData.change}</div>
        <div>{pageData.score}</div>
        <div>{pageData.notes}</div>
        <Button onClick={setEdit}>Edit This!</Button>
        <Button onClick={deleteMatch}>Delete This!</Button>
      </>
    );
  };

  const editDisplay = () => {
    return (
      <>
        <Stack spacing={4}>
          <DatePicker
          onChange={(date) => setStartDate(date)}
        />
          <FormControl isRequired>
            <InputGroup>
              <InputLeftElement children={<>🤺</>} />
              <Input
                type="text"
                placeholder="Opponent"
                aria-label="Opponent"
                defaultValue={pageData.opponent}
                onChange={onChangeOpponent}
              />
            </InputGroup>
            <InputGroup>
            <InputLeftElement children={<>🤺</>} />
            <Input
              type="text"
              placeholder="Partner"
              aria-label="Partner"
              defaultValue={pageData.partner}
              onChange={onChangePartner}
            />
          </InputGroup>
          <RadioGroup onChange={setHand} defaultValue={pageData.hand}>
            <Stack direction="row">
              <Radio value="forehand">Forehand</Radio>
              <Radio value="backhand">Backhand</Radio>
            </Stack>
          </RadioGroup>
          <RadioGroup onChange={setChange} defaultValue={pageData.change}>
            <Stack direction="row">
              <Radio value={true}>Changed Hands</Radio>
              <Radio value={false}>Did Not Change Hands</Radio>
            </Stack>
          </RadioGroup>
            <InputGroup>
              <InputLeftElement children={<>🗒</>} />
              <Input
                type="text"
                placeholder="Score"
                aria-label="Score"
                defaultValue={pageData.score}
                onChange={onChangeScore}
              />
            </InputGroup>
            <RadioGroup onChange={setWin} defaultValue={pageData.win}>
              <Stack direction="row">
                <Radio value={true}>Win</Radio>
                <Radio value={false}>Loss</Radio>
              </Stack>
            </RadioGroup>
            <Text mb="8px">Notes: </Text>
            <Textarea
              defaultValue={pageData.notes}
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
      .get("http://localhost:8000" + `/api/v1/doubles/${query.id}`, {
        withCredentials: true,
      })
      .then((data) => {
        console.log("doubles match data", data.data.data);
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
      View/Edit Page!
      {loading && !newEdit && <>Loading...</>}
      {!loading && !newEdit && <>{display()}</>}
      {newEdit && <>{editDisplay()}</>}
    </>
  );
}
