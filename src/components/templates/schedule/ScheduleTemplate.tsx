import { Select } from "@mui/material"
import axios from "axios"
import { useEffect, useState } from "react"
import { useEventContext } from "../../../context/useEventContext"
import { Usuario } from "../../../interfaces/Usuario"
import CalendarGrid from "../../molecules/CalendarGrid/CalendarGrid"
import SideMenu from "../../molecules/SideMenu/SideMenu"
import { Toaster } from "react-hot-toast"

const ScheduleTemplate = () => {
    const [users, setUsers] = useState<Usuario[]>([])

    const { eventos } = useEventContext()

    console.log("eventos", eventos)
    console.log("users", users)


    //obteniendo usuarios
    useEffect(() => {
        axios.get("https://rickandmortyapi.com/api/character")
            .then(response => {
                // console.log("datos recibidos:", response.data)
                setUsers(response.data.results.filter((user: Usuario) => user.id <= 4))
            }).catch(error => {
                console.error("Error al obtener los datos", error)
            })
    }, [])

    // console.log(users)

    return (
        <div className="grid grid-cols-12">
            <div className="col-span-12 h-[10vh]  flex items-center justify-between p-5">
                <div>

                    <h1 className="text-xl">Agenda</h1>
                    
                </div>
                <Select
                    native
                    onChange={(e) => {
                        const selectedId = e.target.value;
                        console.log("Selected ID:", selectedId);
                    }}
                >
                    <option value="" disabled>
                        Selecciona un usuario
                    </option>
                    {users.map((user) => (
                        <option key={user.id} value={user.id}>
                            {user.name}
                        </option>
                    ))}
                </Select>
            </div>
            <div className=" col-span-3 h-[90vh]">
                <SideMenu />
            </div>
            <div className=" col-span-9">
                <CalendarGrid />
                {/* <CalendarGrid /> */}
            </div>
            <div><Toaster /></div>
            {/* {users.map((user: Usuario) => (
        <CardUser key={user.id} id={user.id} name={user.name} />

      ))}
      <AddButton text="Añadir" />
      <BasicModal />
      <div><Toaster /></div> */}
        </div>
    )
}

export default ScheduleTemplate