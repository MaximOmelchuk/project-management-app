import { NavLink, useNavigate } from 'react-router-dom';

import { Box, Typography, Container } from '@mui/material';

import { AuthText } from '../../components/AuthForm/content';
import { AuthForm } from '../../components/AuthForm/AuthForm';
import { useSingInMutation } from '../../services/service';
import { setFormSignIn, selectStateApp, setMessageResponsive } from '../../store/reducers/commonSlice';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getToken } from '../../utils/tokenUtils';


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
  const { t } = useTranslation();
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
    if (getToken()) {
      navigate('/mainPage')
    }
    const defaultValue = {
      name: '',
      login: '',
    }
    if (resultSingIn.isSuccess) {
      dispatch(setFormSignIn(defaultValue));
      dispatch(setMessageResponsive({ message: `Hello ${user}`, type: 'success' }));
      navigate('/mainPage');
    } else {
      if (resultSingIn.isError) {
        const { data } = resultSingIn.error as IErrorResponse;
        dispatch(setMessageResponsive({ message: data.message, type: 'error' }))
      }
    }
  }, [dispatch, navigate, resultSingIn.error, resultSingIn.isSuccess, user]);

  const title = t('authorization.title');
  const subTitle = t('authorization.subTitle');
  const suggestion = t('authorization.suggestion');
  const suggestionButton = t('authorization.suggestionButton');

  return (
    <Container>
      <Box sx={{
        maxWidth: "600px",
        margin: "0 auto",
        padding: "50px 10px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1.5rem",
        color: '#fff',
      }}>
        <Typography variant="h4">{title}</Typography>
        <Typography variant="body1">{subTitle}</Typography>
        <AuthForm
          isAllValidate={false}
          serverRequest={login}
          setState={setFormSignIn}
          contentForm={"authorization"}
          stateForm={formSignIn} />
        <Box sx={{ display: "inline-flex", gap: "10px" }}>
          <Typography variant="body1">{suggestion}</Typography>
          <NavLink to='/sign-up'>
            {suggestionButton}
          </NavLink>
        </Box>
      </Box>
    </Container>
  )
}
