import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import { EventContext, } from "./Eventcontext";
import { saveTxt } from "../utils/saveTxt";

export interface Evento {
    id: number;
    name: string; // Added name property
    date: string; // Added date property
}

export const EventProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [dateSelected, setDateSelected] = useState<Dayjs>(dayjs());
    const [eventos, setEventos] = useState<Evento[]>([]);
    const [firstDayMonthName, setFirstDayMonthName] = useState<string>("");
    const [refreshFlag, setRefreshFlag] = useState<boolean>(false); // Added refresh flag

    const agregarEvento = (evento: Omit<Evento, "id">) => {
        setEventos([...eventos, { ...evento, id: eventos.length + 1 }]);
        setRefreshFlag((prev) => !prev); // Toggle refresh flag
    };

    const eliminarEvento = (id: number) => {
        setEventos(eventos.filter(evento => evento.id !== id));
        setRefreshFlag((prev) => !prev); // Toggle refresh flag
    };

    useEffect(() => {
        if (eventos.length > 0) {  // Solo guardar si hay eventos
            saveTxt(eventos);
        }
    }, [eventos])

    useEffect(() => {
        const eventosGuardados = localStorage.getItem('eventos');
        if (eventosGuardados) {
            setEventos(JSON.parse(eventosGuardados));
        }
    }, [])

    return (
        <EventContext.Provider value={{
            eventos,
            firstDayMonthName,
            dateSelected,
            setFirstDayMonthName,
            agregarEvento,
            eliminarEvento,
            setDateSelected,
            refreshFlag // Expose refresh flag
        }}>
            {children}
        </EventContext.Provider>
    );
}