import React, { ChangeEvent, FormEvent, useState } from 'react';
import { changeSearchString } from '../../store/reducers/commonSlice';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { Box, Button, Container, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';

const Search = () => {
  const searchString = useAppSelector((state) => state.common.searchString);
  const [searchValue, setSearchValue] = useState(searchString);
  const dispatch = useAppDispatch();

  const { t } = useTranslation();

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(changeSearchString(searchValue));
    localStorage.setItem('search', searchValue);
    console.log('d')
  };

  return (
    <Container sx={{ display: 'flex', justifyContent: 'center' }}>
      <Box sx={{
        width: "100%",
        maxWidth: "600px",
        borderRadius: "1rem",
        padding: "40px 30px",
        backgroundColor: "white"
      }}>

        <form onSubmit={onSubmit}>
          <Box sx={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}>
            <TextField
              type="text"
              placeholder={t('search.title') as string}
              label={t('search.label')}
              autoComplete="off"
              value={searchValue}
              onChange={onChange}
            />
            <Button variant="contained" type="submit" sx={{ marginTop: "1rem", padding: '10px' }}>
              search
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default Search;
