import React, { FC, useState } from 'react';
import { createStyles, makeStyles } from '@mui/styles';
import { Theme, useTheme } from '@mui/material/styles';
import {
  InputAdornment,
  TextField,
  IconButton,
  Pagination,
  Box,
  Stack,
  MenuItem,
  Typography,
  Button,
  CircularProgress,
  Alert,
  Drawer,
  Card,
} from '@mui/material';
import { Edit, Search, ZoomIn } from '@mui/icons-material';
import { GridColDef, GridLocaleText } from '@mui/x-data-grid';
import { useLocation, useNavigate } from 'react-router-dom';
import { Grid, Snackbar, styled, Avatar, alpha, lighten } from '@mui/material';
import { Route, Routes, useMatch } from 'react-router-dom';
import MenuTwoToneIcon from '@mui/icons-material/MenuTwoTone';
import ArrowBackTwoToneIcon from '@mui/icons-material/ArrowBackTwoTone';

import Scrollbar from '../../../../Scrollbar';
import Sidebar from './Sidebar';
import Footer from '../../../../Footer';
import { LayoutProps } from '../common';
import MainSection from './MainSection';
import AdditionalInfoSection from './AdditionalInfoSection';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrapper: {
      margin: theme.spacing(1),
      position: 'relative',
    },
    buttonProgress: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      marginTop: -12,
      marginLeft: -12,
    },
  })
);

const MainContentWrapper = styled(Box)(
  () => `
  flex-grow: 1;
`
);

const RootWrapper = styled(Box)(
  () => `
    flex: 1;
`
);

const DrawerWrapper = styled(Drawer)(
  ({ theme }) => `
    width: 400px;
    flex-shrink: 0;
    z-index: 3;

    & > .MuiPaper-root {
        width: 400px;
        height: calc(100% - ${theme.header.height});
        position: absolute;
        top: ${theme.header.height};
        right: 0;
        z-index: 3;
        background: ${theme.colors.alpha.white[10]};
    }
`
);

const DrawerWrapperMobile = styled(Drawer)(
  ({ theme }) => `
    width: 360px;
    flex-shrink: 0;

  & > .MuiPaper-root {
        width: 360px;
        z-index: 3;
        background: ${theme.colors.alpha.white[30]};
  }
`
);

const IconButtonToggle = styled(IconButton)(
  ({ theme }) => `
  width: ${theme.spacing(6)};
  height: ${theme.spacing(6)};
`
);

const EccomerceLayout: FC<LayoutProps> = ({
  texts,
  mainForm,
  additionalForm,
  sidebar,
  renderButtons,
}) => {
  const styles = useStyles();
  const navigate = useNavigate();
  // const { goBack, push } = useHistory();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);
  const theme = useTheme();

  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const sidebarContent = (
    <Scrollbar>
      <Sidebar renderButtons={renderButtons} sidebar={sidebar} />
    </Scrollbar>
  );

  return (
    <>
      <Box mb={3} display="flex">
        <MainContentWrapper>
          <Grid
            sx={{
              px: 4,
            }}
            container
            direction="row"
            justifyContent="center"
            alignItems="stretch"
            spacing={4}
          >
            <Grid item xs={12}>
              <Box
                mt={3}
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <RootWrapper>
                  <Grid
                    container
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Grid item>
                      <Button
                        sx={{
                          mt: { xs: 2, sm: 0 },
                        }}
                        startIcon={<ArrowBackTwoToneIcon />}
                        onClick={() => navigate(-1)}
                        variant="contained"
                      >
                        Regresar a la lista
                      </Button>
                    </Grid>
                  </Grid>
                </RootWrapper>

                <Box
                  component="span"
                  sx={{
                    display: { lg: 'none', xs: 'inline-block' },
                  }}
                >
                  <IconButtonToggle
                    sx={{
                      ml: 2,
                    }}
                    color="primary"
                    onClick={handleDrawerToggle}
                    size="small"
                  >
                    <MenuTwoToneIcon />
                  </IconButtonToggle>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <MainSection>{mainForm()}</MainSection>
            </Grid>
            {additionalForm && (
              <Grid item xs={12}>
                {additionalForm()}
              </Grid>
            )}
          </Grid>
          <Footer />
        </MainContentWrapper>

        <Box
          component="span"
          sx={{
            display: { lg: 'none', xs: 'inline-block' },
          }}
        >
          <DrawerWrapperMobile
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'left' : 'right'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
          >
            {sidebarContent}
          </DrawerWrapperMobile>
        </Box>
        <Box
          component="span"
          sx={{
            display: { xs: 'none', lg: 'inline-block' },
          }}
        >
          <DrawerWrapper
            variant="permanent"
            anchor={theme.direction === 'rtl' ? 'left' : 'right'}
            open
          >
            {sidebarContent}
          </DrawerWrapper>
        </Box>
      </Box>
    </>
  );
};

export default EccomerceLayout;
