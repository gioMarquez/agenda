import { useContext } from "react";
import { EventContext } from "./Eventcontext";

export const useEventContext = () => {
    const context = useContext(EventContext);

    if (!context) {
        throw new Error("useEventContext debe estar dentro de un EventProvider");
    }

    return context; // Retorna el contexto
};