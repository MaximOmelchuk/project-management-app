import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { Button, Container } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';

import { getToken } from '../../utils/tokenUtils';

const NotFoundPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const navHandler = () => {
    const token = getToken();
    if (token) {
      navigate('/mainPage');
    } else {
      navigate('/');
    }
  }

  return (
    <Container color="white">
      <img width="100%" src={require("../../assets/images/404Image.png")} alt="" />
      <Button sx={{ textTransform: 'none', mb: "1rem" }} size="large" startIcon={<HomeIcon />} onClick={navHandler} variant="contained" >{t('header.mainPage')}</Button>
    </Container>
  );
}

export default NotFoundPage;