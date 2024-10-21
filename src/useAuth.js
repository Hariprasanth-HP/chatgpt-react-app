import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { login, logout } from './store/auth/action';
import axiosInstance from './axios';

const useAuth = () => {
    const dispatch = useDispatch();
    let toastmessage = ''
    useEffect(() => {

        const checkTokens = async () => {
            const localRefreshToken = localStorage.getItem('refreshToken');
            if (!localRefreshToken) {
                dispatch(logout()); // Logout if no refresh token is available
                return;
            }
            try {
                // Attempt to refresh the access token
                const response = await axiosInstance.post('/token', { token: localRefreshToken });
                const { accessToken, refreshToken, userEmail,message } = response.data;

                if(response.data.status===200){
                    localStorage.setItem('accessToken', accessToken);
                    localStorage.setItem('refreshToken', refreshToken);
                    toastmessage=message

                    dispatch(login(userEmail, accessToken, refreshToken));
                }
                else{
                    toastmessage=message

                }
                
            } catch (error) {
                toastmessage='Failed to refresh token'

                console.error('Failed to refresh token', error);
                dispatch(logout()); // Logout if the refresh token fails
            }
        };
        checkTokens(); // Call the function to check tokens on mount

        // Automatically refresh the token every 4 minutes
        const intervalId = setInterval(checkTokens, 1 * 60 * 1000);

        // Cleanup on unmount
        return () => clearInterval(intervalId);
    }, [dispatch]);
    return toastmessage
};

export default useAuth;