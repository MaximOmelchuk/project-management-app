import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink, useNavigate } from 'react-router-dom';

import { Box, Typography, Container } from '@mui/material';

import { useSingUpMutation, useSingInMutation } from '../../services/service';
import { selectStateApp, setFormSignUp } from '../../store/reducers/commonSlice';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getToken } from '../../utils/tokenUtils';

import { ISignInForm, ISingUpError } from '../../utils/interfaces';

import { AuthForm } from '../../components/AuthForm/AuthForm';

export const SignUp = (): JSX.Element => {
  const { t } = useTranslation();
  const { formSignUp } = useAppSelector(selectStateApp);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [singUp, resultSingUp] = useSingUpMutation();
  const [singIn, resultSingIn] = useSingInMutation();

  const login = async (data: ISignInForm) => {
    const response = await singUp({ name: data.name, login: data.login, password: data.password }) as ISingUpError;
    if (!response?.error) {
      await singIn({ login: data.login, password: data.password });
    }
  }

  useEffect(() => {
    if (getToken()) {
      navigate('/mainPage')
    }
    const defaultValue = {
      name: '',
      login: '',
    }
    if (resultSingUp.isSuccess && resultSingIn.isSuccess) {
      dispatch(setFormSignUp(defaultValue));
      navigate('/mainPage');
    }
  }, [dispatch, navigate, resultSingIn.isSuccess, resultSingUp.isSuccess]);

  const title = t('registration.title');
  const subTitle = t('registration.subTitle');
  const suggestion = t('registration.suggestion');
  const suggestionButton = t('registration.suggestionButton');

  return (
    <Container>
      <Box sx={{
        maxWidth: "600px",
        margin: "0 auto",
        padding: "50px 10px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "1.5rem",
        color: '#fff',
      }}>
        <Typography variant="h4">{title}</Typography>
        <Typography variant="body1">{subTitle}</Typography>
        <AuthForm isAllValidate={true} serverRequest={login} setState={setFormSignUp} contentForm={'registration'} stateForm={formSignUp} />
        <Box sx={{ display: "inline-flex", gap: "10px" }}>
          <Typography variant="body1">{suggestion}</Typography>
          <NavLink to='/sign-in'>
            {suggestionButton}
          </NavLink>
        </Box>
      </Box>
    </Container>
  )
}
