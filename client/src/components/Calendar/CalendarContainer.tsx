import { connect } from 'react-redux';

import Calendar from './Calendar';

import { openAddReminder, logout } from '../../redux/actions';
import { auth } from '../../api';

interface Props {}
interface State {
	user: any
}

const mapStateToProps = ( state: State, ownProps: Props ) => {
	const { user } = state;

	return { user };
}

const mapDispatchToProps = (dispatch: any) => {
	return {
		onFabAddClick: () => {
			dispatch( openAddReminder() );
        },
        logout: () => {
            dispatch(logout());
            auth(null);
        }
	}
}

const CalendarContainer = connect( mapStateToProps, mapDispatchToProps )( Calendar );

export default CalendarContainer;
