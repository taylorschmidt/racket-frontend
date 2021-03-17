import axios from 'axios'
import {useEffect} from 'react'

export default function form() {

    const getUser = () => {
        axios
          .get('http://localhost:8000' + `/api/v1/user/`, { withCredentials: true })
          .then((data) => {
            console.log(data.data)})
          .catch((err) => {
            console.log("error finding user", err);
          });
      };

    const getDoubles = () => {
        axios
        .get('http://localhost:8000' + `/api/v1/doubles/`, { withCredentials: true })
        .then((data) => {
          console.log(data.data)})
        .catch((err)=>{
            console.log(err)
        })
    }

    const getSingles = () => {
        axios
        .get('http://localhost:8000' + `/api/v1/singles/`, { withCredentials: true })
        .then((data) => {
          console.log(data.data)})
        .catch((err)=>{
            console.log(err)
        })
    }
      
      useEffect(() => {
        getUser()
        getDoubles();
        getSingles()
      }, []);


    return (
        <>
        Profile!
        </>
    )
}