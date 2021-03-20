import { useRouter } from "next/router";
import {Button} from '@chakra-ui/react'

export default function DisplayDoubles({doubles}) {

    const displayDoubles = () =>{
        const router = useRouter();
        return doubles.map((match, index) => {
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
            <Button>Delete Match</Button>
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