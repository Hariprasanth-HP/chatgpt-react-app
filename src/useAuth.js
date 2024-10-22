import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { login, logout } from './store/auth/action';
import axiosInstance from './axios';
import { useToast } from '@chakra-ui/react';

const useAuth = () => {
    const dispatch = useDispatch();
    const toast = useToast();
    const toastmessageBl = (isLoggedIn, type) => {
        toast({
            title: type,
            status: isLoggedIn ? 'success' : 'error',
            duration: 10000,
            isClosable: true,
        });
    }
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
                const { accessToken, refreshToken, userEmail, message } = response.data;
                console.log('response.data', response);

                if (response.status === 200) {
                    localStorage.setItem('accessToken', accessToken);
                    localStorage.setItem('refreshToken', refreshToken);
                    toastmessageBl(true, message)

                    dispatch(login(userEmail, accessToken, refreshToken));
                }
                else {
                    toastmessageBl(false, message)

                }

            } catch (error) {
                toastmessageBl(false, 'Failed to refresh token')

                console.error('Failed to refresh token', error);
                dispatch(logout()); // Logout if the refresh token fails
            }
        };
        checkTokens(); // Call the function to check tokens on mount

        // Automatically refresh the token every 4 minutes
        const intervalId = setInterval(checkTokens, 14 * 60 * 1000);

        // Cleanup on unmount
        return () => clearInterval(intervalId);
    }, [dispatch]);// eslint-disable-line react-hooks/exhaustive-deps
};

export default useAuth;