import * as React from 'react';
import { AppBar, Toolbar, Container, Box, Typography, IconButton, Avatar, Menu, MenuItem, Tooltip } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import ImgChef from '../imagens/chef.png'
import AdbIcon from '@mui/icons-material/Adb';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  MenuItemProfile: {
    '& .MuiPaper-root': {
      textAlign: 'center',
      display: 'flex',
      justifyContent: 'center',
      width: '6%',
    }
  }
}))

export default function ResponsiveAppBar() {

  const [setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const settings = ['Profile', 'Logout'];

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const currentDate = new Date().toLocaleDateString();
  const classes = useStyles();

  return (
    <AppBar>
      <Container>
        <Toolbar disableGutters>
          <LocalDiningIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, fontSize: 30 }} />
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit">
              <MenuIcon />
            </IconButton>

          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
          </Typography>
          <Box sx={{
            flexGrow: 1, display: {
              textAlign: 'center',
              display: 'flex',
              justifyContent: 'center'
            }
          }}>
            <Typography
              sx={{

              }}>
              OrderChef - {currentDate}
            </Typography>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="chef" src={ImgChef} />
              </IconButton>
            </Tooltip>

            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
              className={classes.MenuItemProfile}
            >
              {settings.map((setting) => (
                <MenuItem key={setting}
                  onClick={handleCloseUserMenu}
                >
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
