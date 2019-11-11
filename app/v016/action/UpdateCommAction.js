import { UPDATE_COMM, UPDATE_COMM_SUCCESS, UPDATE_COMM_FAILURE} from './ActionTypes';
/* LOGIN */
export function updateCommRequest(status, userId,commNo,commName) {
  return (dispatch) => {
      // Inform Login API is starting
      dispatch(updateComm());
 
      return axios.post('https://songye.run.goorm.io/comJoin', {
            user_status : status,
            user_id : userId,
            comm_id : commNo,
            comm_name :commName,
        })
      .then((response) => {
          dispatch(updateCommSuccess());
      }).catch((error) => {
          dispatch(updateCommFailure());
      });
  };
}
 
export function updateComm() {
    return {
        type: UPDATE_COMM,
        status : "fetching"
    };
}
 
export function updateCommSuccess(email) {
    return {
        type: AUTH_LOGIN_SUCCESS,
        status : "success"
    };
}
 
export function updateCommFailure() {
    return {
        type: AUTH_LOGIN_FAILURE,
        status : "fail"
    };
}
