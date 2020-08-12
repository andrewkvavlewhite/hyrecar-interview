import { combineReducers } from 'redux';
import { 
	OPEN_AGENDA,
	CLOSE_AGENDA,
	OPEN_ADD_CAR,
	CLOSE_ADD_CAR,
	LOGIN,
	LOGOUT
} from './actions';

const initialAgendaState = {
	isOpen: false,
	date: null,
	appointments: []
}

const initialAddCarState = {
	isOpen: false
}

function agendaStatus( state = initialAgendaState , action: any ) {
	switch( action.type ) {
		case OPEN_AGENDA:
			return {
				isOpen: true,
				date: action.dateObj.date,
				appointments: action.dateObj.appointments
			}
		case CLOSE_AGENDA:
			return {
				isOpen: false,
				date: null,
				appointments: []
			}
		default: return state
	}
}

function addCarStatus( state = initialAddCarState, action: any ) {
	switch( action.type ) {
		case OPEN_ADD_CAR:
			return {
				isOpen: true
			}
		case CLOSE_ADD_CAR:
			return {
				isOpen: false
			}
		default: return state
	}
}

function user( state = null, action: any ) {
	switch( action.type ) {
		case LOGIN:
			return action.user
		case LOGOUT:
			return null
		default: return state
	}
}

const calendarApp = combineReducers( {
	agendaStatus,
	addCarStatus,
	user
} )

export default calendarApp;
