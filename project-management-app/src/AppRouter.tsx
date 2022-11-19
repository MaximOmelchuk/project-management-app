import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { AuthForm } from './app/components/AuthForm/AuthForm';
import MainPage from './app/components/MainPage/MainPage';


const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/registration" element={<AuthForm />} />
      <Route path="/login" element={<MainPage />} />
      <Route path="/profile" element={<MainPage />} />
    </Routes>
  );
};

export default AppRouter;
