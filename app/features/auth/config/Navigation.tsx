import {TypedNavigator} from '@react-navigation/native';
import React from 'react';
import Screens from './Screens';
import Login from '../screens/Login';
import Register from '../screens/Register';

function getNavigation(Root: TypedNavigator<any, any, any, any, any>) {
  return [
    <Root.Screen
      name={Screens.LOGIN.KEY}
      component={Login}
      key={Screens.LOGIN.KEY}
      options={{
        title: Screens.LOGIN.TITLE,
        headerShown: false,
      }}
    />,
    <Root.Screen
      name={Screens.REGISTER.KEY}
      component={Register}
      key={Screens.REGISTER.KEY}
      options={{
        title: Screens.REGISTER.TITLE,
        headerShown: false,
      }}
    />,
  ];
}

const AuthNavigation = {
  getNavigation,
};

export default AuthNavigation;
