export default function DisplayDoubles({doubles}) {

    const displayDoubles = () =>{
        return doubles.map((match, index) => {
        return (
            <>
            <li>{match.partner}</li>
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