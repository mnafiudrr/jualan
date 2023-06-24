import { View, Text, Alert, Button, StyleSheet, ScrollView, Image, TouchableOpacity, BackHandler } from 'react-native';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import AppView from '~/app/core/component/AppView';
import { CompositeNavigationProp, useFocusEffect } from '@react-navigation/native';
import ScannerScreens from '../../scanner/config/Screens';
import { MaterialIcons } from '@expo/vector-icons'; 
import { AuthContext } from '~/app/core/config/AuthContext';

export default function Home({ navigation }: { navigation: CompositeNavigationProp<any, any> }) {
  const { setIsLogin } = useContext(AuthContext);

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
    <AppView withSafeArea 
    >
      <View style={styles.container}>
        <Text>Home</Text>
        </View>
    </AppView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
    borderRadius: 10,
    alignItems: 'center',
    width: 390,
    marginBottom: 30
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