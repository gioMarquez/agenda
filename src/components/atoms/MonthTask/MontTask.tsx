
const MontTask = () => {

    const daysNumber = 31

    return (
        <div className="w-full h-full relative">
            <div className="absolute -top-5 bg-green-200 w-full grid grid-cols-7">
                <div className="text-center">L</div>
                <div className="text-center">M</div>
                <div className="text-center">M</div>
                <div className="text-center">J</div>
                <div className="text-center">V</div>
                <div className="text-center">S</div>
                <div className="text-center">D</div>
            </div>
            <div className="grid grid-cols-7">
                <div className="">1</div>
                {Array.from({ length: daysNumber }).map((_, index) => (
                    <div key={index} className="border-2 h-[18vh]">{index}</div>
                ))}
            </div>
        </div>
    )
}

export default MontTask