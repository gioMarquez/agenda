import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Input, Select } from '@mui/material';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
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
};

interface BasicModalProps {
    isOpen: boolean
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
    dateSelected?: Dayjs
}

export default function BasicModal({ isOpen, setIsOpen, dateSelected = dayjs() }: BasicModalProps) {
    const handleClose = () => setIsOpen(false);

    return (
        <div>
            <Modal
                open={isOpen}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Agrega un nuevo evento
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <Input placeholder='Nombre del evento' />
                    </Typography>

                    <DesktopDatePicker value={dateSelected} />
                    <div className='pt-5'>
                        <TimeSelect label='inicio' />  <TimeSelect label='fin'/>
                    </div>
                    <div className='pt-5'>
                        <Button variant='contained' >Guardar</Button>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}
