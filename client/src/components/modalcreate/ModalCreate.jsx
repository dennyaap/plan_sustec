import { useState } from 'react';
import { Box } from '@mui/system';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


const ModalCreate = ({ isOpen, closeModal }) => {

	return (
		<Dialog open={ isOpen } onClose={closeModal}>
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
			<Button onClick={closeModal}>Закрыть</Button>
			<Button onClick={closeModal}>Создать</Button>
		</DialogActions>
	</Dialog>
	);
}

export default ModalCreate;
