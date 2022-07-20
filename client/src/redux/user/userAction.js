import * as authApi from '../../api/authApi';
import * as userApi from '../../api/userApi';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth';

import { googleAuthProvider } from '../../firebase/firebase.utils';

import { userActionType } from './userType';

export const unsubscribe = () => (dispatch) => {
  const auth = getAuth();
  auth.onAuthStateChanged(async (user) => {
    if (user) {
      try {
        const idToken = await user.getIdToken();
        const { data } = await authApi.currentUser(idToken);

        const { name, email, _id, role, avatar, sdt, address } = data;

        dispatch({
          type: userActionType.LOGGED_IN_SUCCESS,
          payload: {
            _id,
            name,
            email,
            token: idToken,
            role,
            avatar,
            sdt,
            address,
          },
        });
      } catch (error) {
        dispatch({
          type: userActionType.LOGGED_IN_ERROR,
          payload: error.message,
        });
        console.error(error);
      }
    } else {
      console.log('User is not signed in');
    }
  });
};

export const logout = () => async (dispatch) => {
  const auth = getAuth();
  try {
    await signOut(auth);
    dispatch({
      type: userActionType.LOGOUT,
      payload: null,
    });
  } catch (error) {}
};

export const register = (user) => (dispatch) => {
  dispatch({ type: userActionType.REGISTER_SUCCESS, payload: user });
};

export const loginWithEmailAndPassword =
  (emailIp, passwordIp) => async (dispatch) => {
    dispatch({ type: userActionType.LOGGED_IN_INIT });
    const auth = getAuth();
    try {
      const { user } = await signInWithEmailAndPassword(
        auth,
        emailIp,
        passwordIp
      );
      const idToken = await user.getIdToken();

      const { data } = await userApi.createOrUpdateUser(idToken);
      const { email, _id, role, avatar, name, sdt, address } = data;

      dispatch({
        type: userActionType.LOGGED_IN_SUCCESS,
        payload: {
          _id,
          email,
          token: idToken,
          role,
          avatar,
          name,
          sdt,
          address,
        },
      });
    } catch (error) {
      dispatch({
        type: userActionType.LOGGED_IN_ERROR,
        payload: error.message,
      });
      setTimeout(() => {
        dispatch({
          type: userActionType.CLEAN_STATE,
        });
      }, 2000);
    }
  };
export const loginWithGoogle = () => async (dispatch) => {
  const auth = getAuth();
  try {
    const result = await signInWithPopup(auth, googleAuthProvider);
    const token = await result.user.getIdToken();
    // const credential = GoogleAuthProvider.credentialFromResult(result);
    const {
      data: { _id, email, role, avatar, name, sdt, address },
    } = await userApi.createOrUpdateUser(token);
    dispatch({
      type: userActionType.LOGGED_IN_SUCCESS,
      payload: { _id, email, role, token, avatar, name, sdt, address },
    });
  } catch (error) {
    const credential = GoogleAuthProvider.credentialFromError(error);
    console.log(credential);
  }
};
// export const loginWithFacebook = () => async (dispatch) => {
//   const auth = getAuth();
//   try {
//     const result = await signInWithPopup(auth, facebookAuthProvider);
//     const credential = FacebookAuthProvider.credentialFromResult(result);
//     console.log(result);
//     console.log(credential);
//     // dispatch({ type: userActionType.LOGGED_IN_SUCCESS, payload: result.user });
//   } catch (error) {
//     const credential = GoogleAuthProvider.credentialFromError(error);
//     console.log(credential);
//   }
// };
