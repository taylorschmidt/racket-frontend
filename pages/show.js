import { useRouter } from "next/router";
import axios from 'axios'

export default function show() {
    const { query } = useRouter();
    console.log(query.id)
    return (
        <>
        View/Edit Page!
        </>
    )
}