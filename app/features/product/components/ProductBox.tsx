import { Image, Pressable, Text, View, useColorModeValue } from 'native-base';
import React from 'react';
import { SimpleLineIcons } from '@expo/vector-icons';

type ProductBoxProps = {
  name: string,
  image: string,
  price: number,
  stock: number,
  onPress?: () => void
}

export default function ProductBox({ name, image, price, stock, onPress }: ProductBoxProps) {
  // const bgColor = useColorModeValue("trueGray.200", "trueGray.900");
  const bgColor = useColorModeValue("trueGray.200", "light.900");
  return (
    <View flexDir={'row'} backgroundColor={bgColor} w={'100%'} maxW={1440} h={100} alignItems={'center'} padding={2} marginBottom={2} borderRadius={15}>
      <Image source={{ uri: image }} alt="product" size="md" borderRadius={15} />
      <View marginLeft={15} flex={1} flexDir={'row'} alignItems={'center'}>
        <View justifyContent={'space-between'} h={85} flex={1}>
          <Text fontSize={'md'} fontWeight={'bold'} h={'55%'}>{name}</Text>
          <View>
            <Text fontSize={'sm'}>Rp. {price.toLocaleString('id-ID')}</Text>
            <Text fontSize={'sm'}>Stock: {stock.toLocaleString('id-ID')}</Text>
          </View>
        </View>
        <Pressable onPress={onPress}>
          <SimpleLineIcons name="options-vertical" size={24} color="gray" />
        </Pressable>
      </View>
    </View>
    );
}