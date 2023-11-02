import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import Logo from '../assets/logo.png'
import LoginModal from './LoginModal';

const pages = ['Products', 'Pricing', 'Blog'];

function NavBar() {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [modalLoginOpen, setModalLoginOpen] = React.useState(false)

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    return (
        <AppBar sx={{
            backgroundColor: '#1DE788',
            color: 'black',
        }} position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>


                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
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
                            <MenuItem key='login' onClick={handleCloseNavMenu}>
                                <Typography textAlign="center" onClick={() => setModalLoginOpen(true)}>Iniciar Sesión</Typography>
                            </MenuItem>
                        </Menu>
                    </Box>

                    <img src={Logo} alt="LOGO" width={60} height={60} sx={{ ml: 'auto', display: { xs: 'flex', md: 'none' } }} />

                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'white',
                            textDecoration: 'none',
                        }}
                    >
                        RentaSale
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        <Button
                            key='login'
                            onClick={() => setModalLoginOpen(true)}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            Iniciar Sesión
                        </Button>
                    </Box>

                    <img src={Logo} alt="LOGO" width={60} height={60} sx={{ ml: 'auto', display: { xs: 'flex', md: 'none' } }} />
                </Toolbar>

                <LoginModal isOpen={modalLoginOpen} onClose={() => setModalLoginOpen(false)} />
            </Container>
        </AppBar>
    );
}

export default NavBar;
