import { connect } from 'react-redux';
import AddCar from './AddCar';
import { closeAddReminder } from '../../redux/actions';

interface State {
	addReminderStatus: {
		isOpen: boolean
	}
}

const mapStateToProps = (state:State) => {
	return { 
		isOpen: state.addReminderStatus.isOpen
	};
}

const mapDispatchToProps = (dispatch: any) => {
	return {
		onClose: () => {
			dispatch( closeAddReminder() );
		}
	}
}

const AddCarContainer = connect( mapStateToProps, mapDispatchToProps )( AddCar );

export default AddCarContainer;
