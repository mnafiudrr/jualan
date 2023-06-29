/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable global-require */
import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import RootNavigation from './config/RootNavigation';
import { useNavigationPersistence } from './utils/navigation-utils';
import {AppLoading} from './component/AppLoading';
import {useRefLoading} from './utils/loader';
import { StatusBar } from 'expo-status-bar';
import { useColorModeValue } from 'native-base';
import { DarkTheme, DefaultTheme } from '@react-navigation/native';


const NAVIGATION_PERSISTENCE_KEY = '@root_nav_state';

export default function App() {
  const {initialNavigationState, onNavigationStateChange} = useNavigationPersistence(
    NAVIGATION_PERSISTENCE_KEY,
  );  

  const [mode, setMode] = useState('light');
  
  const lightTheme = DefaultTheme;
  const darkTheme = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      background: '#1c1917',
    },
  };
  
  return (
      <NavigationContainer
        theme={mode === 'light' ? lightTheme : darkTheme}
        initialState={initialNavigationState}
        onStateChange={onNavigationStateChange}
      >
        <RootNavigation mode={mode} setMode={setMode} />
        <AppLoading ref={(as) => useRefLoading(as)} />
        <StatusBar style='dark' />
      </NavigationContainer>
  );
}
