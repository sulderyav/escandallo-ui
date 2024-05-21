import { useContext, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Avatar,
  Box,
  Button,
  Divider,
  MenuList,
  alpha,
  IconButton,
  MenuItem,
  Popover,
  Typography,
  styled,
  FormControlLabel,
  Switch,
  ListItem,
  ListItemIcon,
  ListItemText,
  CircularProgress,
} from '@mui/material';
import LockOpenTwoToneIcon from '@mui/icons-material/LockOpenTwoTone';
import CloudUploadTwoToneIcon from '@mui/icons-material/CloudUploadTwoTone';
import { useSnackbar } from 'notistack';

import useAuth from 'src/hooks/useAuth';

import { ThemeContext } from 'src/theme/ThemeProvider';
import { parseJobTitleIntoJob } from 'src/utils/convertions';
import { useApiAuth } from 'src/hooks';
import { parseRoleName } from 'src/utils/types';

const ListItemIconWrapper = styled(ListItemIcon)(
  ({ theme }) => `
        min-width: 36px;
        color: ${theme.colors.primary.light};
`
);

const Input = styled('input')({
  display: 'none',
});

const UserBoxButton = styled(IconButton)(
  ({ theme }) => `
  // width: ${theme.spacing(4)};
  padding: 0;
  // height: ${theme.spacing(4)};
  margin-left: ${theme.spacing(1)};
  border-radius: ${theme.general.borderRadiusLg};
  
  // &:hover {
  //   background: ${theme.colors.primary.main};
  // }
`
);

const MenuListWrapperPrimary = styled(MenuList)(
  ({ theme }) => `
  padding: ${theme.spacing(2)};

  & .MuiMenuItem-root {
      border-radius: 50px;
      padding: ${theme.spacing(1, 1, 1, 2.5)};
      min-width: 200px;
      margin-bottom: 2px;
      position: relative;
      color: ${theme.colors.alpha.black[100]};

      &.Mui-selected,
      &:hover,
      &.MuiButtonBase-root:active {
          background: ${theme.colors.primary.lighter};
          color: ${theme.colors.primary.main};
      }

      &:last-child {
          margin-bottom: 0;
      }
    }
`
);

const MenuUserBox = styled(Box)(
  ({ theme }) => `
        // background: ${alpha(theme.colors.alpha.black[100], 0.08)};
        padding: ${theme.spacing(2)};
`
);

const UserBoxText = styled(Box)(
  ({ theme }) => `
        text-align: left;
        padding-left: ${theme.spacing(1)};
`
);

const UserBoxLabel = styled(Typography)(
  ({ theme }) => `
        font-weight: ${theme.typography.fontWeightBold};
        color: ${theme.palette.secondary.main};
        display: block;
`
);

const UserBoxDescription = styled(Typography)(
  ({ theme }) => `
        color: ${theme.palette.secondary.light}
`
);

function HeaderUserbox() {
  const setThemeName = useContext(ThemeContext);
  const curThemeName = localStorage.getItem('appTheme') || 'PureLightTheme';
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const ref = useRef<any>(null);
  const [isOpen, setOpen] = useState<boolean>(false);
  const { enqueueSnackbar } = useSnackbar();
  const { post, put } = useApiAuth();
  const [updatingAvatar, setUpdatingAvatar] = useState<boolean>(false);

  const handleOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  const handleLogout = async (): Promise<void> => {
    try {
      handleClose();
      logout();
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  };

  const [theme, setTheme] = useState(curThemeName);

  const changeTheme = (): void => {
    const themeName =
      theme === 'PureLightTheme' ? 'NebulaFighterTheme' : 'PureLightTheme';
    setTheme(themeName);
    setThemeName(themeName);
  };

  const handleAvatarChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setUpdatingAvatar(true);
    const file = event.target.files[0];

    if (!file) {
      setUpdatingAvatar(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append('file', file);
      const url = await post<string>('uploads/user/avatars', formData);

      await put('system-users/my-profile', {
        avatar: url,
      });

      enqueueSnackbar('Imagen actualizada, por favor refresque la página.', {
        variant: 'success',
      });
    } catch (error) {
      console.error(error);
    } finally {
      setUpdatingAvatar(false);
    }
  };

  return (
    <>
      <UserBoxButton onClick={handleOpen}>
        <MenuUserBox
          sx={{
            minWidth: 210,
          }}
          display="flex"
        >
          <Avatar variant="rounded" alt={user.fullName} src={user.avatar} />
          <UserBoxText>
            <UserBoxLabel variant="body1">{user.fullName}</UserBoxLabel>
            <UserBoxDescription variant="body2">
              {parseRoleName(user.roles[0].name)}
            </UserBoxDescription>
          </UserBoxText>
        </MenuUserBox>
      </UserBoxButton>
      <Popover
        disableScrollLock
        anchorEl={ref.current}
        onClose={handleClose}
        open={isOpen}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuUserBox
          sx={{
            minWidth: 210,
          }}
          display="flex"
        >
          <Avatar variant="rounded" alt={user.fullName} src={user.avatar} />
          <UserBoxText>
            <UserBoxLabel variant="body1">{user.fullName}</UserBoxLabel>
            <UserBoxDescription variant="body2">
              {parseRoleName(user.roles[0].name)}
            </UserBoxDescription>
          </UserBoxText>
        </MenuUserBox>
        <Divider
          sx={{
            mb: 0,
          }}
        />
        <MenuListWrapperPrimary disablePadding>
          <MenuItem>
            <FormControlLabel
              control={
                <Switch
                  checked={theme === 'PureLightTheme' ? false : true}
                  onChange={changeTheme}
                />
              }
              label="Modo Oscuro"
            />
          </MenuItem>
          {/* <ButtonUploadWrapper> */}
          <ListItem
            button
            onClick={() => {
              // handleDrawerToggle();
              // setOpen(true);
            }}
          >
            <Input
              accept="image/*"
              id="icon-button-file"
              name="icon-button-file"
              type="file"
              onChange={handleAvatarChange}
            />
            <label
              htmlFor="icon-button-file"
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <ListItemIconWrapper>
                {updatingAvatar ? (
                  <CircularProgress size={24} />
                ) : (
                  <CloudUploadTwoToneIcon />
                )}
              </ListItemIconWrapper>
              <ListItemText
                primary="Editar Foto Perfil"
                primaryTypographyProps={{ variant: 'h5' }}
              />
            </label>
          </ListItem>
          {/* </ButtonUploadWrapper> */}
        </MenuListWrapperPrimary>
        <Divider />
        <Box m={1}>
          <Button color="primary" fullWidth onClick={handleLogout}>
            <LockOpenTwoToneIcon
              sx={{
                mr: 1,
              }}
            />
            Salir
          </Button>
        </Box>
      </Popover>
    </>
  );
}

export default HeaderUserbox;
