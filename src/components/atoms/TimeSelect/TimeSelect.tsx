import { Stack } from "@mui/material";
import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";
import React, { useState } from "react";

const TimeSelect: React.FC = () => {
    const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
    const [selectedTime, setSelectedTime] = useState<Dayjs | null>(null);

    // Función para generar intervalos de 30 minutos
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Stack spacing={2} sx={{ maxWidth: 300, margin: "auto" }}>
                {/* Selector de Hora con Intervalos de 30 Minutos */}
                <TimePicker
                    label="Selecciona una hora"
                    value={selectedTime}
                    onChange={(newTime) => setSelectedTime(newTime)}
                />

                {/* Mostrar la fecha y hora seleccionadas */}
                {selectedDate && selectedTime && (
                    <p>
                        Fecha y hora seleccionada:{" "}
                        <strong>{selectedDate.format("YYYY-MM-DD")} {selectedTime.format("HH:mm")}</strong>
                    </p>
                )}
            </Stack>
        </LocalizationProvider>
    );
};

export default TimeSelect;
