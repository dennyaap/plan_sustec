import { useState, useContext, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/AppRouter';
import { observer } from 'mobx-react-lite';
import Context from './index';
import { check } from './http/userAPI';
import SpinnerLoader from './components/UI/spinnerloader/SpinnerLoader';

const App = observer( () => {
	const { user } = useContext( Context );
	const [ loading, setLoading ] = useState(true);

	useEffect( () => {
		check().then( data => {
			user.setUser(data);
			user.setIsAuth(true);
		}).finally( () => setLoading( false ) );
	}, []);

	if( loading ) {
		return <SpinnerLoader />
	}

	return (
		<div className="App">
			<BrowserRouter>
				<AppRouter />
			</BrowserRouter>
		</div>
	);
});

export default App;
