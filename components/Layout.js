import axios from 'axios'

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
        <button onClick={logout}>Log Out!</button>
        </>
    )
}