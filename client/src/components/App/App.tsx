import React, { useEffect } from 'react';
import CalendarContainer from '../Calendar/CalendarContainer';
import './App.css';
import LoginContainer from '../Login/LoginContainer';
import { auth, UsersAPI } from '../../api';

interface Props {
	user: any
	login: (user: any) => void
}

const App = ( props: Props ) => {
	const { user, login } = props;

	useEffect(() => {
		const token = localStorage.getItem('bearerToken');
		auth(token);
		if(token) {
			UsersAPI.auth()
				.then(({ user }) => {
					login(user);
				})
		}
	}, [login]);

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
