import { useRouter } from "next/router";
import {Button} from '@chakra-ui/react'
import axios from 'axios'

export default function DisplaySingles({singles}) {

   

    const displaySingles = () =>{
        const router = useRouter();
        return singles.map((match, index) => {
            const deleteMatch = () => {
                axios.delete("http://localhost:8000" + `/api/v1/singles/${match.id}`, {
                    withCredentials: true,
                  }).then(data=>{console.log('deleted match', data)}).then(()=>{window.location.reload()})
            }
        return (
            <>
            <li>{match.id}</li>
            <Button
            onClick={() => {
                router.push({
                  pathname: `/show`,
                  query: { id: match.id },
                });
              }}
            >View/Edit Match</Button>
            <Button onClick={deleteMatch}>Delete Match</Button>
            </>
        )
        })
    }
    return(
        <>
        Single's Matches:
        <div>{displaySingles()}</div>
        </>
    )
}