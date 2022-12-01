import { useTranslation } from 'react-i18next';
import Container from '@mui/material/Container';
import { useGetTasksOnSearchQuery } from '../../services/service';
import Search from '../Search/Search';
import { useAppSelector } from '../../hooks';
import { Grid, Typography } from '@mui/material';
import TaskCard from '../TaskItem/TaskItem';

const SearchPage = () => {
  const searchString = useAppSelector((state) => state.common.searchString);

  const { data } = useGetTasksOnSearchQuery(searchString);

  const { t } = useTranslation();
  return (
    <Container color="white">
      <Typography color='white' sx={{ padding: "1rem 0", fontWeight: 700, fontSize: { xs: '1.4rem', sm: '2rem' } }}>
        {t('search.title')}
      </Typography>
      <Search />
      {(data && data.length !== 0) && <Typography color='white' paddingTop="1rem" variant='h6'>{t('search.tasksHeading')}</Typography>}
      <Grid
        container
        sx={{
          mt: 2,
          mb: 2,
          gap: 2,
          justifyContent: "center",
          flexWrap: "wrap",
          width: "100%",
        }}
      >
        {(data && data.length !== 0) ? data.map((task) => {
          return <TaskCard {...task}></TaskCard>
        })
          :
          <Typography color='white' paddingBottom="1rem" variant='h6'>{t('search.searchError')}</Typography>
        }
      </Grid>
    </Container>
  );
}

export default SearchPage;