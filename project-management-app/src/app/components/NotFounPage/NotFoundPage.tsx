import { Container, Grid, List, ListItem, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import ButtonWithIcon from '../ButtonWithIcon/ButtonWithIcon';
import HomeIcon from '@mui/icons-material/Home';

const NotFoundPage = () => {
  const { t } = useTranslation();
  return (
    <Container color="white">
      <img width="100%" src={require("../../assets/404Image.png")} alt="" />
      <ButtonWithIcon text="Welcome page" styleProps={{ color: "white", backgroundColor: "#1976d2" }} Icon={HomeIcon}></ButtonWithIcon>
    </Container>
  );
}

export default NotFoundPage;