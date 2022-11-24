import { Button, Container } from '@mui/material';
import { useTranslation } from 'react-i18next';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate()
  return (
    <Container color="white">
      <img width="100%" src={require("../../assets/images/404Image.png")} alt="" />
      <Button sx={{ textTransform: 'none', mb: "1rem"}} size="large" startIcon={<HomeIcon />} onClick={() => navigate('/')} variant="contained" >Welcome page</Button>
    </Container>
  );
}

export default NotFoundPage;