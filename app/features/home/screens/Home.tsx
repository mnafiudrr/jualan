import { Text, Alert, Button, StyleSheet, ScrollView, Image, TouchableOpacity, BackHandler, Dimensions } from 'react-native';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import AppView from '~/app/core/component/AppView';
import { CompositeNavigationProp, useFocusEffect } from '@react-navigation/native';
import { AuthContext } from '~/app/core/config/AuthContext';
import HomeHeader from '../components/HomeHeader';
import { View } from 'native-base';
import MenuBox from '../components/MenuBox';

const screenWidth = Dimensions.get('window').width;


export default function Home({ navigation }: { navigation: CompositeNavigationProp<any, any> }) {
  const { setIsLogin } = useContext(AuthContext);

  const dummyList = [
    {
      name: 'Sell',
      icon: 'cash-register',
      color: 'blue'
    },
    {
      name: 'Product',
      icon: 'boxes',
      color: 'red',
      onPress: () => navigation.navigate('Product')
    },
    {
      name: 'Category',
      icon: 'list',
      color: 'pink'
    },
    {
      name: 'Customer',
      icon: 'user',
      color: 'cyan'
    },
    {
      name: 'Scanner',
      icon: 'qrcode',
      color: 'purple'
    },
    {
      name: 'Stock In',
      icon: 'arrow-down',
      color: 'green'
    },
    {
      name: 'Stock Out',
      icon: 'arrow-up',
      color: 'darkBlue'
    },
    {
      name: 'Report',
      icon: 'file-invoice-dollar',
      color: 'yellow'
    },
    {
      name: 'Setting',
      icon: 'cog',
      color: 'teal',
    },
    {
      name: 'Logout',
      icon: 'sign-out-alt',
      color: 'red',
      onPress: () => {
        Alert.alert(
          "Logout",
          "You sure to logout??",
          [
            {
              text: "Logout",
              onPress: () => setIsLogin(false),
              style: "default",
            },
          ],
          {
            cancelable: true,
          }
        )
      }
    }
  ];

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        Alert.alert(
          "Logout",
          "You sure to logout??",
          [
            {
              text: "Logout",
              onPress: () => setIsLogin(false),
              style: "default",
            },
          ],
          {
            cancelable: true,
          }
        )
        return true;
      };

      const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => subscription.remove();
    }, [])
  );

  return (
    <AppView
      withSafeArea
    >
    <HomeHeader
      title="Warung Bang Messi"
    />
      <ScrollView>
        <View style={styles.container}>
          {
            dummyList.map((item, index) => (
              <MenuBox
                key={index}
                name={item.name}
                icon={item.icon}
                color={item.color}
                onPress={item.onPress}
              />
            ))
          }
        </View>
      </ScrollView>
    </AppView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginHorizontal:  (screenWidth * 0.4) / 35,
  },
  button: {
    width: 180,
    height: 40,
    backgroundColor: '#256FDC',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
  },
  buttonText: {
    fontSize: 20,
    color: 'white'
  },
  headerView: {
    backgroundColor: '#c5c5c5',
    padding: 10,
    alignItems: 'center',
  },
  topHeaderText: {
    fontSize: 20,
    fontWeight: 'bold',
    // color: 'white'
  },
  topContentText: {
    fontSize: 16,
    textAlign: 'center',
  },
  logo: {
    width: 350,
    height: 350,
    marginBottom: 50,
  },
});