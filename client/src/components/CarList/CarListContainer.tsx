import { connect } from 'react-redux';

import CarList from './CarList';

import { openAddCar, logout } from '../../redux/actions';
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
			dispatch( openAddCar() );
        },
        logout: () => {
            dispatch(logout());
            auth(null);
        }
	}
}

const CarListContainer = connect( mapStateToProps, mapDispatchToProps )( CarList );

export default CarListContainer;
