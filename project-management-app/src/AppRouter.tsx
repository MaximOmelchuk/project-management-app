import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { EditUser } from './app/views/EditUser/EditUser';
import MainPage from './app/components/MainPage/MainPage';
import { SignIn } from './app/views/signIn/SignIn';
import { SignUp } from './app/views/signUp/SignUp';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/user-info" element={<EditUser />} />
    </Routes>
  );
};

export default AppRouter;
