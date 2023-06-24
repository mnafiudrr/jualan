import React from 'react';
import {ViewStyle, StatusBar, ScrollView} from 'react-native';
import ToggleableSafeArea from './ToggleSafeArea';

export default function AppView({
  children, withHeader, title, style, styleHeader,
  styleBg,
  withSafeArea,
  suffixHeader,
  backButton,
}: {children: React.ReactNode, withHeader?: boolean,
  withSafeArea?: boolean,
  title?: string, style?: ViewStyle,
  styleBg?: ViewStyle,
  styleHeader?: ViewStyle, suffixHeader?: React.ReactNode, backButton?:any | null}) {
  return (
    <ToggleableSafeArea active={withSafeArea ?? false} style={{flex: 1, ...style}}>
      <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />
      {children}
    </ToggleableSafeArea>
  );
}

AppView.defaultProps = {
  withHeader: true,
  title: '',
  style: {},
  styleHeader: {},
  suffixHeader: null,
  withSafeArea: false,
  styleBg: {},
};
