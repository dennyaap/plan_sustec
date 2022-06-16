import { useState, useContext, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/AppRouter';
import { observer } from 'mobx-react-lite';
import Context from './index';
import { check } from './http/userAPI';
import SpinnerLoader from './components/UI/spinnerloader/SpinnerLoader';

import {  ThemeProvider} from '@mui/material/styles';

import GlobalStyleOverrides from './GlobalStyles';

const App = observer(() => {
	const { user } = useContext(Context);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		check().then(data => {
			user.setUser(data);
			user.setIsAuth(true);
		}).finally(() => setLoading(false));
	}, []);

	if (loading) {
		return <SpinnerLoader />
	}

	return (
		<ThemeProvider theme={GlobalStyleOverrides()}>
			<div className="App">
				<BrowserRouter>
					<AppRouter />
				</BrowserRouter>
			</div>
		</ThemeProvider>
	);
});

export default App;
