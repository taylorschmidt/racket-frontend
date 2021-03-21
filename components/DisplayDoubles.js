import { useRouter } from "next/router";
import {Button} from '@chakra-ui/react'
import axios from 'axios'

export default function DisplayDoubles({doubles}) {

    const displayDoubles = () =>{
        const router = useRouter();
        return doubles.map((match, index) => {
            const deleteMatch = () => {
                axios.delete("http://localhost:8000" + `/api/v1/doubles/${match.id}`, {
                    withCredentials: true,
                  }).then(data=>{console.log('deleted match', data)}).then(()=>{window.location.reload()})
            }
        return (
            <>
            <li>{match.id}</li>
            <Button
            onClick={() => {
                router.push({
                  pathname: `/showDouble`,
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
        Double's Matches:
        <div>{displayDoubles()}</div>
        </>
    )
}