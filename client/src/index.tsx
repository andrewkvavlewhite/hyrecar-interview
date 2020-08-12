import React from 'react';
import ReactDOM from 'react-dom';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import AppContainer from './components/App/AppContainer';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import calendarApp from './redux/reducers';
import * as serviceWorker from './serviceWorker';
import './index.css';

import client from './api/instance';
import { ApolloProvider } from '@apollo/client';

declare global {
    interface Window { __REDUX_DEVTOOLS_EXTENSION__: any; }
}

const store = createStore(
	calendarApp,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
	<ApolloProvider client={client}>
		<Provider store={ store as any}>
			<MuiPickersUtilsProvider utils={DateFnsUtils}>
				<AppContainer />
			</MuiPickersUtilsProvider>
		</Provider>
	</ApolloProvider>,
	document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
