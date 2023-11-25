import { Alert, StyleSheet, ScrollView, TouchableOpacity, BackHandler, Keyboard } from 'react-native';
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import AppView from '~/app/core/component/AppView';
import { CompositeNavigationProp, useFocusEffect } from '@react-navigation/native';
import { Button, Checkbox, Icon, Image, Input, Pressable, View, Text, KeyboardAvoidingView } from 'native-base';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { AuthContext } from '~/app/core/config/AuthContext';
import { TouchableWithoutFeedback } from 'react-native';
import AuthScreen from '../config/Screens';
import { showLoading } from '~/app/core/utils/loader';
import axios from 'axios';
import { URL_LOGIN } from '~/app/service/ApiServices';
import AsyncStorage from '@react-native-async-storage/async-storage';
import InputForm, { inputHandle } from '~/app/core/component/InputForm';

export default function Login({ navigation }: { navigation: CompositeNavigationProp<any, any> }) {

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        Alert.alert(
          "Whyyy",
          "You sure to exit this app??",
          [
            {
              text: "Exit App",
              onPress: () => BackHandler.exitApp(),
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

  const [show, setShow] = React.useState(false);
  const { setIsLogin, setAuthData } = useContext(AuthContext);

  const usernameRef = useRef<inputHandle>(null);
  const passwordRef = useRef<inputHandle>(null);

  const [data, setData] = useState({
    username: '',
    password: '',
  });

  const toggleLogin = async() => {
    showLoading(true);
    try {
      const promise = await axios({
        method: 'post',
        url: URL_LOGIN,
        timeout: 15000,
        data: data,
      });
      
      const response_data = promise.data.data;

      setAuthData({
        token: response_data.token,
        user: {
          id: response_data.user.id,
          name: response_data.user.profile.fullname,
          email: response_data.user.email,
          role: response_data.user.role,
          avatar: response_data.user.avatar??'https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png',
          avatar_url: response_data.user.avatar_url??'https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png',
          shop_name: response_data.shop.name,
        },
      });

      await AsyncStorage.setItem('token', response_data.token);

      setIsLogin(true);
      showLoading(false);

    } catch (error: any) {
      
      Alert.alert(
        "Login Failed",
        error.response.data.message,
        [
          {
            text: "OK",
            style: "default",
          },
        ],
        {
          cancelable: true,
        }
      )

      showLoading(false);

    }
  }

  return (
    <AppView withSafeArea
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1 }}>
          <View style={styles.container}>
            <Image source={require('~/assets/adaptive-icon.png')} style={styles.logo} alt="Alternate Text" size="2xl" />
            <Text fontSize="2xl" fontWeight="bold">Welcome Back!</Text>
            <InputForm
              value={data.username}
              onChangeText={(value) => setData({ ...data, username: value })}
              placeholder="Username"
              style={{ marginBottom: 1 }}
              ref={usernameRef}
              returnKeyType="next"
              variant='underlined'
              h={'10'}
              w={'100%'}
              maxW={'xs'}
              marginBottom={1}
              size={'sm'}
              onSubmitEditing={() => passwordRef.current?.onFocus()}
            />
            <InputForm
              value={data.password}
              onChangeText={(value) => setData({ ...data, password: value })}
              placeholder="Password"
              secureTextEntry={true}
              ref={passwordRef}
              returnKeyType="done"
              onSubmitEditing={toggleLogin}
              variant='underlined'
              h={'10'}
              w={'100%'}
              maxW={'xs'}
              marginBottom={1}
              size={'sm'}
              InputRightElement={<Pressable onPress={() => setShow(!show)}>
                <Icon as={<MaterialIcons name={show ? "visibility" : "visibility-off"} />} size={5} mr="2" color="muted.400" />
              </Pressable>}
            />
            <View w="100%" maxW="xs" style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center'}}>
              <Checkbox value="remember" my="1" size="sm">
                <Text fontSize="sm">Remember me</Text>
              </Checkbox>
              <View style={{ flex: 1 }} />
              <Text fontSize="sm" style={{ color: '#256FDC' }}>Forgot Password?</Text>
            </View>
            <Button h="10" w="100%" maxW="xs" marginTop="15" onPress={toggleLogin}>
              Login
            </Button>
            <View style={{ flexDirection: 'row', marginTop: 10 }}>
              <Text style={{ color: 'grey' }}>Don't have an account? </Text>
              <TouchableOpacity onPress={() => AuthScreen.REGISTER.navigate(navigation)}>
                <Text style={{ color: '#256FDC' }}>Register</Text>
              </TouchableOpacity>
            </View>
          </View>
          <KeyboardAvoidingView behavior="padding">
            <Text alignSelf={'center'} paddingBottom={2}>Version 0.0.3</Text>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    </AppView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
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
    marginBottom: 20,
    borderRadius: 20,
  },
});