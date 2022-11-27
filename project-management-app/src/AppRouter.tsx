import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { EditUser } from './app/views/EditUser/EditUser';
import MainPage from './app/components/MainPage/MainPage';
import { SignIn } from './app/views/signIn/SignIn';
import { SignUp } from './app/views/signUp/SignUp';
import BoardPage from './app/components/BoardPage/BoardPage';
import Layout from './app/components/Layout/Layout';
import NotFoundPage from './app/components/NotFounPage/NotFoundPage';
import SearchPage from './app/components/SearchPage/SearchPage';
import WelcomePage from './app/components/WelcomePage/WelcomePage';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<WelcomePage />} />
        <Route path="mainPage" element={<MainPage />} />
        <Route path="searchPage" element={<SearchPage />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route
          path="/boards/:boardId"
          element={<BoardPage />}
        />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/user-info" element={<EditUser />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
