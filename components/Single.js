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
} from "@chakra-ui/react";
import { InfoIcon, EmailIcon, LockIcon } from "@chakra-ui/icons";
import DatePicker from 'react-datepicker';


export default function Single() {
    const [startDate, setStartDate] = useState(new Date());    
    return (
        <>
        <DatePicker selected={startDate} onChange={date => setStartDate(date)} />
        <Stack spacing={4}>
        <FormControl isRequired>
            <InputGroup>
            <InputLeftElement children={<InfoIcon/>} />
            <Input 
                type="text"
                placeholder="Test"
                aria-label="Username"
                // value={username}
                // onChange={onChangeUsername}
                />
            </InputGroup>
        </FormControl>
        </Stack>
        </>
    )
}