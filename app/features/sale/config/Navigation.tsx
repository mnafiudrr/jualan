import {TypedNavigator} from '@react-navigation/native';
import React from 'react';
import Screens from './Screens';
import Sale from '../screens/Sale';

function getNavigation(Root: TypedNavigator<any, any, any, any, any>) {
  return [
    <Root.Screen
      name={Screens.SALE.KEY}
      component={Sale}
      key={Screens.SALE.KEY}
      options={{
        title: Screens.SALE.TITLE,
        headerShown: false,
      }}
    />,
  ];
}

const SaleNavigation = {
  getNavigation,
};

export default SaleNavigation;
