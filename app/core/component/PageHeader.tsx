/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { TextStyle, ViewStyle } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { CompositeNavigationProp, useNavigation } from '@react-navigation/core';
import AppColors from '../static/AppColors';
import ToggleableSafeArea from './ToggleSafeArea';
import { Text, View, useColorModeValue } from 'native-base';
import { widthPercentageToDP as wp} from 'react-native-responsive-screen';

export default function PageHeader({
  title, style, textStyle, iconColor, withSafeArea, suffix, backButton,
}: {
  title?: string, style?:
  ViewStyle, textStyle?: TextStyle, iconColor?: string,
  withSafeArea?: boolean, suffix?: any, backButton?: any
}) {
  const navigation = useNavigation<CompositeNavigationProp<any, any>>();
  const iconDefaultColor = useColorModeValue("black", "white");
  return (
    <ToggleableSafeArea edges={['top']} active={withSafeArea ?? false} style={style}>
      <View style={{
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 15,
        paddingTop: 5,
        ...style ?? {},
      }}
      >
        <View w={'5'}>        
          <AntDesign onPress={backButton || navigation.goBack} name="arrowleft" color={iconColor??iconDefaultColor} size={24} style={{ marginTop: 10 }} />
        </View>
        <View style={{ flex: 1, alignItems: 'center' }} >
          <Text
            fontWeight={'600'}
            fontSize={'lg'}
            marginLeft={2}
            marginTop={2}
            >
            {title}
          </Text>
        </View>
        {suffix ? null : <View w={'7'} />}
      </View>
      {suffix}
    </ToggleableSafeArea>
  );
}

PageHeader.defaultProps = {
  title: '',
  style: {},
  textStyle: {},
  iconColor: AppColors.white,
  withSafeArea: false,
  suffix: null,
};