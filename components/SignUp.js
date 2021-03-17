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
        // <Container component="main" maxWidth="xs">
        //   {/* <CssBaseline /> */}
        //   <div >
        //     <Typography component="h1" variant="h5">
        //       Sign up for CourtSide
        //     </Typography>
        //     <form noValidate>
        //       <TextField
        //         variant="outlined"
        //         margin="normal"
        //         required
        //         fullWidth
        //         id="email"
        //         label="Email Address"
        //         name="email"
        //         autoComplete="email"
        //         autoFocus
        //         value={email}
        //         onChange={onChangeEmail}
        //       />
        //         <TextField
        //         variant="outlined"
        //         margin="normal"
        //         required
        //         fullWidth
        //         name="username"
        //         label="Username"
        //         type="username"
        //         id="username"
        //         autoComplete="current-username"
        //         value={username}
        //         onChange={onChangeUsername}
        //       />
        //       <TextField
        //         variant="outlined"
        //         margin="normal"
        //         required
        //         fullWidth
        //         name="password"
        //         label="Password"
        //         type="password"
        //         id="password"
        //         autoComplete="current-password"
        //         value={password}
        //         onChange={onChangePassword}
        //       />
        //       <FormControlLabel
        //         control={<Checkbox value="remember" color="primary" />}
        //         label="Remember me"
        //       />
        //       <Button
        //         type="submit"
        //         fullWidth
        //         variant="contained"
        //         color="primary"
        //         onClick={register}
                
        //       >
        //         Sign Up 🎾
        //       </Button>
        //       <Grid container>
        //         <Grid item>
        //           <Link href="#" variant="body2">
        //             {"Already have an account? Sign in!"}
        //           </Link>
        //         </Grid>
        //       </Grid>
        //     </form>
        //   </div>
        // </Container>
        <>
        Form 2
        </>
      );
}

export default SignUp