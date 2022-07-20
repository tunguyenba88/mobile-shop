import { userActionType } from './userType';

const defaultState = {
  user: null,
  isSigningIn: null,
  error: null,
};

export const userReducer = (state = defaultState, action) => {
  switch (action.type) {
    case userActionType.LOGGED_IN_INIT:
      return {
        ...defaultState,
        isSigningIn: true,
      };
    case userActionType.LOGGED_IN_SUCCESS:
      return {
        ...defaultState,
        user: action.payload,
        isSigningIn: false,
      };
    case userActionType.LOGGED_IN_ERROR:
      return {
        ...defaultState,
        error: action.payload,
      };
    case userActionType.CLEAN_STATE:
      return {
        ...state,
        isSigningIn: null,
        error: null,
      };
    case userActionType.LOGOUT:
      return defaultState;
    default:
      return state;
  }
};
