import { Box, Button, Typography } from '@mui/material';

import PersonIcon from '@mui/icons-material/Person';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';
import { RegistrationText } from '../../components/AuthForm/content';
import { AuthForm } from "../../components/AuthForm/AuthForm";
import { useDeleteUserMutation, useEditUserMutation, useGetUserQuery } from "../../services/service";
import { selectStateApp, setFormEditUser, setMessageResponsive } from '../../store/reducers/commonSlice';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useEffect } from 'react';
import { Loader } from '../../components/Loader/Loader';
import { useNavigate } from 'react-router-dom';

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

export const EditUser = (): JSX.Element => {
  const idUser = localStorage.getItem("app_user_id") || '637ebbbc0fc27542f810966d';
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const { formEditUser } = useAppSelector(selectStateApp);

  const { data, isSuccess } = useGetUserQuery(idUser);
  const [editUser, resultEditUser] = useEditUserMutation();
  const [deleteUser, resultDeleteUser] = useDeleteUserMutation();

  useEffect(() => {
    if (isSuccess) {
      dispatch(setFormEditUser({ name: data?.name, login: data?.login }));
    }
  }, [data?.login, data?.name, dispatch, isSuccess]);

  useEffect(() => {
    if (resultEditUser.isSuccess) {
      dispatch(setMessageResponsive({ message: `Your profile has been successfully changed.`, type: 'success' }));
    } else {
      if (resultEditUser.isError) {
      const { data } = resultEditUser.error as IErrorResponse;
      dispatch(setMessageResponsive({message: data.message, type: 'error' }))
      }
    }
  }, [dispatch, navigate, resultEditUser.error, resultEditUser.isError, resultEditUser.isSuccess]);

  useEffect(() => {
    if (resultDeleteUser.isSuccess) {
      dispatch(setMessageResponsive({ message: `Your profile has been successfully deleted.`, type: 'success' }));
      localStorage.removeItem("app_user_id")
      navigate('/')
    } else {
      if (resultDeleteUser.isError) {
      const { data } = resultDeleteUser.error as IErrorResponse;
      dispatch(setMessageResponsive({message: data.message, type: 'error' }))
      }
    }
  }, [dispatch, navigate, resultDeleteUser.error, resultDeleteUser.isError, resultDeleteUser.isSuccess]);


  const changeUser = async (data: ISignInForm) => {
    await editUser({ name: data.name, login: data.login, password: data.password, id: idUser })
  }

  const deleteHandlerUser = async () => {
    await deleteUser({id: idUser});
  }

  return (
    <>
      {!isSuccess ? <Loader flag={true} /> : <Box sx={{
        maxWidth: "600px",
        margin: "0 auto",
        padding: "50px 10px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1.5rem"
      }}>
          <Box sx={{ display: "flex", flexWrap: 'wrap', justifyContent: 'center' }}>
            <Box>
              <PersonIcon sx={{ fontSize: "10rem" }} />
            </Box>
            <Box sx={{ display: "flex", justifyContent: 'center', flexDirection: "column", gap: "10px" }}>
              <Typography variant="body1">{`ИМЯ ${data?.name}`}</Typography>
              <Typography variant="body1">{`ЛОГИН ${data?.login}`} </Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', alignItems: "center", justifyContent: "center", gap: "10px" }}>
            <BorderColorIcon />
            <Typography>РЕДАКТИРОВАТЬ ПРОФИЛЬ</Typography>
          </Box>
          <AuthForm isAllValidate={true} serverRequest={changeUser} setState={setFormEditUser} contentForm={RegistrationText} stateForm={formEditUser} />
          <Button onClick={deleteHandlerUser} variant="contained" color='error' sx={{ marginTop: "1rem", padding: '10px' }}>
            <DeleteIcon />
            Удалить аккаунт
          </Button>
      </Box>}
    </>
  )
}
