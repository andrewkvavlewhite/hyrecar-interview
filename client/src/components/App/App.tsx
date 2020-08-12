import React, { useEffect } from 'react';
import CarListContainer from '../CarList/CarListContainer';
import './App.css';
import LoginContainer from '../Login/LoginContainer';
import { auth, UsersAPI } from '../../api';
import { auth as authGQL } from '../../api/Users';
import { useQuery } from '@apollo/client';

interface Props {
	user: any
	login: (user: any) => void
}

const App = ( props: Props ) => {
	const { user, login } = props;

    const { called, loading } = useQuery(
        authGQL,
        {
			onCompleted({ auth: user }) {
				if (user) {
					auth(user.token);
					login(user);
				}
          	},
			onError(error) {
				alert(error.message);
			}
        }
    );

	if (user) {
		return (
			<CarListContainer />
		)
	} else {
		return (
			<LoginContainer />
		)
	}
}

export default App;
