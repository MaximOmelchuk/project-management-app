import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { Box, Button, Container, Typography } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';

import { useDeleteUserMutation, useEditUserMutation, useGetUserQuery } from "../../services/service";
import { selectStateApp, setFormEditUser } from '../../store/reducers/commonSlice';
import { useAppDispatch, useAppSelector } from '../../hooks';

import { ISignInForm } from '../../utils/interfaces';

import { AuthForm } from "../../components/AuthForm/AuthForm";
import { Loader } from '../../components/Loader/Loader';
import ConfirmModal from '../../components/ConfirmModal/ConfirmModal';
import { getToken } from '../../utils/tokenUtils';

export const EditUser = (): JSX.Element => {
  const idUser = localStorage.getItem("app_user_id");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t } = useTranslation();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { formEditUser } = useAppSelector(selectStateApp);

  const { data, isSuccess, isLoading } = useGetUserQuery(idUser);
  const [editUser] = useEditUserMutation();
  const [deleteUser, resultDeleteUser] = useDeleteUserMutation();

  useEffect(() => {
    if (isSuccess) {
      dispatch(setFormEditUser({ name: data?.name, login: data?.login }));
    }
  }, [data?.login, data?.name, dispatch, isSuccess]);

  useEffect(() => {
    if (resultDeleteUser.isSuccess) {
      localStorage.removeItem("app_access_token")
      navigate('/')
    }
  }, [dispatch, navigate, resultDeleteUser.isSuccess]);

  const changeUser = async (data: ISignInForm) => {
    await editUser({
      body: { name: data.name, login: data.login, password: data.password },
      id: idUser,
    })
  }

  const deleteHandlerUser = async () => {
    await deleteUser({ id: idUser });
  }

  const modalHandler = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <Container>
      {isLoading ? <Loader isOpen={true} /> : <Box sx={{
        maxWidth: "600px",
        margin: "0 auto",
        padding: "50px 10px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1.5rem",
        color: '#fff'
      }}>
        <Box sx={{ display: "flex", flexWrap: 'wrap', justifyContent: 'center' }}>
          <Box>
            <PersonIcon sx={{ fontSize: "10rem" }} />
          </Box>
          <Box sx={{ display: "flex", justifyContent: 'center', flexDirection: "column", gap: "10px" }}>
            <Typography variant="body1">{`${t('editUser.name')}: ${data?.name}`}</Typography>
            <Typography variant="body1">{`${t('editUser.login')}: ${data?.login}`}</Typography>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', alignItems: "center", justifyContent: "center", gap: "10px" }}>
          <BorderColorIcon />
          <Typography>{t('editUser.title')}</Typography>
        </Box>
        {formEditUser && <AuthForm isAllValidate={true} serverRequest={changeUser} setState={setFormEditUser} contentForm={'editUser'} stateForm={formEditUser} />}
        <Button onClick={modalHandler} variant="contained" color='error' sx={{ marginTop: "1rem", padding: '10px' }}>
          <DeleteIcon />
          {t('editUser.delete')}
        </Button>
        {isModalOpen && (
          <ConfirmModal
            content={t('editUser.modalContent')}
            confirmHandler={deleteHandlerUser}
            closeHandler={modalHandler}
          />
        )}
      </Box>}
    </Container>
  )
}
