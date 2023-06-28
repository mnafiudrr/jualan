import { Alert, StyleSheet, ScrollView, TouchableOpacity, BackHandler, Keyboard } from 'react-native';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import AppView from '~/app/core/component/AppView';
import { CompositeNavigationProp, useFocusEffect } from '@react-navigation/native';
import { Button, Checkbox, Icon, Image, Input, Pressable, View, Text } from 'native-base';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { AuthContext } from '~/app/core/config/AuthContext';
import { TouchableWithoutFeedback } from 'react-native';
import AuthScreen from '../config/Screens';

export default function Register({ navigation }: { navigation: CompositeNavigationProp<any, any> }) {

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
  const { setIsLogin } = useContext(AuthContext);

  return (
    <AppView withSafeArea
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Text fontSize="2xl" fontWeight="bold">Register</Text>
          <Input variant="underlined" h="10" placeholder="Username" w="100%" maxW="xs" marginBottom="1" />
          <Input variant="underlined" h="10" placeholder="Full Name" w="100%" maxW="xs" marginBottom="1" />
          <Input variant="underlined" h="10" placeholder="Email" inputMode='email' w="100%" maxW="xs" marginBottom="1" />
          <Input variant="underlined" h="10" w="100%" maxW="xs" type={show ? "text" : "password"} InputRightElement={<Pressable onPress={() => setShow(!show)}>
            <Icon as={<MaterialIcons name={show ? "visibility" : "visibility-off"} />} size={5} mr="2" color="muted.400" />
          </Pressable>} placeholder="Password" />
          <Input variant="underlined" h="10" w="100%" maxW="xs" type={show ? "text" : "password"} InputRightElement={<Pressable onPress={() => setShow(!show)}>
            <Icon as={<MaterialIcons name={show ? "visibility" : "visibility-off"} />} size={5} mr="2" color="muted.400" />
          </Pressable>} placeholder="Retype Password" />
          <Button h="10" w="100%" maxW="xs" marginTop="15" onPress={() => {}}>
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