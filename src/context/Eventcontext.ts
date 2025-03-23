import { Dayjs } from "dayjs";
import { createContext } from "react";

// export interface Evento {
//     id: number,
//     titulo: string,
//     fecha: Dayjs,
// }

export interface Evento {
    id: number;
    name: string; // Added name property
    date: string; // Added date property
}

export interface UsuraioEventos {
    idUsuraio: number,
    eventos: Evento[]
}

interface EventContextType {
    eventos: Evento[],
    agregarEvento: (evento: Omit<Evento, "id">) => void;
    eliminarEvento: (id: number) => void;
    firstDayMonthName: string;
    setFirstDayMonthName: React.Dispatch<React.SetStateAction<string>>
    dateSelected: Dayjs;
    setDateSelected: React.Dispatch<React.SetStateAction<Dayjs>>
    refreshFlag: boolean;
    currentUserId: number;
    setCurrentUserId: React.Dispatch<React.SetStateAction<number>>
}

export const EventContext = createContext<EventContextType | undefined>(undefined);

