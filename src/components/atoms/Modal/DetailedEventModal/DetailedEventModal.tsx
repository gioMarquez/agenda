import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete'; // 🆕 Ícono de eliminar
import { Evento } from '../../../../context/Eventcontext';
import { useEventContext } from '../../../../context/useEventContext';
import dayjs from 'dayjs';
import toast from 'react-hot-toast';

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    overflowY: 'auto',
    borderRadius: 10,
};

interface BasicModalProps {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function DetailedEventModal({ isOpen, setIsOpen }: BasicModalProps) {
    const { dateSelected, eventos, eliminarEvento } = useEventContext();

    const handleClose = () => setIsOpen(false);

    const deleteEvent = (id: number) => {
        eliminarEvento(id);
        toast.error('Evento eliminado');
    }

    const eventosDelDia = eventos.filter((evento: Evento) => dayjs(evento.date).isSame(dateSelected, 'day'));

    return (
        <Modal
            open={isOpen}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={modalStyle}>
                {/* Botón de cerrar el modal */}
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

                {/* Título del modal */}
                <Typography id="modal-modal-title" variant="h6" component="h2" fontFamily={"revert-layer"} sx={{ mb: 2, fontWeight: 600 }}>
                    Eventos del día {dateSelected.format("DD/MM/YYYY")}
                </Typography>

                {/* Mensaje si no hay eventos */}
                {eventosDelDia.length === 0 && (
                    <Typography sx={{ color: 'text.secondary', my: 2 }}>
                        No hay eventos para este día.
                    </Typography>
                )}

                {/* Lista de eventos */}
                <Box sx={{ maxHeight: '60vh', overflowY: 'auto', pr: 2 }}>
                    {eventosDelDia.map((evento: Evento) => (
                        <Box
                            key={evento.id}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between', // 🆕 Alinea el botón de eliminar
                                py: 1.5,
                                borderBottom: '1px solid',
                                borderColor: 'divider',
                                '&:last-child': {
                                    borderBottom: 'none',
                                },
                            }}
                        >
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                {/* Hora del evento */}
                                <Typography
                                    variant="body2"
                                    sx={{
                                        fontWeight: 'bold',
                                        minWidth: 60,
                                        color: 'primary.main',
                                    }}
                                >
                                    {dayjs(evento.date).format("HH:mm")}
                                </Typography>

                                {/* Nombre del evento */}
                                <Typography variant="body1" sx={{ ml: 2 }}>
                                    {evento.name}
                                </Typography>
                            </Box>

                            {/* Botón de eliminar */}
                            <IconButton onClick={() => deleteEvent(evento.id)} color="error">
                                <DeleteIcon />
                            </IconButton>
                        </Box>
                    ))}
                </Box>
            </Box>
        </Modal>
    );
}
