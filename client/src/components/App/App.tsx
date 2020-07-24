import React, { useEffect } from 'react';
import CalendarContainer from '../Calendar/CalendarContainer';
import './App.css';
import LoginContainer from '../Login/LoginContainer';
import useLocalStorage from 'react-use/lib/useLocalStorage';
import { auth, UsersAPI } from '../../api';
import { logout } from '../../redux/actions';

interface Props {
	user: any
	login: (user: any) => void
}

const App = ( props: Props ) => {
	const { user, login } = props;
	// const [ token ] = useLocalStorage('bearerToken')

	useEffect(() => {
		const token = localStorage.getItem('bearerToken');
		console.log('token', token)
		auth(token);
		if(token) {
			UsersAPI.auth()
				.then(({ user }) => {
					login(user);
				})
		} else {
			logout();
		}
	}, []);

	if (user) {
		return (
			<CalendarContainer />
		)
	} else {
		return (
			<LoginContainer />
		)
	}
}

export default App;
