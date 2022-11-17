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
import MarginIcon from '@mui/icons-material/Margin';
import AddchartIcon from '@mui/icons-material/Addchart';
import { useTranslation } from 'react-i18next';
import ChangeLang from '../ChangeLang/ChangeLang';
import { useNavigate } from 'react-router-dom';
import ButtonWithIcon from '../ButtonWithIcon/ButtonWithIcon';
import ScrollToColor from '../ScrollToColor/ScrollToColor';
import { useAppSelector } from '../../hooks';
import { Button } from '@mui/material';

function Header() {
  const navigate = useNavigate();
  const { isAuth } = useAppSelector((state) => state.common);

  const { t } = useTranslation();
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const linkItems = {
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
    },
    mainPage: {
      text: t('header.mainPage'),
      Icon: MarginIcon,
    },
    addBoard: {
      text: t('header.addBoard'),
      Icon: AddchartIcon,
    },
  }

  return (
    <ScrollToColor>
      <AppBar position="sticky">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Button id="basic-button" color="inherit"
              onClick={isAuth ? () => navigate('/mainPage') : () => navigate('/')}
            >
              <ViewKanbanIcon sx={{ mr: 1 }} />
              <Typography
                variant="h6"
                noWrap
                component="span"
                sx={{
                  mr: 2,
                  display: 'inline-flex',
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.2rem',
                  color: 'inherit',
                }}
              >
                {t('header.title')}
              </Typography>
            </Button>
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
                {isAuth ? <>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <ButtonWithIcon {...linkItems.mainPage} />
                  </MenuItem>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <ButtonWithIcon {...linkItems.addBoard} />
                  </MenuItem>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <ButtonWithIcon {...linkItems.singOut} />
                  </MenuItem>
                </> :
                  <>
                    <MenuItem onClick={handleCloseNavMenu}>
                      <ButtonWithIcon {...linkItems.singIn} />
                    </MenuItem>
                    <MenuItem onClick={handleCloseNavMenu}>
                      <ButtonWithIcon {...linkItems.singUp} />
                    </MenuItem>
                  </>
                }
              </Menu>
            </Box>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-end' }}>
              {isAuth ? <>
                <ButtonWithIcon {...linkItems.mainPage} />
                <ButtonWithIcon {...linkItems.addBoard} />
                <ButtonWithIcon {...linkItems.singOut} />
              </> :
                <>
                  <ButtonWithIcon {...linkItems.singIn} />
                  <ButtonWithIcon {...linkItems.singUp} />
                </>
              }
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
