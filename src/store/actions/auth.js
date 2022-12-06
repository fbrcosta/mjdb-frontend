import axios from 'axios';

import * as actionTypes from './actionTypes';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  }
}

export const authSuccess = (token, username, email, first_name, last_name) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: token,
    username: username,
    email: email,
    first_name: first_name,
    last_name: last_name,
  }
}

export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  }
}

export const logout = () => {
  //localStorage.removeItem('user'); // need to check if should be user or token
  localStorage.removeItem('token');
  localStorage.removeItem('username');
  localStorage.removeItem('email');
  localStorage.removeItem('first_name');
  localStorage.removeItem('last_name');
  localStorage.removeItem('expirationDate');
  return {
    type: actionTypes.AUTH_LOGOUT
  }
}

export const checkAuthTimeout = expirationTime => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime) 
  }
}

export const authLogin = (username, password) => {
  return dispatch => {
    dispatch(authStart());
    axios.post(process.env.REACT_APP_BACKEND_URL + '/rest-auth/login/', {
      username: username,
      password: password
    })
    .then(token_response => {
      const token = token_response.data.key;
      axios.get(process.env.REACT_APP_BACKEND_URL + '/rest-auth/user/', 
         { headers: { Authorization: 'Token ' + token } }
      )
      .then(user_response => {
        const expirationDate = new Date(new Date().getTime() + 12 * 3600 * 1000);
        const username = user_response.data.username;
        const email = user_response.data.email;
        const first_name = user_response.data.first_name;
        const last_name = user_response.data.last_name;
        localStorage.setItem('token', token);
        localStorage.setItem('username', username);
        localStorage.setItem('email', email);
        localStorage.setItem('first_name', first_name);
        localStorage.setItem('last_name', last_name);
        localStorage.setItem('expirationDate', expirationDate);
        dispatch(authSuccess(token, username, email, first_name, last_name));
        dispatch(checkAuthTimeout(12 * 3600 * 1000));
      })
      .catch(error => {
        console.log("cenas: ", error)
        dispatch(authFail(error))
      })
    })
    .catch(error => {
      console.log("cenas: ", error)
      dispatch(authFail(error))
    })
  }
}

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    const email = localStorage.getItem('email');
    const first_name = localStorage.getItem('first_name');
    const last_name = localStorage.getItem('last_name');
    if ((token) === undefined || (username) === undefined ||  (email) === undefined ||  (first_name) === undefined ||  (last_name) === undefined) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'));
      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        dispatch(authSuccess(token, username, email, first_name, last_name));
        dispatch(checkAuthTimeout(
          expirationDate.getTime() - new Date().getTime()
        ));
      }
    }
  }
}
