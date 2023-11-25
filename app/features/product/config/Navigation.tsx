import {TypedNavigator} from '@react-navigation/native';
import React from 'react';
import Screens from './Screens';
import Product from '../screens/Product';
import DetailProduct from '../screens/DetailProduct';
import AddProduct from '../screens/AddProduct';

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
    <Root.Screen
      name={Screens.DETAIL_PRODUCT.KEY}
      component={DetailProduct}
      key={Screens.DETAIL_PRODUCT.KEY}
      options={{
        title: Screens.DETAIL_PRODUCT.TITLE,
        headerShown: false,
      }}
    />,
    <Root.Screen
      name={Screens.ADD_PRODUCT.KEY}
      component={AddProduct}
      key={Screens.ADD_PRODUCT.KEY}
      options={{
        title: Screens.ADD_PRODUCT.TITLE,
        headerShown: false,
      }}
    />,
  ];
}

const ProductNavigation = {
  getNavigation,
};

export default ProductNavigation;
