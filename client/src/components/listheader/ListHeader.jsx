import { useState } from 'react';
import { Box } from '@mui/system';
import Button from '@mui/material/Button';
import ModalCreate from '../modalcreate/ModalCreate';
import { COLORS } from '../../consts/consts';
import SortStatus from '../sortStatus/SortStatus';


const ListHeader = ({ addProject, currentSortStatus, changeSortStatus }) => {
	const [isOpen, setIsOpen] = useState(false);

	const openModal = () => {
		setIsOpen(true);
	}
    const closeModal = () => {
        setIsOpen(false);
    };

	return (
		<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '26px' }}>

		<SortStatus currentSortStatus={currentSortStatus} changeSortStatus={changeSortStatus}/>

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
				height: '46px',
				boxShadow: '0 4px 10px rgba(16,156,241,0.26)',
				borderRadius: '6px'
			}}
		>
			Создать проект
		</Button>

		<ModalCreate isOpen={isOpen} closeModal={closeModal} addProject={addProject}/>
	</Box>
	);
}

export default ListHeader;
