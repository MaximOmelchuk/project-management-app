import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';
import ViewKanbanIcon from '@mui/icons-material/ViewKanban';
import { useTranslation } from 'react-i18next';
import ChangeLang from '../ChangeLang/ChangeLang';
import { useNavigate } from 'react-router-dom';
import ButtonWithIcon from '../ButtonWithIcon/ButtonWithIcon';
import { Slide, useScrollTrigger } from '@mui/material';
import ScrollToColor from '../ScrollToColor/ScrollToColor';

function Header() {
  // const navigate = useNavigate();
  const { t } = useTranslation();
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const pagesWithAuth = {

  }
  const pagesWithoutAuth = {
    singIn: {
      text: t('header.singIn'),
      Icon: LoginIcon,
    },
    singOut: {
      text: t('header.singOut'),
      Icon: LogoutIcon,
    },
    singUp: {
      text: t('header.singUp'),
      Icon: AppRegistrationIcon,
    }
  }

  return (
    <ScrollToColor>
      <AppBar position="sticky">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <ViewKanbanIcon sx={{ mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: 'inline-flex',
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.2rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              {t('header.title')}
            </Typography>

            <Box sx={{ display: { xs: 'flex', md: 'none' }, justifyContent: 'flex-end', order: 2 }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                <MenuItem onClick={handleCloseNavMenu}>
                  <ButtonWithIcon {...pagesWithoutAuth.singIn} />
                </MenuItem>
                <MenuItem onClick={handleCloseNavMenu}>
                  <ButtonWithIcon {...pagesWithoutAuth.singUp} />
                </MenuItem>
              </Menu>
            </Box>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-end' }}>
              <ButtonWithIcon {...pagesWithoutAuth.singIn} />
              <ButtonWithIcon {...pagesWithoutAuth.singUp} />
            </Box>
            <Box sx={{ display: 'flex', flexGrow: { xs: 1, md: 0 }, justifyContent: 'flex-end' }}>
              <ChangeLang />
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </ScrollToColor>
  );
}
export default Header;
