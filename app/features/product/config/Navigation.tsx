import {TypedNavigator} from '@react-navigation/native';
import React from 'react';
import Screens from './Screens';
import Product from '../screens/Product';

function getNavigation(Root: TypedNavigator<any, any, any, any, any>) {
  return [
    <Root.Screen
      name={Screens.PRODUCT.KEY}
      component={Product}
      key={Screens.PRODUCT.KEY}
      options={{
        title: Screens.PRODUCT.TITLE,
        headerShown: false,
      }}
    />,
  ];
}

const ProductNavigation = {
  getNavigation,
};

export default ProductNavigation;
