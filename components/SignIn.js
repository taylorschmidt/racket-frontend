import React, { useState }  from 'react'
import axios from 'axios'
import { useRouter } from "next/router";



const SignIn = () => {

    const router = useRouter()
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


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
    const login = (e) => {
        e.preventDefault();
        axios
          .post(
            'http://localhost:8000' + `/api/v1/user/login`,
            {
              email: email,
              password: password,
            },
            { withCredentials: true }
          )
          .then((data) => {
            if (data.data.status.code === 401) {
                setUnknownUser(true)
            }
            else if (data.data.status.code === 200) {
              setTimeout(() => {
                window.location.replace('/profile')
              }, 2000);
               
            }
          })
          .catch((err) => {
            console.log("error logging in user", err);
          });
      };
    

    return (
        <>
        Form
        </>
    //     <Container component="main" maxWidth="xs">
    //       {/* <CssBaseline /> */}
    //       <div >
    //         <Typography component="h1" variant="h5">
    //           Sign in to CourtSide
    //         </Typography>
    //         <form noValidate>
    //           <TextField
    //             variant="outlined"
    //             margin="normal"
    //             required
    //             fullWidth
    //             id="email"
    //             label="Email Address"
    //             name="email"
    //             autoComplete="email"
    //             autoFocus
    //             value={email}
    //             onChange={onChangeEmail}
    //           />
    //           <TextField
    //             variant="outlined"
    //             margin="normal"
    //             required
    //             fullWidth
    //             name="password"
    //             label="Password"
    //             type="password"
    //             id="password"
    //             autoComplete="current-password"
    //             value={password}
    //             onChange={onChangePassword}
    //           />
    //           <FormControlLabel
    //             control={<Checkbox value="remember" color="primary" />}
    //             label="Remember me"
    //           />
    //           <Button
    //             type="submit"
    //             fullWidth
    //             variant="contained"
    //             color="primary"
    //             onClick={login}
                
    //           >
    //             Log In 🎾
    //           </Button>
    //           <Grid container>
    //             <Grid item>
    //               <Link href="#" variant="body2">
    //                 {"Need to create an account? Sign up!"}
    //               </Link>
    //             </Grid>
    //           </Grid>
    //         </form>
    //       </div>
    //     </Container>
    );
}

export default SignIn