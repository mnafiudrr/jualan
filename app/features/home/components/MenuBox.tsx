import React from 'react';
import { Pressable, Text, useColorModeValue } from "native-base";
import { FontAwesome5 } from '@expo/vector-icons';


type MenuBoxProps = {
  name: string,
  icon: string,
  color?: string,
  onPress?: () => void
}

export default function MenuBox({ name, icon, color, onPress }: MenuBoxProps) {
  const mode = useColorModeValue("300", "800");
  const iconColor = useColorModeValue("black", "white");
  return (
    <Pressable
      onPress={onPress}
      w={'28%'}
      maxW={'120'}
      style={{aspectRatio: 1, borderRadius: 10, alignItems: 'center', justifyContent: 'center', margin: 10 }}
      backgroundColor={`${color}.${mode}`}>
        <FontAwesome5 name={icon} size={28} color={iconColor} />
      <Text fontSize={'md'} paddingTop={1}>{name}</Text>
    </Pressable>
  );
}