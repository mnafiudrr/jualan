/* eslint-disable no-nested-ternary */
import React, {useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SplashNavigation from '~/app/features/splash/config/Navigation';
import HomeNavigation from '~/app/features/home/config/Navigation';
import ScannerNavigation from '~/app/features/scanner/config/Navigation';
import { SplashContext } from './SplashContext';
import AuthNavigation from '~/app/features/auth/config/Navigation';
import { AuthContext } from './AuthContext';

const Root = createStackNavigator();

function listScreen() {
  return [
    ...HomeNavigation.getNavigation(Root),
    ...ScannerNavigation.getNavigation(Root),
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

  return (
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
  );
}

export default RootNavigation;
