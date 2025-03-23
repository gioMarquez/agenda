import { Stack } from "@mui/material";
import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";
import React, { useState } from "react";

interface TimeSelectProps {
    label: string;
    style?: React.CSSProperties;
    onTimeChange?: (time: Dayjs | null) => void; // Added onTimeChange prop
}

const TimeSelect: React.FC<TimeSelectProps> = ({ label, style, onTimeChange }) => {
    const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
    const [selectedTime, setSelectedTime] = useState<Dayjs | null>(null);

    const handleTimeChange = (newTime: Dayjs | null) => {
        setSelectedTime(newTime);
        if (onTimeChange) {
            onTimeChange(newTime);
        }
    };

    console.log("selectedTime", selectedTime)

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Stack spacing={2} sx={{ ...style, margin: "auto" }}> {/* Apply style prop */}
                <TimePicker
                    label={label}
                    value={selectedTime}
                    onChange={handleTimeChange}
                    sx={{ width: "100%" }} // Set the same width as inputs
                />

                {/* Mostrar la fecha y hora seleccionadas */}
                {selectedDate && selectedTime && (
                    <div>
                        Fecha y hora seleccionada:{" "}
                        <strong>
                            {selectedDate.format("YYYY-MM-DD")} {selectedTime.format("HH:mm")}
                        </strong>
                    </div>
                )}
            </Stack>
        </LocalizationProvider>
    );
};

export default TimeSelect;