import dayjs, { Dayjs } from "dayjs";
import { Evento } from "../../../context/Eventcontext";
import { useEventContext } from "../../../context/useEventContext";

interface DayItemProps {
    date: Dayjs | null;
    eventos: Evento[];
    className?: string;
    currentMonth: number; // Mes actual (0 = Enero, 11 = Diciembre)
}

const DayItem = ({ date, eventos, className, currentMonth }: DayItemProps) => {
    // Verificar si el día pertenece al mes actual
    const isCurrentMonth = date ? date.month() === currentMonth : false;
    const { dateSelected } = useEventContext();

    // Filtrar los eventos que coinciden con la fecha actual
    const eventosDelDia = eventos.filter((evento) => {
        if (!evento.date || !date) return false; // Si no hay fecha, no se muestra
        const fechaEvento = dayjs(evento.date);
        return fechaEvento.isSame(date, "day"); // Comparar solo el día
    });

    // Función para ordenar eventos por hora
    const ordenarEventosPorHora = (eventos: Evento[]): Evento[] => {
        return eventos.sort((a, b) => dayjs(a.date).hour() - dayjs(b.date).hour() || dayjs(a.date).minute() - dayjs(b.date).minute());
    };

    return (
        <div
            className={`${eventosDelDia.length ? "bg-green-200" : ""} ${!isCurrentMonth ? "text-gray-400" : "" // Aplicar estilo gris si no es del mes actual
                } ${className}`}
        >
            {/* Mostrar el número del día */}
            <div
                className={`rounded-2xl w-[3vw] flex items-center justify-center ${dateSelected.isSame(date, "day") ? "bg-teal-400 font-bold" : ""
                    } ${date?.isSame(new Date(), "day") ? "border-2 border-red-500" : ""
                    }`}
            >
                {date ? date.date() : ""}
            </div>

            {/* Mostrar la hora y el título de los eventos */}
            <div>
                {ordenarEventosPorHora(eventosDelDia).map((evento) => {
                    // Formatear la hora del evento
                    const horaEvento = evento.date
                        ? dayjs(evento.date).format("HH:mm") // Formato de 24 horas (ej: "14:30")
                        : "Sin hora";

                    return (
                        <div key={evento.id} className="text-sm truncate">
                            <span className="font-bold">{horaEvento}</span>: {evento.name}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default DayItem;