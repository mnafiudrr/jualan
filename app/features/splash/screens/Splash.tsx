import {CompositeNavigationProp} from '@react-navigation/native';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import {
  StyleSheet, View, ActivityIndicator, Platform, Dimensions, Text, Image,
} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import AppText from '~/app/core/component/AppText';
import AppView from '~/app/core/component/AppView';
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
  useEffect(() => {
    setTimeout(() => {
      setSplashLoading(false);
    }, 3000);
  }, []);
  
  const getImage = async () => {

    setTimeout(() => {
      // setSplashLoading(false);
    }, 3000);

  }


  return (
    <AppView withSafeArea withHeader={false}>
      <View style={styles.container}>
        <Image style={styles.logo} source={ require('~/assets/icon.png') }/>
        <AppText fontSize={30} fontWeight='bold'>
          Jualan
        </AppText>
      </View>
      <View style={styles.containerFooter}>
        <ActivityIndicator style={styles.loader} size={'large'} color={'grey'} />
        <AppText style={styles.footer}>Loading ...</AppText>
      </View>
    </AppView>
  );
}
