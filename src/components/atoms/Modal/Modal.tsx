import { IconButton, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import React, { useState } from 'react';
import { useEventContext } from '../../../context/useEventContext';
import TimeSelect from '../TimeSelect/TimeSelect';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    borderRadius: 10,
};

const inputStyle = {
    width: '100%',
    marginBottom: '16px',
};

interface BasicModalProps {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    dateSelected?: Dayjs;
}

export default function BasicModal({ isOpen, setIsOpen, dateSelected = dayjs() }: BasicModalProps) {
    const [timeStart, setTimeStart] = React.useState<Dayjs | null>(null);
    const [eventName, setEventName] = React.useState<string>("");
    const [newDateSelected, setNewDateSelected] = useState<Dayjs | null>(null)

    const handleClose = () => setIsOpen(false);

    const { agregarEvento } = useEventContext();

    const cleanInfo = () => {
        setNewDateSelected(null)
        setEventName("")
        setTimeStart(null)

    }





    const handleSave = () => {
        if (eventName && timeStart) {

            const dateToSave = newDateSelected ? newDateSelected : dateSelected

            const eventDateTime = dateToSave?.hour(timeStart.hour()).minute(timeStart.minute());
            agregarEvento({ name: eventName, date: eventDateTime?.toISOString() || '' });
            setIsOpen(false);
            cleanInfo()
        }
    };

    return (
        <div>
            <Modal
                open={isOpen}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <IconButton
                        onClick={handleClose}
                        sx={{
                            position: 'absolute',
                            top: 8,
                            right: 8,
                            color: 'grey.500',
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Agrega un nuevo evento
                    </Typography>

                    <TextField
                        placeholder="Nombre del evento"
                        fullWidth
                        sx={inputStyle}
                        value={eventName}
                        onChange={(e) => setEventName(e.target.value)}
                    />
                    <DatePicker
                        value={newDateSelected}
                        onChange={(date) => { setNewDateSelected(date) }}
                        // slots={{ textField: (props) => <TextField {...props} fullWidth sx={inputStyle} /> }}
                    />
                    <div className="pt-5">
                        <TimeSelect
                            label="Selecciona la hora"
                            style={{ ...inputStyle }}
                            onTimeChange={setTimeStart}
                        />
                    </div>

                    <div className="pt-5">
                        <Button variant="contained" fullWidth onClick={handleSave}>
                            Guardar
                        </Button>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}
