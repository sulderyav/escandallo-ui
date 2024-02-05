import React, { useEffect, useState, createContext } from "react";
import { AxiosError } from "axios";
import { useSnackbar } from "notistack";

import useAuth from "../hooks/useAuth";
import { createRequestMethods, FetchFunction } from "../utils/api";

interface ApiContextValue {
  get: FetchFunction;
  post: FetchFunction;
  put: FetchFunction;
  delete: FetchFunction;
  patch: FetchFunction;
}

export const ApiContext = createContext<ApiContextValue>({
  get: () => Promise.reject(),
  post: () => Promise.reject(),
  put: () => Promise.reject(),
  delete: () => Promise.reject(),
  patch: () => Promise.reject(),
});

export enum HandledErrors {
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  INTERNAL_SERVER_ERROR = 500,
  null = null,
}

type ErrorMessagesType = {
  [key in HandledErrors]: {
    title: string;
    variant: "error" | "warning" | "info" | "success";
    message: string;
  };
};

const ErroMessages: ErrorMessagesType = {
  [HandledErrors.BAD_REQUEST]: {
    title: "Error",
    variant: "error",
    message: "Hay un error con la información que nos proporcionaste.",
  },
  [HandledErrors.UNAUTHORIZED]: {
    title: "Error",
    variant: "error",
    message: "Tu sesión ha finalizado. Ingresa nuevamente.",
  },
  [HandledErrors.FORBIDDEN]: {
    title: "Error",
    variant: "error",
    message: "No puedes realizar esa operación. Ponte en contacto con soporte.",
  },
  [HandledErrors.NOT_FOUND]: {
    title: "Error",
    variant: "error",
    message: "No podemos encontrar lo que nos solicitaste.",
  },
  [HandledErrors.CONFLICT]: {
    title: "Error",
    variant: "error",
    message: "El recurso ya se encuentra creado.",
  },
  [HandledErrors.INTERNAL_SERVER_ERROR]: {
    title: "Error",
    variant: "error",
    message: "Ha ocurrido algo inesperado. Por favor intenta más tarde.",
  },
};

// const ErrorMessagesMap = new Map<number | null, string>([
//   [
//     NoResponseCode,
//     'Parece que has perdido conexión al internet. Intenta más tarde'
//   ],
//   [
//     HandledErrors.BAD_REQUEST,
//     'Hay un error con la información que nos proporcionaste.'
//   ],
//   [HandledErrors.UNAUTHORIZED, 'Tu sesión ha finalizado. Ingresa nuevamente'],
//   [
//     HandledErrors.FORBIDDEN,
//     'No puedes realizar esa operación. Ponte en contacto con soporte.'
//   ],
//   [HandledErrors.NOT_FOUND, 'No podemos encontrar lo que nos solicitaste. '],
//   [409, 'Hay un error con la información que nos proporcionaste'],
//   [500, 'Hubo un error procesando tu solicitud. Por favor intenta más tarde'],
//   [null, 'Ha sucedido algo inesperado. Por favor intenta más tarde.']
// ]);

export function ApiProvider({ children }: { children: React.ReactNode }) {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { logout, token } = useAuth();
  const { enqueueSnackbar } = useSnackbar();

  const value = React.useMemo(() => {
    function handleError(error: AxiosError | any) {
      if (error.response) {
        // returned from api buy with an error code outside 2xx
        const isHandledError = Object.values(HandledErrors).includes(
          error.response.status
        );
        setErrorMessage(
          isHandledError
            ? ErroMessages[error.response.status].message
            : ErroMessages[HandledErrors.INTERNAL_SERVER_ERROR].message
        );
        setErrorMessage("");

        // This if is for the validation errors | Usually are 400 errors when the sent data is not valid
        if (
          error.response.data &&
          error.response.data.errors &&
          error.response.data.errors.length > 0
        ) {
          const errors: {
            property: string;
            children: [];
            constraints: { [key: string]: string };
          }[] = error.response.data.errors;

          const errorMessages = errors.map((e) => {
            const errorKey = Object.keys(e.constraints)[0];
            return e.constraints[errorKey];
          });

          errorMessages.forEach((message) => {
            setErrorMessage(message);
            setErrorMessage("");
          });
        } else {
          if (
            error.response.data.message &&
            error.response.data.message !== "Unauthorized"
          ) {
            setErrorMessage(error.response.data.message);
            setErrorMessage("");
          }
        }

        if (error.response.status === 401) {
          //When 401 is the response status the user is no longer authorized and should
          //be logged out
          logout();
        }
      } else if (error.response) {
        // setState({ errorCode: NoResponseCode, status: 'error' });
      }
    }

    return createRequestMethods(token, handleError);
  }, [logout, token]);

  useEffect(() => {
    if (errorMessage.length === 0) return;
    enqueueSnackbar(errorMessage, {
      variant: "error",
    });
  }, [errorMessage]);

  return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>;
}
