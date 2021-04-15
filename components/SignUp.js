import React, { useState }  from 'react'
import axios from 'axios'
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


const SignUp = () => {

    const router = useRouter()
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [repeatUser, setRepeatUser] = useState(false)

    const onChangeUsername = (e) => {
        const username = e.target.value
        setUsername(username)
    }

    const onChangeEmail = (e) => {
        const email = e.target.value
        console.log(email)
        setEmail(email)
    }

    const onChangePassword = (e) => {
        const password = e.target.value
        setPassword(password)
    }
    //axios call here to backend to register
    const register = (e) => {
        e.preventDefault()
        axios.post(
            process.env.NEXT_PUBLIC_BACKEND_URL + `/api/v1/user/register`,
            {username: username,
            email: email,
            password: password
            }, { withCredentials: true }
        ).then((data)=>{
            if (data.data.status.code === 401) {
                setRepeatUser(true)
            }
            else if (data.data.status.code === 201) {
                console.log(data.data)
                setTimeout(() => {
                    window.location.replace("/profile")
                  }, 1000);
            }
        }).catch((err)=>{
            console.log("error registering user", err)
        })
    }

    return (
        <form action="submit">
            <Stack spacing={4}>
                <FormControl isRequired>
                    <InputGroup>
                    <InputLeftElement children={<InfoIcon/>} />
                    <Input 
                        type="text"
                        focusBorderColor="#008566"
                        placeholder="Username"
                        aria-label="Username"
                        value={username}
                        onChange={onChangeUsername}
                        />
                    </InputGroup>
                </FormControl>
                <FormControl isRequired>
                    <InputGroup>
                    <InputLeftElement children={<EmailIcon/>} />
                    <Input 
                        type="text"
                        placeholder="Email"
                        focusBorderColor="#008566"
                        aria-label="Email"
                        value={email}
                        onChange={onChangeEmail}
                        />
                    </InputGroup>
                </FormControl>
            
                <FormControl isRequired>
                    <InputGroup>
                    <InputLeftElement children={<LockIcon/>} />
                    <Input 
                        type="password"
                        placeholder="Password"
                        aria-label="Password"
                        focusBorderColor="#008566"
                        value={password}
                        onChange={onChangePassword}
                        />
                    </InputGroup>
                </FormControl>
                <Button
                    // type="submit"
                    bg="1"
                    _hover={{ background: "2", boxShadow: "lg" }}
                    color="white"
                    variant="solid"
                    variantColor="red"
                    boxShadow="sm"
                    _active={{boxShadow: "lg"}}
                    onClick={register}
                    >
                    Sign Up
                </Button>
                <FormHelperText textAlign="center">
                    Thanks for joining us!
                    <br></br>
                    🎾
                </FormHelperText>
                {repeatUser && <FormHelperText textAlign="center">
                    That email is already registered. <br></br> 😢
                </FormHelperText>}
            </Stack>
        </form>
      );
}

export default SignUp