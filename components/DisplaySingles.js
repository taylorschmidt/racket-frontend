import { useRouter } from "next/router";
import {Button} from '@chakra-ui/react'

export default function DisplaySingles({singles}) {
    const displaySingles = () =>{
        const router = useRouter();
        return singles.map((match, index) => {
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
            <Button>Delete Match</Button>
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