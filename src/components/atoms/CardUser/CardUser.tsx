interface CardUserProps {
    id: number
    name: string
}


const CardUser = ({ id, name }: CardUserProps) => {
    return (
        <button
            className="bg-blue-400 rounded-3xl flex justify-center items-center py-3 my-3 w-[20vw] h-[8vh] hover:bg-blue-300"
            onClick={() => { console.log("id", id) }}
        >
            <p>{name}</p>
        </button>
    )
}

export default CardUser