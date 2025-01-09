import Link from 'next/link';
import { AppBar, Toolbar, IconButton, Box, Typography, Menu, MenuItem } from '@mui/material';
import { Menu as MenuIcon, Home, Search, Info } from '@mui/icons-material';
import { useState } from 'react';

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #e0e0e0',
        color: '#2F85DF',
        boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)',
        padding: '0 24px',
      }}
    >
      <Toolbar>
        {/* Website Title */}
        <Typography variant="h5" fontWeight="bold" sx={{ flexGrow: 1 }}>
          <Link href="/" passHref>
          <Box
              component="a"
              sx={{
                textDecoration: 'underline',
                textDecorationColor: 'white', // Default underline color set to white
                color: '#2F85DF',
                '&:hover': {
                  textDecorationColor: '#FFFFFF', // Change underline color on hover
                },
              }}
            >
              Finrest 
            </Box>
          </Link>
        </Typography>

        {/* Menu Icon */}
        <Box>
          <IconButton
            edge="end"
            aria-label="menu"
            onClick={handleMenuOpen}
            sx={{
              color: '#2F85DF',
              '&:hover': {
                backgroundColor: 'rgba(47, 133, 223, 0.1)',
              },
            }}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            {/* Menu Items */}
            <MenuItem onClick={handleMenuClose}>
              <Link href="/" passHref>
                <Box
                component="a"
                sx={{
                    textDecoration: 'underline',
                    textDecorationColor: 'white', // Default underline color set to white
                    color: '#2F85DF',
                    '&:hover': {
                    textDecorationColor: '#FFFFFF', // Change underline color on hover
                    },
                }}
                >
                  <Home sx={{ marginRight: 1 }} /> Home
                </Box>
              </Link>
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
              <Link href="/search" passHref>
                <Box
                component="a"
                display="flex"
                alignItems="center"
                sx={{
                    textDecoration: 'underline',
                    textDecorationColor: 'white', // Default underline color set to white
                    color: '#2F85DF',
                    '&:hover': {
                    textDecorationColor: '#FFFFFF', // Change underline color on hover
                    },
                }}
                >
                  <Search sx={{ marginRight: 1 }} /> Search
                </Box>
              </Link>
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
              <Link href="/search?purpose=for-sale" passHref>
                <Box
                    component="a"
                    display="flex"
                    alignItems="center"
                    sx={{
                        textDecoration: 'underline',
                        textDecorationColor: 'white', // Default underline color set to white
                        color: '#2F85DF',
                        '&:hover': {
                        textDecorationColor: '#FFFFFF', // Change underline color on hover
                        },
                    }}
                    >
                  <Info sx={{ marginRight: 1 }} /> Buy Property
                </Box>
              </Link>
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
              <Link href="/search?purpose=for-rent" passHref>
              <Box
                component="a"
                display="flex"
                alignItems="center"
                sx={{
                    textDecoration: 'underline',
                    textDecorationColor: 'white', // Default underline color set to white
                    color: '#2F85DF',
                    '&:hover': {
                    textDecorationColor: '#FFFFFF', // Change underline color on hover
                    },
                }}
                >
                  <Info sx={{ marginRight: 1 }} /> Rent Property
                </Box>
              </Link>
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
