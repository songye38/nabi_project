import { AUTH_REGISTER, AUTH_REGISTER_SUCCESS, AUTH_REGISTER_FAILURE,AUTH_LOGIN,AUTH_LOGIN_SUCCESS,AUTH_LOGIN_FAILURE} from './ActionTypes';
/* LOGIN */
export function loginRequest(email, password) {
  return (dispatch) => {
      // Inform Login API is starting
      dispatch(login());
 
      // API REQUEST
      return axios.post('https://songye.run.goorm.io/login', {
          email: email,
          pwd: password
        })
      .then((response) => {
          // SUCCEED
          dispatch(loginSuccess(email));
      }).catch((error) => {
          // FAILED––
          dispatch(loginFailure());
      });
  };
}
 
export function login() {
    return {
        type: AUTH_LOGIN
    };
}
 
export function loginSuccess(email) {
    return {
        type: AUTH_LOGIN_SUCCESS,
        email
    };
}
 
export function loginFailure() {
    return {
        type: AUTH_LOGIN_FAILURE
    };
}
