export const UPDATE_COMM = "UPDATE_COMM";
export const UPDATE_COMM_SUCCESS = "UPDATE_COMM_SUCCESS";
export const UPDATE_COMM_FAILURE = "UPDATE_COMM_FAILURE";


// export function updateCommRequest(status, userId,commNo,commName) {
//   return (dispatch) => {
//       // Inform Login API is starting
//       dispatch(updateComm());
 
//       return axios.post('https://songye.run.goorm.io/comJoin', {
//             user_status : status,
//             user_id : userId,
//             comm_id : commNo,
//             comm_name :commName,
//         })
//       .then((response) => {
//           dispatch(updateCommSuccess());
//       }).catch((error) => {
//           dispatch(updateCommFailure());
//       });
//   };
// }
 
export function updateComm() {
    return {
        type: UPDATE_COMM,
    };
}
 
export function updateCommSuccess() {
    return {
        type: UPDATE_COMM_SUCCESS,
    };
}
 
export function updateCommFailure() {
    return {
        type: UPDATE_COMM_FAILURE,
    };
}


const counterInitialState = {
    updateStatus: 'hi',
};

const comm = (state = counterInitialState, action) => {
    switch(action.type) {
        case UPDATE_COMM:
            return {
              updateStatus : "fetching"
            }
        case UPDATE_COMM_SUCCESS:
            return {
              updateStatus : "success"
            }
        case UPDATE_COMM_FAILURE:
            return {
              updateStatus : "fail"
            }
        default:
            return state;
    }
};

export default comm;