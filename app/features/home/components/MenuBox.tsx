import React from 'react';
import { Pressable, Text } from "native-base";
import { FontAwesome5 } from '@expo/vector-icons';


type MenuBoxProps = {
  name: string,
  icon: string,
  color?: string,
  onPress?: () => void
}

export default function MenuBox({ name, icon, color, onPress }: MenuBoxProps) {
  return (
    <Pressable
      onPress={onPress}
      w={'28%'}
      maxW={'120'}
      style={{aspectRatio: 1, borderRadius: 10, alignItems: 'center', justifyContent: 'center', margin: 10 }}
      backgroundColor={color??'amber.100'}>
        <FontAwesome5 name={icon} size={28} color="black" />
      <Text fontSize={'md'} paddingTop={1}>{name}</Text>
    </Pressable>
  );
}