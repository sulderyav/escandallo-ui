import axios, { AxiosError } from 'axios';

import { config } from './config';

export const api = axios.create({ baseURL: config.server.apiUrl });

export type FetchFunction = <T>(
  url: string,
  body?: any,
  headers?: any,
) => Promise<T>;

export function createRequestMethod(
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
  token: string,
  // refreshToken: string,
  onError: (error: AxiosError) => void,
  // onTokenRefresh: (newToken: string, newRefreshToken: string) => void
): FetchFunction {
  return async function (url: string, body: any, headers: any) {
    // if (!token) {
    //   throw new Error(
    //     `${method} method called when the user was unathenticated`
    //   );
    // }

    try {
      const response = await api(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
          ...(headers || {}),
        },
        data: body,
      });
      return response.data;
    } catch (error) {
      console.error('API: error', error);
      // if (error.response) {
      //   // When error.response is available the request actually returned from the server
      //   // but with some code out of the 2XX range
      //   if (error.response.status === 401 && token && refreshToken) {
      //     // If we have a 401 and we actually sent a token,
      //     // try to refresh the token and try again
      //     try {
      //       const { data } = await api('/auth/refresh', {
      //         method: 'POST',
      //         data: { refreshToken }
      //       });
      //       onTokenRefresh(data.token, data.refreshToken);
      //       // After that retry the operation
      //       const response = await api(url, {
      //         method,
      //         headers: {
      //           Authorization: `Bearer ${data.token}`,
      //           ...(headers || {})
      //         },
      //         data: body
      //       });
      //       return response.data;
      //     } catch (refreshError) {
      //       onError(refreshError);
      //       throw refreshError;
      //     }
      //   }
      // }
      // Throw the error so it can be managed outside this function
      onError(error);
      throw error;
    }
  };
}

export function createRequestMethods(
  token: string,
  // refreshToken: string,
  onError: (error: AxiosError) => void,
  // onTokenRefresh: (newToken: string, newRefreshToken: string) => void
) {
  return {
    get: createRequestMethod(
      'GET',
      token,
      // refreshToken,
      onError,
      // onTokenRefresh
    ),
    post: createRequestMethod(
      'POST',
      token,
      // refreshToken,
      onError,
      // onTokenRefresh
    ),
    put: createRequestMethod(
      'PUT',
      token,
      // refreshToken,
      onError,
      // onTokenRefresh
    ),
    patch: createRequestMethod(
      'PATCH',
      token,
      // refreshToken,
      onError,
      // onTokenRefresh
    ),
    delete: createRequestMethod(
      'DELETE',
      token,
      // refreshToken,
      onError,
      // onTokenRefresh
    ),
  };
}
