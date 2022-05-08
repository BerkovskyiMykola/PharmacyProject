import { LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from "../constants/login";
import { SET_MESSAGE } from "../constants/message";

import AuthService from "../services/auth.service";

export const login = (login, password) => (dispatch) => {
    return AuthService.login(login, password).then(
        (data) => {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: { user: data },
            });
        },
        (error) => {
            const message = error.response.data.title || error.response.data;

            dispatch({
                type: LOGIN_FAIL,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });
        }
    );
};

export const logout = () => (dispatch) => {
    AuthService.logout();

    dispatch({
        type: LOGOUT,
    });
};