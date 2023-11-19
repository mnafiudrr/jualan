/* eslint-disable import/no-extraneous-dependencies */
import React, { useContext, useEffect } from 'react';
import { TextStyle, View, ViewStyle } from 'react-native';
import { Entypo, Feather } from '@expo/vector-icons';
import { CompositeNavigationProp, useNavigation } from '@react-navigation/core';
import { Avatar, Text, useColorMode, useColorModeValue } from 'native-base';
import { widthPercentageToDP as wp} from 'react-native-responsive-screen';
import ToggleableSafeArea from '~/app/core/component/ToggleSafeArea';
import AppColors from '~/app/core/static/AppColors';
import { AuthContext } from '~/app/core/config/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeHeader({
  title, style, textStyle, withSafeArea, suffix, backButton, avatar
}: {
  title?: string, style?:
  ViewStyle, textStyle?: TextStyle, iconColor?: string,
  withSafeArea?: boolean, suffix?: any, backButton?: any, avatar?: string
}) {
  const navigation = useNavigation<CompositeNavigationProp<any, any>>();
  const iconColor = useColorModeValue("black", "white");
  const { setMode } = useContext(AuthContext);
  const {
    toggleColorMode
  } = useColorMode();

  useEffect(() => {
    const mode = iconColor == 'white' ? 'dark' : 'light';
    setMode(mode);
    storeToLocal(mode);
  }, [iconColor]);

  const storeToLocal = async (value: string) => {
    try {
      await AsyncStorage.setItem('mode', value);
    } catch (e) {
      // saving error
    }
  };

  return (
    <ToggleableSafeArea edges={['top']} active={withSafeArea ?? false} style={style}>
      <View style={{
        paddingHorizontal: 20,
        paddingBottom: 20,
        paddingTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        ...style ?? {},
      }}
      >
        <View style={{ flexDirection: 'row' }} >
          <Avatar size="sm" source={{ uri: avatar ?? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSzYPOAEJlWa6pj-zkTb8hjwwxMTpoCTCpzQ&usqp=CAU' }} marginTop={1} />
          <Text
            fontWeight={'600'}
            fontSize={'lg'}
            marginLeft={2}
            marginTop={2}
            >
            {title}
          </Text>
        </View>
        <View style={{ flexDirection: 'row', marginTop: 5 }} >
          <Entypo name="magnifying-glass" size={24} color={iconColor} style={{ marginRight: 15 }} />
          {
            iconColor != 'white' ?
            <Feather name="sun" size={24} color={iconColor} onPress={toggleColorMode}/> :
            <Entypo name="moon" size={24} color={iconColor} onPress={toggleColorMode}/>
          }
        </View>
      </View>
      {suffix}
    </ToggleableSafeArea>
  );
}

HomeHeader.defaultProps = {
  title: '',
  style: {},
  textStyle: {},
  withSafeArea: false,
  suffix: null,
};