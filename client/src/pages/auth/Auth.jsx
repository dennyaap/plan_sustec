import { useContext, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';
import Image from './bsh.png';
import './style.css';
import { login } from '../../http/userAPI';
import { observer } from 'mobx-react-lite';

import Context from '../../index';
import { PROJECTS_ROUTE } from '../../consts/consts';

const theme = createTheme();

const Auth = observer( () => {
	const [ userLogin, setUserLogin ] = useState('');
	const [ userPassword, setUserPassword ] = useState('');

	const { user } = useContext( Context );
	const navigate = useNavigate();

	const authUser = async (e) => {
		e.preventDefault();
		try {
			const data = await login( userLogin, userPassword );
			user.setUser( data );
			user.setIsAuth(true);
			navigate( PROJECTS_ROUTE );
		} catch (e) {
			alert(e.response.data.message);
		}
	}

	return (
		<ThemeProvider theme={theme}>
		<Grid container component="main" sx={{ height: '100vh' }}>
			<CssBaseline />

			<Grid
			item
			xs={false}
			sm={4}
			md={7}
			sx={{
				backgroundImage: `url(${Image})`,
				backgroundRepeat: 'no-repeat',
				backgroundColor: (t) =>
				t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
				backgroundSize: '50%',
				backgroundPosition: '20% 70%',
				userSelect: 'none'
			}}
			>
			<Box sx={{ height: '100vh' }} className={'boxText'}>
				<Box component='div' sx={{ paddingLeft: 15, paddingTop: 6, fontSize: '48pt', color: '#109CF1' }}>Plan Sustec</Box>
				<Box component='div' sx={{ marginLeft: 15, fontSize: '12pt', width: 340, borderRadius: 3, background: '#FFBF43', padding: 1, color: 'white' }}>Ставь задачу</Box>
				<Box component='div' sx={{ marginLeft: 15, marginTop: 2, fontSize: '12pt', width: 250, borderRadius: 3, background: '#32E182', padding: 1, color: 'white' }}>Выполняй</Box>
			</Box>
			</Grid>

			<Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
			<Box
				sx={{
				my: 8,
				mx: 4,
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				}}
			>
				<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
				<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
				Авторизация
				</Typography>
				<Box component="form" noValidate sx={{ mt: 1 }}>
				<TextField
					margin="normal"
					required
					fullWidth
					id="email"
					label="Email Address"
					name="login"
					autoComplete="login"
					autoFocus
					value={userLogin}
					onChange={ (e) => setUserLogin( e.target.value ) }
				/>
				<TextField
					margin="normal"
					required
					fullWidth
					name="password"
					label="Пароль"
					type="password"
					id="password"
					autoComplete="current-password"
					value={userPassword}
					onChange={ (e) => setUserPassword( e.target.value ) }
				/>

				{/* <Link to='/sidebar'> */}
					<Button component={Link} to={'/sidebar'}
					type="submit"
					fullWidth
					variant="contained"
					sx={{ mt: 3, mb: 2 }}
					onClick={ authUser }
					>
					Войти
					</Button>
				{/* </Link> */}
				</Box>
			</Box>
			</Grid>
		</Grid>
		</ThemeProvider>
	);
});

export default Auth;