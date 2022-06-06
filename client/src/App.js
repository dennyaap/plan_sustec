import { useState, useContext, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/AppRouter';
import { observer } from 'mobx-react-lite';
import Context from './index';
import { check } from './http/userAPI';
import Spinner from 'react-bootstrap/Spinner'

const App = observer( () => {
	const { user } = useContext( Context );
	const [ loading, setLoading ] = useState(true);

	useEffect( () => {
		setTimeout( () => {
			check().then( data => {
				user.setUser(true);
				user.setIsAuth(true);
			}).finally( () => setLoading( false ) )
		}, 1000);
	}, []);

	if( loading ) {
		return <Spinner 
			animation={ 'border' } 
			variant={ 'primary' }
			style={ { position: "absolute", top: "50%", left: "50%", width: 120, height: 120 } }
		/>
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
