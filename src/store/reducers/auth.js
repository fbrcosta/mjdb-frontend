import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
	internalAuthChecked: false,
	token: null,
	username: null,
	email: null,
	first_name: null,
	last_name: null,
	error: null,
	loading: false
}

const authStart = (state, action) => {
	return updateObject(state, {
		error: null,
		loading: true
	})
}

const authSuccess = (state, action) => {
	return updateObject(state, {
		token: action.token,
		username: action.username,
		email: action.email,
		first_name: action.first_name,
		last_name: action.last_name,
		error: null,
		loading: false,
		internalAuthChecked: true
	})
}

const authFail = (state, action) => {
	return updateObject(state, {
		error: action.error,
		loading: false
	})
}

const authLogout = (state, action) => {
	return updateObject(state, {
		token: null,
		username: null,
		email: null,
		first_name: null,
		last_name: null,
		internalAuthChecked: true
	})
}

const reducer = (state=initialState, action) => {
	switch (action.type) {
		case actionTypes.AUTH_START: return authStart(state, action);
		case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
		case actionTypes.AUTH_FAIL: return authFail(state, action);
		case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
		default: 
			return state;
	}
}

export default reducer;
