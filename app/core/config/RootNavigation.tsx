/* eslint-disable no-nested-ternary */
import React, {useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SplashNavigation from '~/app/features/splash/config/Navigation';
import HomeNavigation from '~/app/features/home/config/Navigation';
import ScannerNavigation from '~/app/features/scanner/config/Navigation';
import { SplashContext } from './SplashContext';
import AuthNavigation from '~/app/features/auth/config/Navigation';
import { AuthContext } from './AuthContext';
import { NativeBaseProvider, extendTheme } from 'native-base';
import ProductNavigation from '~/app/features/product/config/Navigation';

const Root = createStackNavigator();

function listScreen() {
  return [
    ...HomeNavigation.getNavigation(Root),
    ...ScannerNavigation.getNavigation(Root),
    ...ProductNavigation.getNavigation(Root),
  ];
}

function authScreen() {
  return [
    ...AuthNavigation.getNavigation(Root),
  ]
}

function splashScreen() {
  return [
    ...SplashNavigation.getNavigation(Root),
  ]
}

function RootNavigation() {

  const [splashLoading, setSplashLoading] = useState(true);
  const [authData, setAuthData] = useState({
    token: '',
    user: {
      id: '',
      name: '',
      email: '',
      role: '',
      avatar: '',
      avatar_url: '',
    },
  });
  const [isLogin, setIsLogin] = useState(false);
  const [theme, setTheme] = useState({
    colors: {
      // Add new color
      primary: {
        50: '#E3F2F9',
        100: '#C5E4F3',
        200: '#A2D4EC',
        300: '#7AC1E4',
        400: '#47A9DA',
        500: '#0088CC',
        600: '#007AB8',
        700: '#006BA1',
        800: '#005885',
        900: '#003F5E',
      },
      // Redefining only one shade, rest of the color will remain same.
      amber: {
        400: '#d97706',
      },
    },
    config: {
      // Changing initialColorMode to 'dark'
      initialColorMode: 'light',
    },
  });

  return (

    <NativeBaseProvider theme={extendTheme(theme)}>
      <SplashContext.Provider 
      value={{ splashLoading, setSplashLoading }}>
          <AuthContext.Provider
          value={{ authData, setAuthData, isLogin, setIsLogin }}>
          <Root.Navigator>
            {
              splashLoading ?
                splashScreen()
                  :
                isLogin ?
                  listScreen()
                    :
                  authScreen()
            }
          </Root.Navigator>
        </AuthContext.Provider>
      </SplashContext.Provider>
    </NativeBaseProvider>
  );
}

export default RootNavigation;
