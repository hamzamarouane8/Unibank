import * as storage from '../../storage'
import {LOGIN, LOGOUT_SUCCESS,AUTH_BAPI} from "../actions";

const initialState = {
  user: storage.get('session_user'),
  authenticated: false
}

if (initialState.user) {
  initialState.authenticated = true
}


export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      if (!action.error) {
        const user = {
          token: action.payload.token,
          id: action.payload.id,
          userName:  action.payload.userName,
          fullName: action.payload.fullName,
          email: action.payload.email,
          status: action.payload.status
        }
        storage.set('session_user', user)
        return {user, authenticated: true}
      }
      return state
    case AUTH_BAPI:
      const user = initialState.user
      return {user, authenticated: true}
    case LOGOUT_SUCCESS:
      storage.remove('session_user')
      return {authenticated: false, user: null}
    default:
      return state
  }
}
