import { Alert, StyleSheet, ScrollView, TouchableOpacity, BackHandler, Keyboard } from 'react-native';
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import AppView from '~/app/core/component/AppView';
import { CompositeNavigationProp, useFocusEffect } from '@react-navigation/native';
import { Button, Checkbox, Icon, Image, Input, Pressable, View, Text } from 'native-base';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { AuthContext } from '~/app/core/config/AuthContext';
import { TouchableWithoutFeedback } from 'react-native';
import AuthScreen from '../config/Screens';
import { showLoading } from '~/app/core/utils/loader';
import axios from 'axios';
import { URL_REGISTER } from '~/app/service/ApiServices';
import { TextInput } from 'react-native';
import InputForm, { inputHandle } from '~/app/core/component/InputForm';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Register({ navigation }: { navigation: CompositeNavigationProp<any, any> }) {

  const {setAuthData, setIsLogin} = useContext(AuthContext);


  const [data, setData] = useState({
    username: '',
    fullname: '',
    email: '',
    password: '',
    password_confirmation: '',
    shop_name: '',
  });

  const fullnameRef = useRef<inputHandle>(null);
  const emailRef = useRef<inputHandle>(null);
  const shopNameRef = useRef<inputHandle>(null);
  const passwordRef = useRef<inputHandle>(null);
  const passwordConfirmRef = useRef<inputHandle>(null);

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        Alert.alert(
          "Exit App",
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
  
  const toggleRegister = async() => {
    showLoading(true);
    try {
      
      const promise = await axios({
        method: 'post',
        url: URL_REGISTER,
        timeout: 15000,
        data: data,
      });

      const response_data = promise.data.data;

      setAuthData({
        token: response_data.token,
        user: {
          id: response_data.user.username,
          name: response_data.user.profile.fullname,
          email: response_data.user.email,
          role: response_data.user.role??'user',
          avatar: response_data.user.avatar??'https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png',
          avatar_url: response_data.user.avatar_url??'https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png',
          shop_name: response_data.shop.name,
        },
      });

      await AsyncStorage.setItem('token', response_data.token);
      
      setIsLogin(true);
      
    } catch (error: any) {

      Alert.alert(
        "Register Failed",
        error.response?.data?.message ?? 'Register failed, please try again later',
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
      
    }
    showLoading(false);
  }

  return (
    <AppView withSafeArea
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Text fontSize="2xl" fontWeight="bold">Register</Text>
          <InputForm
            placeholder="Username"
            onChangeText={(val) => setData({...data, username: val})}
            onSubmitEditing={() => fullnameRef.current?.onFocus()}
            returnKeyType='next'
          />
          <InputForm
            placeholder="Full Name"
            onChangeText={(val) => setData({...data, fullname: val})}
            ref={fullnameRef}
            onSubmitEditing={() => emailRef.current?.onFocus()}
            returnKeyType='next'
          />
          <InputForm
            placeholder="Email"
            onChangeText={(val) => setData({...data, email: val})}
            onSubmitEditing={() => shopNameRef.current?.onFocus()}
            ref={emailRef}
            returnKeyType='next'
            keyboardType='email-address'
          />
          <InputForm
            placeholder="Shop Name"
            onChangeText={(val) => setData({...data, shop_name: val})}
            onSubmitEditing={() => passwordRef.current?.onFocus()}
            ref={shopNameRef}
            returnKeyType='next'
          />
          <InputForm
            placeholder="Password"
            onChangeText={(val) => setData({...data, password: val})}
            onSubmitEditing={() => passwordConfirmRef.current?.onFocus()}
            ref={passwordRef}
            returnKeyType='next'
            secureTextEntry={!show}
            InputRightElement={
              <Pressable onPress={() => setShow(!show)}>
                <Icon as={<MaterialIcons name={show ? "visibility" : "visibility-off"} />} size={5} mr="2" color="muted.400" />
              </Pressable>
            }

          />
          <InputForm
            placeholder="Retype Password"
            onChangeText={(val) => setData({...data, password_confirmation: val})}
            ref={passwordConfirmRef}
            returnKeyType='done'
            secureTextEntry={!show}
            InputRightElement={
              <Pressable onPress={() => setShow(!show)}>
                <Icon as={<MaterialIcons name={show ? "visibility" : "visibility-off"} />} size={5} mr="2" color="muted.400" />
              </Pressable>
            }
            onSubmitEditing={toggleRegister}
          />
          <Button h="10" w="100%" maxW="xs" marginTop="15" onPress={toggleRegister}>
            Register
          </Button>
          <View style={{ flexDirection: 'row', marginTop: 10 }}>
            <Text style={{ color: 'grey' }}>Already have an account? </Text>
            <TouchableOpacity onPress={() => AuthScreen.LOGIN.navigate(navigation)}>
              <Text style={{ color: '#256FDC' }}>Login</Text>
            </TouchableOpacity>
          </View>
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