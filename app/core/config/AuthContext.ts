import {createContext} from 'react';

const AuthCtxDefaultValue = {
  authData: {
    token: '',
    user: {
      id: '',
      name: '',
      email: '',
      role: '',
      avatar: '',
      avatar_url: '',
    },
  },
  setAuthData: (authData: any) => {},
  isLogin: false,
  setIsLogin: (boolean: boolean) => {},
  mode: 'light',
  setMode: (mode: string) => {},
};

export const AuthContext = createContext(AuthCtxDefaultValue);