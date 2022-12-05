import React from 'react';
import { useTranslation } from 'react-i18next';

import {
  Button, Menu, MenuItem,
} from '@mui/material';

import { Lang, LangSelectText } from '../../constants/translation';

const ChangeLang = () => {
  const { i18n } = useTranslation();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(null);
  };

  const handleClickLang = (e: React.MouseEvent<HTMLLIElement>) => {
    setAnchorEl(null);
    const lang = e.currentTarget.textContent === LangSelectText.en ? Lang.en : Lang.ru;
    i18n.changeLanguage(lang);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        color="inherit"
        onClick={handleClick}
      >
        {i18n.resolvedLanguage}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClickLang}>{LangSelectText.en}</MenuItem>
        <MenuItem onClick={handleClickLang}>{LangSelectText.ru}</MenuItem>
      </Menu>
    </div>
  );
};

export default ChangeLang;
