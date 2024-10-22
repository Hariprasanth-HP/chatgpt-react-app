import React from 'react';
import AuthForm from './AuthForm';
import ContentGenerator from './ChatGPT';
import { useSelector } from 'react-redux';
import useAuth from './useAuth';

const App = () => {
  const { isLoggedIn } = useSelector(state => state.user)
 useAuth()
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
