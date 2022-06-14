import { useState } from 'react';
import { Box } from '@mui/system';
import Button from '@mui/material/Button';
import ModalCreate from '../modalcreate/ModalCreate';


const ListHeader = () => {
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
				backgroundColor: '#32E182',
				'&:hover':{
					backgroundColor: '#32E182',
				}
			}}
		>
			Создать задачу
		</Button>

		<ModalCreate isOpen={isOpen} closeModal={closeModal} />
	</Box>
	);
}

export default ListHeader;
