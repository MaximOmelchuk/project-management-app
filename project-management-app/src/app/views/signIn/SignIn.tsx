import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink, useNavigate } from 'react-router-dom';

import { Box, Typography, Container } from '@mui/material';

import { useSingInMutation } from '../../services/service';
import { setFormSignIn, selectStateApp } from '../../store/reducers/commonSlice';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getToken } from '../../utils/tokenUtils';

import { ISignInForm } from '../../utils/interfaces';

import { AuthForm } from '../../components/AuthForm/AuthForm';

export const SignIn = (): JSX.Element => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { formSignIn } = useAppSelector(selectStateApp);

  const [singIn, resultSingIn] = useSingInMutation();

  const login = async (data: ISignInForm): Promise<void> => {
    await singIn({ login: data.login, password: data.password });
  };

  useEffect(() => {
    if (getToken()) {
      navigate("/mainPage");
    }
    const defaultValue = {
      name: "",
      login: "",
    };
    if (resultSingIn.isSuccess) {
      dispatch(setFormSignIn(defaultValue));
      navigate('/mainPage');
    }
  }, [dispatch, navigate, resultSingIn.isSuccess]);

  const title = t("authorization.title");
  const subTitle = t("authorization.subTitle");
  const suggestion = t("authorization.suggestion");
  const suggestionButton = t("authorization.suggestionButton");

  return (
    <Container>
      <Box
        sx={{
          maxWidth: "600px",
          margin: "0 auto",
          padding: "50px 10px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1.5rem",
          color: "#fff",
        }}
      >
        <Typography variant="h4">{title}</Typography>
        <Typography variant="body1">{subTitle}</Typography>
        <AuthForm
          isAllValidate={false}
          serverRequest={login}
          setState={setFormSignIn}
          contentForm={"authorization"}
          stateForm={formSignIn}
        />
        <Box sx={{ display: "inline-flex", gap: "10px" }}>
          <Typography variant="body1">{suggestion}</Typography>
          <NavLink className={'sign-in-link'} to='/sign-up'>
            {suggestionButton}
          </NavLink>
        </Box>
      </Box>
    </Container>
  );
};
