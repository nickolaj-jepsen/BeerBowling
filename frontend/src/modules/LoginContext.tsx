import React, { useContext } from 'react';

import { IUser } from '../dto/UserDTO';

interface ILoginContext {
  login: {
    user: IUser | undefined;
    tokens:
      | {
          access: string;
          refresh: string;
        }
      | undefined;
    login: (
      email: string,
      password: string,
    ) => Promise<IUser | { error: string }>;
  };
}

const LoginContext = React.createContext<ILoginContext | undefined>(undefined);

export const LoginProvider = LoginContext.Provider;

export function useLogin() {
  const context = useContext(LoginContext);
  if (context === undefined) {
    throw new Error('useLogin needs to have LoginManager as a parent');
  }
  return context.login;
}
