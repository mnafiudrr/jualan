import { Button, Image, Input, Pressable, Text, View, useColorModeValue } from 'native-base';
import React, { useState } from 'react';
import { SimpleLineIcons } from '@expo/vector-icons';

type ProductBoxProps = {
  name: string,
  image: string,
  price: number,
  stock: number,
  onPress?: () => void
}

export default function ProductBox({ name, image, price, stock, onPress }: ProductBoxProps) {
  
  const bgColor = useColorModeValue("trueGray.200", "light.900");

  const [amount, setAmount] = useState(0);

  const handleAmountChange = (value: string) => {
    if (value === '')
      setAmount(0);
    else {
      const num = parseInt(value);
      if (num > stock)
        setAmount(stock);
      else if (num < 0)
        setAmount(0);
      else
        setAmount(num);
    }
  };

  const addAmount = () => {
    if (amount < stock)
      setAmount(amount + 1);
  };

  const reduceAmount = () => {
    if (amount > 0)
      setAmount(amount - 1);
  };

  return (
    <View flexDir={'row'} backgroundColor={bgColor} w={'100%'} maxW={1440} h={100} alignItems={'center'} padding={2} marginBottom={2} borderRadius={15}>
      <Image source={{ uri: image }} alt="product" size="md" borderRadius={15} />
      <View marginLeft={15} flex={1} flexDir={'row'} alignItems={'center'}>
        <View justifyContent={'space-between'} h={85} flex={1}>
          <Text fontSize={'md'} fontWeight={'bold'} h={'55%'}>{name}</Text>
          <View flexDir={'row'} justifyContent={'space-between'}>
            <View>
              <Text fontSize={'sm'}>Rp. {price.toLocaleString('id-ID')}</Text>
              <Text fontSize={'sm'}>Stock: {stock.toLocaleString('id-ID')}</Text>
            </View>
            <Input type="text" py="0" w={'45%'} h={8} rounded="none" textAlign="center"
              InputLeftElement={<Button isDisabled={amount == 0} size="sm" rounded="none" h="full" paddingTop={1.5} onPress={reduceAmount}>-</Button>}
              InputRightElement={<Button isDisabled={amount == stock} size="sm" rounded="none" h="full" paddingTop={1.5} onPress={addAmount}>+</Button>}
              value={amount.toString()} onChangeText={(value) => handleAmountChange(value)} />
          </View>
        </View>
      </View>
    </View>
    );
}