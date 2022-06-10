import Spinner from 'react-bootstrap/Spinner'

const SpinnerLoader = () => {
	return (
		<Spinner 
			animation={ 'border' } 
			variant={ 'primary' }
			style={ { position: "absolute", top: "50%", left: "50%", width: 120, height: 120 } }
		/>
	);
}

export default SpinnerLoader;
