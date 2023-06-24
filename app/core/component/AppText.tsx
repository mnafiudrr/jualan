import { StyleSheet, Text, TextStyle, View } from 'react-native'
import React, { Children, ReactNode } from 'react'
import { widthPercentageToDP } from 'react-native-responsive-screen'
import { getColor } from '../utils/color-utils'

type AppTextProps = {
  fontSize?: number,
  color?: 'default' | 'primary' | 'secondary' | 'danger' | 'warning' | 'success' | 'info' | 'light' | 'dark',
  textAlign?: 'auto' | 'left' | 'right' | 'center' | 'justify',
  fontWeight?: 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900',
  style?: TextStyle,
  children: ReactNode,
}

export default function AppText({children, style: textStyles, color, fontSize, fontWeight}: AppTextProps) {

  const colorText = getColor(color);
  const fontSizeText = fontSize ?? 20;

  return (
    <View style={styles.container}>
      <Text style={[
        styles.contentText, 
        {
          color: colorText,
          fontSize: fontSizeText,
          fontWeight
        }, 
        textStyles
        ]}>
        {children}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  contentText: {
    fontSize: widthPercentageToDP(4),
    textAlign: 'justify',
  },
  container: {
    paddingVertical: widthPercentageToDP(2),
  }
})