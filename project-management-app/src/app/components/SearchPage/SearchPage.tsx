import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { Box } from '@mui/system';
import Container from '@mui/material/Container';
import { Grid, Typography } from '@mui/material';

import { useAppSelector } from '../../hooks';
import Search from '../Search/Search';
import TaskCard from '../TaskItem/TaskItem';
import { getToken } from '../../utils/tokenUtils';
import { useGetTasksOnSearchQuery } from '../../services/service';
import { Loader } from '../Loader/Loader';

const SearchPage = () => {
  const searchString = useAppSelector((state) => state.common.searchString);
  const navigate = useNavigate();
  const { data, isFetching } = useGetTasksOnSearchQuery(searchString);

  if (!getToken()) {
    navigate('/');
  }

  const { t } = useTranslation();

  return (
    <Container color="white">
      <Typography color='white' sx={{ padding: "1rem 0", fontWeight: 700, fontSize: { xs: '1.4rem', sm: '2rem' } }}>
        {t('search.title')}
      </Typography>
      <Search />
      {isFetching ?
        <Box maxWidth="500px" margin="auto">
          <Loader isOpen={true} />
        </Box>
        :
        <Box>
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
              return <TaskCard {...task} key={task._id}></TaskCard>
            })
              :
              <Typography color='white' paddingBottom="1rem" variant='h6'>{t('search.searchError')}</Typography>
            }
          </Grid>
        </Box>
      }
    </Container>
  );
}

export default SearchPage;