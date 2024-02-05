import { FC, ReactNode, createContext, useEffect, useReducer } from 'react';
import { User } from 'src/utils/types';
import SuspenseLoader from 'src/components/SuspenseLoader';
import firebase from 'src/utils/firebase';
import { Zoom } from '@mui/material';
import { useSnackbar } from 'notistack';

import axios from '../utils/axios';
import useAuth from '../hooks/useAuth';
import { generalConfig } from 'src/config';

interface AuthState {
  isInitialised: boolean;
  isAuthenticated: boolean;
  user: User | null;
}

interface AuthContextValue extends AuthState {
  method: 'FirebaseAuth';
  createUserWithEmailAndPassword: (
    email: string,
    password: string
  ) => Promise<any>;
  signInWithEmailAndPassword: (email: string, password: string) => Promise<any>;
  signInWithGoogle: () => Promise<any>;
  logout: () => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

type AuthStateChangedAction = {
  type: 'AUTH_STATE_CHANGED';
  payload: {
    isAuthenticated: boolean;
    user: User | null;
  };
};

type Action = AuthStateChangedAction;

const initialAuthState: AuthState = {
  isAuthenticated: false,
  isInitialised: false,
  user: null,
};

const reducer = (state: AuthState, action: Action): AuthState => {
  switch (action.type) {
    case 'AUTH_STATE_CHANGED': {
      const { isAuthenticated, user } = action.payload;

      return {
        ...state,
        isAuthenticated,
        isInitialised: true,
        user,
      };
    }
    default: {
      return { ...state };
    }
  }
};

const AuthContext = createContext<AuthContextValue>({
  ...initialAuthState,
  method: 'FirebaseAuth',
  createUserWithEmailAndPassword: () => Promise.resolve(),
  signInWithEmailAndPassword: () => Promise.resolve(),
  signInWithGoogle: () => Promise.resolve(),
  logout: () => Promise.resolve(),
});

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialAuthState);
  const { login } = useAuth() as any;
  const { enqueueSnackbar } = useSnackbar();

  const signInWithEmailAndPassword = (
    email: string,
    password: string
  ): Promise<any> => {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  };

  const signInWithGoogle = (): Promise<any> => {
    const provider = new firebase.auth.GoogleAuthProvider();

    return firebase
      .auth()
      .signInWithPopup(provider)
      .then(async (gUser: any) => {
        const email = gUser.additionalUserInfo.profile.email;
        const password = gUser.credential.idToken;

        try {
          // First I update the user's database info, whith the user's Google info
          // await axios.put(`/system-users/${email}`, {
          //   avatar: gUser.additionalUserInfo.profile.picture,
          //   name: gUser.additionalUserInfo.profile.name,
          //   firstName: gUser.additionalUserInfo.profile.given_name,
          //   lastName: gUser.additionalUserInfo.profile.family_name
          // });

          /*
            Once the user signin I check if the user is on DB 
            and if the email has an 101grados.com domain

            To check that I send the Google idToken as a Password field
            to verify the authenticity of the request
          */
          const response = await axios.post<{
            accessToken: string;
            user: User;
            isGoogleLogin: boolean;
          }>(`/auth/login`, {
            email,
            password,
            isGoogleLogin: true,
            tenantId: generalConfig.tenant.id,
          });
          const { accessToken } = response.data;

          // await login(email, password, accessToken);
          await login(email, password, true);
        } catch (e) {
          firebase.auth().signOut();
          if (e.statusCode === 400) {
            enqueueSnackbar(`Su cuenta no pertenece a 101 Grados.`, {
              variant: 'error',
              anchorOrigin: {
                vertical: 'top',
                horizontal: 'right',
              },
              TransitionComponent: Zoom,
            });
          } else {
            if (e.statusCode === 404) {
              enqueueSnackbar(
                `Su usuario aún no ha sido registrado. Favor comuníquese con soporte.`,
                {
                  variant: 'warning',
                  anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right',
                  },
                  TransitionComponent: Zoom,
                }
              );
            } else {
              enqueueSnackbar(`Ha ocurrrido un error. Inténtelo más tarde.`, {
                variant: 'error',
                anchorOrigin: {
                  vertical: 'top',
                  horizontal: 'right',
                },
                TransitionComponent: Zoom,
              });
              console.error('signInWithGoogle(): ', e);
            }
          }
        }
      });
  };

  const createUserWithEmailAndPassword = async (
    email: string,
    password: string
  ): Promise<any> => {
    return firebase.auth().createUserWithEmailAndPassword(email, password);
  };

  const logout = (): Promise<void> => {
    return firebase.auth().signOut();
  };

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        dispatch({
          type: 'AUTH_STATE_CHANGED',
          payload: {
            isAuthenticated: true,
            // @ts-ignore
            user: {
              // id: user.uid,
              id: 1,
              avatar: user.photoURL,
              email: user.email,
              // name: user.displayName || user.email,
              // role: 'admin',
              // location: 'San Francisco, USA',
              // username: 'admin',
              // posts: '4',
              // coverImg: 'http://lorempixel.com/640/480/cats',
              // followers: '5684',
              // description:
              //   'Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.',
            },
          },
        });
      } else {
        dispatch({
          type: 'AUTH_STATE_CHANGED',
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    });

    return unsubscribe;
  }, [dispatch]);

  if (!state.isInitialised) {
    return <SuspenseLoader />;
  }

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: 'FirebaseAuth',
        createUserWithEmailAndPassword,
        signInWithEmailAndPassword,
        signInWithGoogle,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
