import { useState } from 'react';
import { Box } from '@mui/system';
import Button from '@mui/material/Button';
import ModalCreate from '../modalcreate/ModalCreate';
import { COLORS } from '../../consts/consts';


const ListHeader = ({ addProject }) => {
	const [isOpen, setIsOpen] = useState(false);

	const openModal = () => {
		setIsOpen(true);
	}
    const closeModal = () => {
        setIsOpen(false);
    };

	return (
		<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', marginBottom: '26px' }}>
		<Button variant="contained" 
			onClick={ openModal }
			sx={{
				backgroundColor: COLORS.GREEN,
				'&:hover':{
					backgroundColor: COLORS.GREEN,
					opacity: 0.9
				},
				fontSize: 13, fontWeight: 600,
				textTransform: 'none',
				letterSpacing: 1,
				width: '170px',
				height: '46px'
			}}
		>
			Создать проект
		</Button>

		<ModalCreate isOpen={isOpen} closeModal={closeModal} addProject={addProject}/>
	</Box>
	);
}

export default ListHeader;
