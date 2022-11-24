import { NavLink, useNavigate } from 'react-router-dom';

import { Box, Typography } from '@mui/material';

import { AuthText } from '../../components/AuthForm/content';
import { AuthForm } from '../../components/AuthForm/AuthForm';
import { useSingInMutation } from '../../services/service';
import { setFormSignIn, selectStateApp, setMessageResponsive } from '../../store/reducers/commonSlice';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useEffect, useState } from 'react';


interface IErrorResponse {
  status: number,
  data: {
    statusCode: number,
    message: string
  }
}


interface ISignInForm {
  name: string;
  login: string;
  password: string;
}

export const SignIn = (): JSX.Element => {
  const [user, setUser] = useState('')
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { formSignIn } = useAppSelector(selectStateApp);

  const [singIn, resultSingIn] = useSingInMutation();

  const login = async (data: ISignInForm): Promise<void> => {
    setUser(data.login);
    await singIn({ login: data.login, password: data.password });
  }

  useEffect(() => {
    const defaultValue = {
      name: '',
      login: '',
    }
    if (resultSingIn.isSuccess) {
      dispatch(setFormSignIn(defaultValue));
      dispatch(setMessageResponsive({ message: `Hello ${user}`, type: 'success' }));
      navigate('/');
    } else {
      if (resultSingIn.isError) {
      const { data } = resultSingIn.error as IErrorResponse;
      dispatch(setMessageResponsive({message: data.message, type: 'error' }))
      }
    }
  }, [dispatch, navigate, resultSingIn.error, resultSingIn.isSuccess, user]);

  const title = AuthText.en.title;
  const subTitle = AuthText.en.subTitle;
  const suggestion = AuthText.en.suggestion;
  const suggestionButton = AuthText.en.suggestionButton;

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
      <AuthForm isAllValidate={false} serverRequest={login} setState={setFormSignIn} contentForm={AuthText} stateForm={formSignIn}></AuthForm>
      <Box sx={{ display: "inline-flex", gap: "10px" }}>
        <Typography variant="body1">{suggestion}</Typography>
        <NavLink to='/sign-in'>
          {suggestionButton}
        </NavLink>
      </Box>
    </Box>
  )
}
