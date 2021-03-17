import React, { useState }  from 'react'
import axios from 'axios'
import { useRouter } from "next/router";



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
            'http://localhost:8000' + `/api/v1/user/register`,
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
                // setTimeout(() => {
                //     window.location.replace("/profile")
                //   }, 5000);
            }
        }).catch((err)=>{
            console.log("error registering user", err)
        })
    }

    return (
        <>
        Form 2
        </>
      );
}

export default SignUp