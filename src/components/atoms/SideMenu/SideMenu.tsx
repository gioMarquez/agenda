import { StaticDatePicker } from "@mui/x-date-pickers"
import dayjs, { Dayjs } from "dayjs"
import "dayjs/locale/es"
import { useState } from "react"
import AddButton from "../Button/AddButton"
import BasicModal from "../Modal/Modal"


dayjs.locale("es"); // Configura Dayjs en español

const SideMenu = () => {
    const [firstDayName, setFirstDayName] = useState<string>("")
    const [date, setDate] = useState<string>("")
    const [isOpen, setIsOpen] = useState(false)


    const getFirstDayOfMoth = (date: Dayjs) => {
        return date.startOf('month').format('dddd')
    }

    const handleChangeDate = (date: Dayjs | null) => {
        if (!date) return

        setFirstDayName(getFirstDayOfMoth(date))
        setDate(dayjs(date).format("DD/MM/YYYY"))
    }

    console.log("firstDayName", firstDayName)
    console.log("date", date)

    return (
        <div>
            <div className="flex justify-center pt-5">
                <AddButton text="Agregar" onClick={() => setIsOpen(true)} />
            </div>
            <div className="scale-90">
                <StaticDatePicker onChange={handleChangeDate} value={dayjs()} />
            </div>
            <BasicModal isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
    )
}

export default SideMenu