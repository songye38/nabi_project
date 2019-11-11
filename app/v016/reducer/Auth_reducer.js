...
/* LOGIN */
case types.AUTH_LOGIN:
    return {
      ...state,
      login : {
        status: 'WAITING'
      }
    }
case types.AUTH_LOGIN_SUCCESS:
    return {
      ...state,
      login: {
          status: 'SUCCESS'
      },
      status: {
        ...state.status,
        isLoggedIn: true,
        currentUser: action.username
      }
    }
case types.AUTH_LOGIN_FAILURE:
    return {
      ...state,
      login:{
        status: 'FAILURE'
      }
    }
...
