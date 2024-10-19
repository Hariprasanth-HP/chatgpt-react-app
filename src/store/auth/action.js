// userActions.js

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

// Action creators
export const login = (user, accessToken, refreshToken) => {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);

    return {
        type: LOGIN,
        payload: user,
    };
};

export const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    return {
        type: LOGOUT,
    }
}

