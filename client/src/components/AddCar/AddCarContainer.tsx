import { connect } from 'react-redux';
import AddCar from './AddCar';
import { closeAddCar } from '../../redux/actions';

interface State {
	addCarStatus: {
		isOpen: boolean
	}
}

const mapStateToProps = (state:State) => {
	return { 
		isOpen: state.addCarStatus.isOpen
	};
}

const mapDispatchToProps = (dispatch: any) => {
	return {
		onClose: () => {
			dispatch( closeAddCar() );
		}
	}
}

const AddCarContainer = connect( mapStateToProps, mapDispatchToProps )( AddCar );

export default AddCarContainer;
