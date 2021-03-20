import axios from 'axios'
import {Button} from "@chakra-ui/react";

export default function Layout() {
    const logout = () => {
        axios
          .get('http://localhost:8000' + `/api/v1/user/logout`, {
            withCredentials: true,
          })
          .then((data) => {
            console.log(data);
          })
          .catch((err) => {
            console.log(err);
          });
        setTimeout(() => {
          window.location.replace("/form")
        }, 500);
      };

    return (
        <>
        Here is the nav bar.
        <Button onClick={logout}>Log Out!</Button>
        </>
    )
}