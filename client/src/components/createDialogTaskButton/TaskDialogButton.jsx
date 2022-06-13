import * as React from 'react';
import { Box } from '@mui/system';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export function TaskDialogButton() {

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', marginBottom: '26px' }}>
            <Button variant="contained" onClick={handleClickOpen}
                sx={{
                    backgroundColor: '#32E182',
                    '&:hover':{
                        backgroundColor: '#32E182',
                    }
                }}
            >
                Создать задачу
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Создание задачи</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Для создания задачи, введите ее название.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Название задачи"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Закрыть</Button>
                    <Button onClick={handleClose}>Создать</Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}
