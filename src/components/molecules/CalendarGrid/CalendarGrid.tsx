import dayjs, { Dayjs } from "dayjs";
import weekday from "dayjs/plugin/weekday";

dayjs.extend(weekday);
import { useEventContext } from "../../../context/useEventContext";
import DayItem from "../../atoms/DayItem/DayItem";
import { useEffect, useState } from "react";

const getMonthDays = (date: Dayjs) => {
    return date.daysInMonth();
};

const CalendarGrid = () => {
    const weekDays = [
        { numberDay: 1, nameDay: "Lunes", initial: "L" },
        { numberDay: 2, nameDay: "Martes", initial: "M" },
        { numberDay: 3, nameDay: "Miércoles", initial: "M" },
        { numberDay: 4, nameDay: "Jueves", initial: "J" },
        { numberDay: 5, nameDay: "Viernes", initial: "V" },
        { numberDay: 6, nameDay: "Sábado", initial: "S" },
        { numberDay: 7, nameDay: "Domingo", initial: "D" },
    ];

    const { dateSelected, eventos, refreshFlag } = useEventContext(); // Added refreshFlag
    const [daysInMonth, setDaysInMonth] = useState<number>(getMonthDays(dateSelected));
    const [calendarDays, setCalendarDays] = useState<(Dayjs | null)[]>([]);

    useEffect(() => {
        setDaysInMonth(getMonthDays(dateSelected));

        const firstDayOfMonth = dateSelected.startOf("month");
        const firstDayOfWeek = firstDayOfMonth.weekday();

        const previousMonthDays = [];
        for (let i = firstDayOfWeek - 1; i >= 0; i--) {
            previousMonthDays.push(firstDayOfMonth.subtract(i + 1, "day"));
        }

        const currentMonthDays = [];
        for (let i = 0; i < daysInMonth; i++) {
            currentMonthDays.push(firstDayOfMonth.add(i, "day"));
        }

        const nextMonthDays = [];
        const totalDays = previousMonthDays.length + currentMonthDays.length;
        const remainingDays = 42 - totalDays;
        for (let i = 1; i <= remainingDays; i++) {
            nextMonthDays.push(currentMonthDays[currentMonthDays.length - 1].add(i, "day"));
        }

        const allDays = [...previousMonthDays, ...currentMonthDays, ...nextMonthDays];
        setCalendarDays(allDays);
    }, [dateSelected, daysInMonth, refreshFlag]); // Added refreshFlag to dependencies

    return (
        <div className="w-full h-full relative">
            <div className="absolute -top-5 bg-[#1565C0]/90 text-white font-bold w-full grid grid-cols-7">
                {weekDays.map((day, index) => (
                    <div key={index} className="text-center">{day.initial}</div>
                ))}
            </div>

            <div className="grid grid-cols-7">
                {calendarDays.map((date, index) => {
                    const eventosDelDia = eventos.filter((evento) => {
                        if (!evento.date) return false;
                        const fechaEvento = dayjs(evento.date, "YYYY-MM-DD"); // Ensure proper parsing
                        return fechaEvento.isValid() && fechaEvento.isSame(date, "day");
                    });

                    return (
                        <DayItem
                            key={index}
                            date={date}
                            eventos={eventosDelDia}
                            className="border-2 h-[15vh]"
                            currentMonth={dateSelected.month()}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default CalendarGrid;