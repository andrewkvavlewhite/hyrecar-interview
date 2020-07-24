import { combineReducers } from 'redux';
import { 
	OPEN_AGENDA,
	CLOSE_AGENDA,
	OPEN_ADD_REMINDER,
	CLOSE_ADD_REMINDER,
	LOGIN,
	LOGOUT
} from './actions';

const initialAgendaState = {
	isOpen: false,
	date: null,
	appointments: []
}

const initialAddReminderState = {
	isOpen: false
}

const initialLogin = {}

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

function addReminderStatus( state = initialAddReminderState, action: any ) {
	switch( action.type ) {
		case OPEN_ADD_REMINDER:
			return {
				isOpen: true
			}
		case CLOSE_ADD_REMINDER:
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
	addReminderStatus,
	user
} )

export default calendarApp;
