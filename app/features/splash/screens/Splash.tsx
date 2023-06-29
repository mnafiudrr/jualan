import AsyncStorage from '@react-native-async-storage/async-storage';
import {CompositeNavigationProp} from '@react-navigation/native';
import axios from 'axios';
import { Text, useColorMode } from 'native-base';
import React, { useContext, useEffect, useState } from 'react';
import {
  StyleSheet, View, ActivityIndicator, Platform, Dimensions, Image,
} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import AppView from '~/app/core/component/AppView';
import { AuthContext } from '~/app/core/config/AuthContext';
import { SplashContext } from '~/app/core/config/SplashContext';

const heightScreen = Dimensions.get('screen').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerFooter: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 15,
  },
  footer: {
    padding: Platform.OS === 'android' ? wp(3) : (heightScreen < 700 ? wp(2) : 0),
    fontSize: 15,
    color: 'grey',
    textAlign: 'center',
  },
  loader: {
    marginTop: 0,
  }
});

export default function Splash({navigation}: {navigation: CompositeNavigationProp<any, any>}) {

  const { setSplashLoading } = useContext(SplashContext);
  const [imageUrl, setImageUrl] = useState(`https://i.mydramalist.com/pJZRB_5f.jpg`);
  const { setMode } = useContext(AuthContext);
  const { setColorMode } = useColorMode();

  useEffect(() => {
    getData();
    setTimeout(() => {
      setSplashLoading(false);
    }, 3000);
  }, []);

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('mode');
      if (value !== null) {
        setMode(value);
        setColorMode(value);
      }
    } catch (e) {
    }
  };


  return (
    <AppView withSafeArea withHeader={false}>
      <View style={styles.container}>
        <Image style={styles.logo} source={ require('~/assets/icon.png') }/>
        <Text fontSize={30} fontWeight='bold'>
          Jualan
        </Text>
      </View>
      <View style={styles.containerFooter}>
        <ActivityIndicator style={styles.loader} size={'large'} color={'grey'} />
        <Text style={styles.footer}>Loading ...</Text>
      </View>
    </AppView>
  );
}
