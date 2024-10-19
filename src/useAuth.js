import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { login, logout } from './store/auth/action';
import axios from 'axios';

const useAuth = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const localRefreshToken = localStorage.getItem('refreshToken');
        const checkTokens = async () => {
            if (!localRefreshToken) {

                dispatch(logout()); // Logout if no refresh token is available
                return;
            }
            try {

                // Attempt to refresh the access token
                const response = await axios.post('http://localhost:5000/token', { token: localRefreshToken });
                const { accessToken, refreshToken, userEmail } = response.data;
                localStorage.setItem('accessToken', accessToken);
                dispatch(login(userEmail, accessToken, refreshToken));
            } catch (error) {
                console.error('Failed to refresh token', error);
                dispatch(logout()); // Logout if the refresh token fails
            }
        };
        checkTokens(); // Call the function to check tokens on mount

        // Automatically refresh the token every 14 minutes
        const intervalId = setInterval(checkTokens, 14 * 60 * 1000);

        // Cleanup on unmount
        return () => clearInterval(intervalId);
    }, [dispatch]);
};

export default useAuth;