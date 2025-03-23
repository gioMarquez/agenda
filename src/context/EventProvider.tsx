import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import { EventContext, } from "./Eventcontext";
import { getData, saveTxt } from "../utils/saveTxt";

export interface Evento {
    id: number;
    name: string; // Added name property
    date: string; // Added date property
}

export const EventProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [currentUserId, setCurrentUserId] = useState<number>(1);
    const [eventos, setEventos] = useState<Evento[]>(() => getData(1)); // Inicializa con datos de localStorage
    const [dateSelected, setDateSelected] = useState<Dayjs>(dayjs());
    const [firstDayMonthName, setFirstDayMonthName] = useState<string>("");
    const [refreshFlag, setRefreshFlag] = useState<boolean>(false);

    const agregarEvento = (evento: Omit<Evento, "id">) => {
        const newId = eventos.length > 0 ? Math.max(...eventos.map(e => e.id)) + 1 : 1; // Calcula el ID único
        setEventos([...eventos, { ...evento, id: newId }]);
        setRefreshFlag((prev) => !prev);
    };

    const eliminarEvento = (id: number) => {
        setEventos(eventos.filter(evento => evento.id !== id));
        setRefreshFlag((prev) => !prev);
    };

    useEffect(() => {
        const eventosGuardados = getData(currentUserId);
        if (eventosGuardados.length > 0) {
            setEventos(eventosGuardados); // Carga los datos del usuario actual
        } else {
            // Inicializa con un objeto vacío si no hay datos para el usuario
            const userData = { idUsuraio: currentUserId, eventos: [] };
            saveTxt(userData);
            setEventos([]); // Asegúrate de que el estado esté vacío
        }
    }, [currentUserId]);

    useEffect(() => {
        const userData = { idUsuraio: currentUserId, eventos };
        saveTxt(userData); // Guarda los datos cada vez que los eventos cambian
    }, [eventos, currentUserId]);

    return (
        <EventContext.Provider value={{
            eventos,
            firstDayMonthName,
            dateSelected,
            setFirstDayMonthName,
            agregarEvento,
            eliminarEvento,
            setDateSelected,
            refreshFlag,
            currentUserId,
            setCurrentUserId
        }}>
            {children}
        </EventContext.Provider>
    );
}