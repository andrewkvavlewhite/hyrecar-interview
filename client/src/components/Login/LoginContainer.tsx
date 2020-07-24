import { connect } from 'react-redux';

import Login from './Login';

import { login } from '../../redux/actions';

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
		login: user => {
			dispatch( login(user) );
		}
	}
}

const LoginContainer = connect( mapStateToProps, mapDispatchToProps )( Login );

export default LoginContainer;
