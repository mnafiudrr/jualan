/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { TextStyle, View, ViewStyle } from 'react-native';
import { Entypo, Foundation } from '@expo/vector-icons';
import { CompositeNavigationProp, useNavigation } from '@react-navigation/core';
import { Avatar, Text } from 'native-base';
import { widthPercentageToDP as wp} from 'react-native-responsive-screen';
import ToggleableSafeArea from '~/app/core/component/ToggleSafeArea';
import AppColors from '~/app/core/static/AppColors';

export default function HomeHeader({
  title, style, textStyle, iconColor, withSafeArea, suffix, backButton,
}: {
  title?: string, style?:
  ViewStyle, textStyle?: TextStyle, iconColor?: string,
  withSafeArea?: boolean, suffix?: any, backButton?: any
}) {
  const navigation = useNavigation<CompositeNavigationProp<any, any>>();
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
          <Avatar size="sm" source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSzYPOAEJlWa6pj-zkTb8hjwwxMTpoCTCpzQ&usqp=CAU' }} marginTop={1} />
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
          <Entypo name="magnifying-glass" size={24} color="black" style={{ marginRight: 15 }} />
          <Foundation name="align-right" size={24} color="black" />
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
  iconColor: AppColors.red,
  withSafeArea: false,
  suffix: null,
};