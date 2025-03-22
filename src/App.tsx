import axios from "axios";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import AddButton from "./components/atoms/Button/AddButton";
import CardUser from "./components/atoms/CardUser/CardUser";
import BasicModal from "./components/atoms/Modal/Modal";
import { Usuario } from './interfaces/Usuario';
import MontTask from "./components/atoms/MonthTask/MontTask";
import SideMenu from "./components/atoms/SideMenu/SideMenu";



const App = () => {
  const [users, setUsers] = useState<Usuario[]>([])


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

  console.log(users)


  return (
    <div className="grid grid-cols-12">
      <div className="col-span-12 h-[10vh]">Menu superior</div>
      <div className="bg-red-300 col-span-3 h-[90vh]"><SideMenu /></div>
      <div className="bg-blue-300 col-span-9">
        <MontTask />
      </div>
      {/* {users.map((user: Usuario) => (
        <CardUser key={user.id} id={user.id} name={user.name} />

      ))}
      <AddButton text="Añadir" />
      <BasicModal />
      <div><Toaster /></div> */}
    </div>
  )
}

export default App