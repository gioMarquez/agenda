import { Button, ButtonProps } from "@mui/material"
import AddIcon from '@mui/icons-material/Add';
import toast from "react-hot-toast";


interface AddButtonProps extends ButtonProps {
    text: string
}

const AddButton = ({ text, ...props }: AddButtonProps) => {
    return (
        <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => { toast.success("holaaaa") }}
            {...props} // Extiende todas las props de MUI
        >
            <p>{text}</p>
        </Button>
    )
}

export default AddButton