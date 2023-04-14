import { Button } from '@mui/material';

interface BtnProps {
    label: string;
    click: (id: string)=>void
}
const CloseButton = (props: BtnProps) => {
    return (
        <Button 
            variant="outlined" 
            onClick={()=> props.click('')}
        >
            {props.label}
        </Button>
    ) 
}
export default CloseButton;