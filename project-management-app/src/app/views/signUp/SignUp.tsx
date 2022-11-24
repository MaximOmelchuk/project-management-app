import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import { Box, Typography } from '@mui/material';

import { RegistrationText } from '../../components/AuthForm/content';
import { AuthForm } from '../../components/AuthForm/AuthForm';
import { useSingUpMutation, useSingInMutation } from '../../services/service';
import { selectStateApp, setFormSignUp, setMessageResponsive } from '../../store/reducers/commonSlice';
import { useAppDispatch, useAppSelector } from '../../hooks';

interface ISignInForm {
  name: string;
  login: string;
  password: string;
}

interface IErrorResponse {
  status: number,
  data: {
    statusCode: number,
    message: string
  }
}

export const SignUp = (): JSX.Element => {
  const { formSignUp } = useAppSelector(selectStateApp);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [singUp, resultSingUp] = useSingUpMutation();
  const [singIn, resultSingIn] = useSingInMutation();
  const [user, setUser] = useState('')

  const login = async (data: ISignInForm) => {
    await singUp({ name: data.name, login: data.login, password: data.password });
    await singIn({ login: data.login, password: data.password });
    setUser(data.login);
  }


  useEffect(() => {
    const defaultValue = {
      name: '',
      login: '',
    }
    if (resultSingUp.isSuccess && resultSingIn.isSuccess) {
      dispatch(setFormSignUp(defaultValue));
      dispatch(setMessageResponsive({ message: `Hello ${user}`, type: 'success'}));
      navigate('/');
    } else {
      if (resultSingUp.isError) {
        const { data } = resultSingUp.error as IErrorResponse;
        dispatch(setMessageResponsive({message: data.message, type: 'error' }));
      }
    }
  }, [dispatch, navigate, resultSingIn, resultSingIn.isSuccess, resultSingUp, resultSingUp.isSuccess, user]);



  const title = RegistrationText.en.title;
  const subTitle = RegistrationText.en.subTitle;
  const suggestion = RegistrationText.en.suggestion;
  const suggestionButton = RegistrationText.en.suggestionButton;

  return (
    <Box sx={{
      maxWidth: "600px",
      margin: "0 auto",
      padding: "50px 10px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "1.5rem"
    }}>
      <Typography variant="h4">{title}</Typography>
      <Typography variant="body1">{subTitle}</Typography>
      <AuthForm isAllValidate={true} serverRequest={login} setState={setFormSignUp} contentForm={RegistrationText} stateForm={formSignUp} />
      <Box sx={{ display: "inline-flex", gap: "10px" }}>
        <Typography variant="body1">{suggestion}</Typography>
        <NavLink to='/sign-in'>
          {suggestionButton}
        </NavLink>
      </Box>
    </Box>
  )
}
