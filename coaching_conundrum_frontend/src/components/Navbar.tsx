import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { useEffect } from 'react';
import axios from 'axios'




export default function Navbar() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  
  const [userFullName, setUserFullName] = React.useState<string>("");

  useEffect(() => {
    if (localStorage.getItem('user') == null)
    {
        logInAs("basketball_coach")
    } else {
        const userData = JSON.parse(localStorage.getItem('user'))

        setUserFullName(userData.full_name);
    }
  }, []);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logInAs = (userType) => {
    const userTypes = ["basketball_coach", "life_coach", "test_user_1", "test_user_2"]

    if (userTypes.includes(userType))
    {
        const baseURL = "http://localhost:3001/api/v1"

        axios.post(`${baseURL}/users`, { user: { user_type: userType } })
            .then((response) => {
                localStorage.setItem('user', JSON.stringify(response.data.user))

                setUserFullName(response.data.user.full_name)

                window.dispatchEvent(new Event("storage"));
             }
        )
    }
  }

  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Typography sx={{ minWidth: 100 }}>Coaching Conundrum</Typography>

        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
          </IconButton>
        </Tooltip>

          <Typography sx={{ minWidth: 100 }}>Signed In As: { userFullName } </Typography>

      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&::before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={() => logInAs('basketball_coach')}>
          <Avatar /> Sign In As Basketball Coach
        </MenuItem>
        <MenuItem onClick={() => logInAs('life_coach')}>
          <Avatar /> Sign In As Life Coach
        </MenuItem>
        <MenuItem onClick={() => logInAs("test_user_1")}>
          <Avatar /> Sign In As First Test User
        </MenuItem>
        <MenuItem onClick={() => logInAs("test_user_2")}>
          <Avatar /> Sign In As Second Test User
        </MenuItem>
      </Menu>

    </React.Fragment>
  );
}