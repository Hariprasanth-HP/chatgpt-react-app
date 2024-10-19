import React, { useState } from 'react';
import { Box, Button, Flex, Heading, Input, Stack, Text, useToast } from '@chakra-ui/react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { login } from './store/auth/action';

const AuthForm = () => {
    const initialForm = { email: '', password: '' }
    const [isLogin, setIsLogin] = useState(true);
    const [form, setForm] = useState(structuredClone(initialForm));
    const toast = useToast();
    const dispatch = useDispatch();
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
    const handleLogin = async (form) => {
        try {
            const { email, password } = form
            const response = await axios.post('http://localhost:5000/login', { email, password });
            const { userEmail, accessToken, refreshToken } = response.data;
            // Dispatch the login action with userEmail data and tokens
            dispatch(login(userEmail, accessToken, refreshToken));
            toastmessage(true, 'Logged in')
        } catch (error) {
            console.error('Login failed:', error);
            toastmessage(false, 'Logged in')

            // Handle login error (e.g., show a message to the user)
        }
    };

    const handleSignup = async (form) => {
        try {
            const { email, password } = form
            const response = await axios.post('http://localhost:5000/signup', { email, password });
            const { userEmail, accessToken, refreshToken } = response.data;

            // Dispatch the login action with userEmail data and tokens
            dispatch(login(userEmail, accessToken, refreshToken));
            toastmessage(true, 'Signed in')
        } catch (error) {
            console.error('Login failed:', error);
            toastmessage(false, 'Signed in')

            // Handle login error (e.g., show a message to the user)
        }
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (isLogin) {
            handleLogin(form)
        }
        else {
            handleSignup(form)
        }
    };
    const toastmessage = (status, type) => {
        toast({
            title: status ? `${type} successfully!` : 'Something went wrong',
            status: status ? 'success' : 'error',
            duration: 2000,
            isClosable: true,
        });
    }
    return (
        <Flex
            minH="100vh"
            align="center"
            justify="center"
            bgGradient="linear(to-r, blue.400, purple.300)"
        >
            <Box
                maxW="md"
                w="full"
                bg="white"
                p={6}
                rounded="lg"
                boxShadow="lg"
            >
                <Heading textAlign="center" mb={6}>
                    {isLogin ? 'Login' : 'Sign Up'}
                </Heading>

                <form onSubmit={handleSubmit}>
                    <Stack spacing={4}>
                        <Input
                            type="email"
                            name="email"
                            placeholder="Email"
                            onChange={handleChange}
                            value={form.email}
                            focusBorderColor="blue.300"
                            isRequired
                        />
                        <Input
                            type="password"
                            name="password"
                            placeholder="Password"
                            onChange={handleChange}
                            value={form.password}
                            focusBorderColor="blue.300"
                            isRequired
                        />

                        <Button
                            type="submit"
                            colorScheme="blue"
                            size="lg"
                            mt={4}
                            w="full"
                        >
                            {isLogin ? 'Login' : 'Sign Up'}
                        </Button>

                        <Text textAlign="center" mt={4}>
                            {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
                            <Button
                                variant="link"
                                colorScheme="purple"
                                onClick={() => {
                                    setForm(initialForm)
                                    setIsLogin(!isLogin)
                                }}
                            >
                                {isLogin ? 'Sign Up' : 'Login'}
                            </Button>
                        </Text>
                    </Stack>
                </form>
            </Box>
        </Flex>
    );
};

export default AuthForm;
