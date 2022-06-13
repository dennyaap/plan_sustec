import { useContext } from 'react';

import { Box } from '@mui/system';
import { Avatar } from '@mui/material';
import { Typography } from '@mui/material';

import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { observer } from 'mobx-react-lite';

import Context from '../../index';
const DrawerAvatar = observer ( ({ open }) => {
	const { user } = useContext(Context);

	const getUserAbbreviated = ( userName ) => {
		let fullName = userName.split(' ');
		return fullName[0].substring(0, 1) + fullName[1].substring(0, 1);
	}
	return (
		<ListItem disablePadding sx={{ display: 'block', marginBottom: 1 }}>
					
					<ListItemButton
                            sx={{
                                minHeight: 48,
                                justifyContent: open ? 'initial' : 'center',
                                px: 2.5,
                              
                            }}
                        >
							<ListItemIcon
							 sx={{
								minWidth: 0,
								mr: open ? 3 : 'auto',
								justifyContent: 'center',
							
							}}
							>
								<Avatar
								sx={
									{
										width: '46px', height: '46px', bgcolor: '#109CF1'
									}
								}
                    src='' 
                   >
                    { getUserAbbreviated(user.currentUser.fullName) }
                </Avatar>
				
							</ListItemIcon>
							<ListItemText
                                primary={ <Box sx={{ opacity: open ? 1 : 0 }}>
								<Typography>{user.currentUser.fullName}</Typography>
								<Typography sx={{ fontSize: '8pt', color: 'gray' }}>#sdf123</Typography>
							</Box>}
                                sx={{ opacity: open ? 1 : 0 }}
                            />
						</ListItemButton>
					
				</ListItem>
	);
});

export default DrawerAvatar;
