import axios from 'axios'
import {useEffect, useState} from 'react'

export default function profile() {
    //state
    const [doubles, setDoubles] = useState(undefined)
    const [singles, setSingles] = useState(undefined)
    const [loading, setLoading] = useState(true)

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
          console.log(data.data.data)
          let singlesData = data.data.data
          setDoubles(data.data.data)
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    const getSingles = () => {
        axios
        .get('http://localhost:8000' + `/api/v1/singles/`, { withCredentials: true })
        .then((data) => {
          console.log('singles', data.data.data)
        //   setSingles(data.data.data)
          setLoading(false)
        })
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
        {loading && (
            <div>Loading...</div>
        )}
        {!loading && (
            <>
            <div>My Profile!</div>
        <div>{singles[0].notes}</div>
            
            </>
        )}
        </>
    )
}