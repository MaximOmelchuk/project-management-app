import { Container, Grid, List, ListItem, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import PersonCard from '../PersonCard/PersonCard';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useGetTasksOnSearchQuery } from '../../services/service';

const WelcomePage = () => {
  const { data } = useGetTasksOnSearchQuery('');
  console.log(data);

  const { t } = useTranslation();
  const cards = t('welcome.personCards', { returnObjects: true }) as Array<{ title: string, content: string }>;
  const advantagesList = t('welcome.advantagesList', { returnObjects: true }) as Array<string
  >;
  return (
    <Container>
      <Typography color='white' sx={{ padding: "1rem 0", fontWeight: 700, fontSize: { xs: '1.4rem', sm: '2rem' } }}>
        {t('welcome.title')}
      </Typography>
      <Grid container alignItems="center">
        <Grid item sm={6}>
          <Typography color='white' variant='h6'>{t('welcome.subTitle')}</Typography>
          <List>
            {advantagesList.map(
              (item, index) => (
                <ListItem key={index} sx={{ color: "rgb(211, 211, 211)" }}>
                  <CheckCircleOutlineIcon sx={{ paddingRight: "1rem" }} />
                  {item}
                </ListItem>
              )
            )}
          </List>
        </Grid>
        <Grid item sm={6}>
          <img width="100%" src={require("../../assets/Boards.png")} alt="" />
        </Grid>
      </Grid>
      <Grid container alignItems="center">
        <Grid item sm={6}>
          <img width="100%" src={require("../../assets/Boards2.png")} alt="" />
        </Grid>
        <Grid item sm={6}>
          <Typography color='white' paddingBottom="1rem" variant='h6'>{t('welcome.title2')}</Typography>
          <Typography color='rgb(211, 211, 211)' paddingBottom="1rem">{t('welcome.paragraph')}</Typography>
          <Typography color='rgb(211, 211, 211)' paddingBottom="1rem">{t('welcome.paragraph2')}</Typography>
        </Grid>
      </Grid>
      <Typography color='white' sx={{ padding: "1rem 0", fontWeight: 700, fontSize: { xs: '1.4rem', sm: '2rem' } }}>
        {t('welcome.teamTitle')}
      </Typography>
      <Grid container gap="2rem" justifyContent="space-evenly" paddingBottom="1rem">
        {cards.map(
          (item: { title: string; content?: string }) => (
            <PersonCard {...item} />
          )
        )}
      </Grid>
    </Container>
  );
}

export default WelcomePage;