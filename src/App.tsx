import { useRoutes } from 'react-router-dom';
import router from 'src/router';
import { Zoom } from '@mui/material';
import { SnackbarProvider } from 'notistack';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { CssBaseline } from '@mui/material';
import { es } from 'date-fns/locale';

import useAuth from 'src/hooks/useAuth';
import ThemeProvider from './theme/ThemeProvider';
import AppInit from './components/AppInit';
import ScrollToTop from './utils/ScrollToTop';
import { AuthProvider } from './contexts/JWTAuthContext';
import { AuthProvider as AuthProviderFirebase } from './contexts/FirebaseAuthContext';
import { ApiProvider } from './contexts/ApiContext';
import { SnackbarCloseButton } from './components/SnackbarClose';


function App() {
  const content = useRoutes(router);
  const auth = useAuth();

  return (
    <ThemeProvider>
      <LocalizationProvider dateAdapter={AdapterDateFns} locale={es}>
        <SnackbarProvider
          maxSnack={50}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          hideIconVariant
          autoHideDuration={4000}
          TransitionComponent={Zoom}
          action={(key) => <SnackbarCloseButton snackbarKey={key} />}
        >
          <ScrollToTop />
          <CssBaseline />
          <AuthProvider>
            <ApiProvider>
              <AuthProviderFirebase>
                {auth.isInitialized ? content : <AppInit />}
              </AuthProviderFirebase>
            </ApiProvider>
          </AuthProvider>
        </SnackbarProvider>
      </LocalizationProvider>
    </ThemeProvider>
  );
}
export default App;
