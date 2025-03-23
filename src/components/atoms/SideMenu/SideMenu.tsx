import { StaticDatePicker } from "@mui/x-date-pickers"
import dayjs, { Dayjs } from "dayjs"
import "dayjs/locale/es"
import { useState } from "react"
import { useEventContext } from "../../../context/useEventContext"
import AddButton from "../Button/AddButton"
import BasicModal from "../Modal/Modal"


dayjs.locale("es"); // Configura Dayjs en español

const SideMenu = () => {
    const [isOpen, setIsOpen] = useState(false)

    const { setFirstDayMonthName, setDateSelected, dateSelected } = useEventContext()

    const getFirstDayOfMoth = (date: Dayjs) => {
        return date.startOf('month').format('dddd')
    }

    const handleChangeDate = (date: Dayjs | null) => {
        if (!date) return

        setFirstDayMonthName(getFirstDayOfMoth(date))
        setDateSelected(dayjs(date))
    }


    return (
        <div>
            <div className="flex justify-center pt-5">
                <AddButton text="Agregar" onClick={() => setIsOpen(true)} />
            </div>
            <div className="scale-90">
                <StaticDatePicker onChange={handleChangeDate} value={dateSelected} />
            </div>
            <BasicModal isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
    )
}

export default SideMenu