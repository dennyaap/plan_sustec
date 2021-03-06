import { forwardRef } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { Typography } from '@mui/material';
import { COLORS } from '../../consts/consts';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

const ModalDelete = ({ isOpen, selectedProject, closeModal, deleteProject }) => {

	return (
		<Dialog
				open={isOpen}
				TransitionComponent={Transition}
				keepMounted
				onClose={closeModal}
				aria-describedby="alert-dialog-slide-description"
			>
				<DialogTitle>Вы действительно хотите удалить <Typography sx={{ color: COLORS.RED }}>"{selectedProject.name}"</Typography></DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-slide-description">
						Удалив проект, вы также удалите все задачи данного проекта.
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={ closeModal }>Отмена</Button>
					<Button onClick={ deleteProject } sx={{ color: COLORS.RED }}>Удалить</Button>
				</DialogActions>
		</Dialog>
	);
}

export default ModalDelete;