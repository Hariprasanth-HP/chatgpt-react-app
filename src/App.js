import React, { useEffect } from 'react';
import AuthForm from './AuthForm';
import ContentGenerator from './ChatGPT';
import { useSelector } from 'react-redux';
import useAuth from './useAuth';
import { useToast } from '@chakra-ui/react';

const App = () => {
  const { isLoggedIn } = useSelector(state => state.user)
  const toast = useToast();
  const { toastmessage } = useAuth()
  const toastmessageBl = (type) => {
    toast({
      title: type,
      status: isLoggedIn ? 'success' : 'error',
      duration: 10000,
      isClosable: true,
    });
  }
  useEffect(() => {
    if(toastmessage&&toastmessage!==''){
      toastmessageBl(toastmessage)
    }
  }, [toastmessage])
  return (
    <>
      {
        isLoggedIn ?
          <ContentGenerator />
          : <AuthForm />
      }


    </>
  );
};

export default App;
