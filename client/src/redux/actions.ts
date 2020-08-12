// action types
export const OPEN_AGENDA = 'OPEN_AGENDA';
export const CLOSE_AGENDA = 'CLOSE_AGENDA';
export const OPEN_ADD_CAR = 'OPEN_ADD_CAR';
export const CLOSE_ADD_CAR = 'CLOSE_ADD_CAR';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

interface DateObj {
	date: Date
}

// action creators
export function openAgenda( dateObj: DateObj ) {
	return { type: OPEN_AGENDA, dateObj };
}

export function closeAgenda() {
	return { type: CLOSE_AGENDA };
}

export function openAddCar( car?: any ) {
	return { type: OPEN_ADD_CAR, car };
}

export function closeAddCar() {
	return { type: CLOSE_ADD_CAR };
}

export function login( user: any ) {
	return { type: LOGIN, user }
}

export function logout() {
	return { type: LOGOUT }
}
