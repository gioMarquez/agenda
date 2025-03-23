import { StaticDatePicker } from "@mui/x-date-pickers"
import dayjs, { Dayjs } from "dayjs"
import "dayjs/locale/es"
import { useState } from "react"
import { useEventContext } from "../../../context/useEventContext"
import AddButton from "../../atoms/Button/AddButton"
import BasicModal from "../../atoms/Modal/Modal"
import { Button } from "@mui/material"


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
            <div className="flex justify-center pt-5 gap-4">
                <AddButton text="Agregar evento" onClick={() => setIsOpen(true)} />
                <Button variant="outlined" onClick={() => setDateSelected(dayjs())}>Hoy</Button>
            </div>
            <div className="scale-90">
                <StaticDatePicker
                    onChange={handleChangeDate}
                    value={dateSelected}
                    localeText={{toolbarTitle: 'Selecciona una fecha'}} 
                    slotProps={{
                        actionBar: { actions: [] }, // Remove cancel and ok buttons
                    }}
                    
                />
            </div>
            <BasicModal isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
    )
}

export default SideMenu