import { useLocalStorage } from '@rehooks/local-storage';
import * as t from 'io-ts';
import jwtDecode from 'jwt-decode';
import React, { FunctionComponent } from 'react';

import { IJWTToken } from '../dto/JWTTokenDTO';
import { IUser, UserValidator } from '../dto/UserDTO';
import { login } from '../http/login';
import { HTTPError } from '../http/request';
import { decodeObject } from '../utils/decodeObject';
import { notLocalStorageNull } from '../utils/TypeGuards';
import { LoginProvider } from './LoginContext';

const LoginManager: FunctionComponent = ({ children }) => {
  const [user, setUser] = useLocalStorage<IUser | 'null'>('null');
  const [token, setToken] = useLocalStorage<IJWTToken | 'null'>('null');

  const localLogin = async (email: string, password: string) => {
    try {
      const tokens = await login(email, password);
      setToken(tokens);
      const user = await decodeObject(UserValidator, jwtDecode(tokens.access));
      setUser(user);
      return user;
    } catch (error) {
      if (error instanceof HTTPError && error.response.status === 401) {
        const message = await decodeObject(
          t.type({ detail: t.string }),
          await error.response.json(),
        );

        return {
          error: message.detail,
        };
      }
    }
    return {
      error: 'Catastrophic error',
    };
  };

  return (
    <LoginProvider
      value={{
        login: {
          user: notLocalStorageNull(user) ? user : undefined,
          tokens: notLocalStorageNull(token) ? token : undefined,
          login: localLogin,
        },
      }}
    >
      {children}
    </LoginProvider>
  );
};

export default LoginManager;
