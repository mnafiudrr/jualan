import { Button, Image, Input, Text, View, useColorModeValue } from 'native-base';
import React, { useState } from 'react';

type ProductBoxProps = {
  id: number;
  name: string;
  image: string;
  price: number;
  stock: number;
  qty?: number;
  onUpdate: (item: { id: number; qty: number }) => void;
};

export default function ProductBox({
  id,
  name,
  image,
  price,
  stock,
  onUpdate,
}: ProductBoxProps) {
  const bgColor = useColorModeValue('trueGray.200', 'light.900');

  const [amount, setAmount] = useState('0');

  const handleAmountChange = (value: string) => {
    const num = value !== '' ? Math.min(Math.max(parseInt(value), 0), stock) : 0;
    setAmount(num.toString());
    onUpdate({ id, qty: num });
  };

  const addAmount = () => {
    setAmount((prevAmount) => {
      const newAmount = parseInt(prevAmount) < stock ? parseInt(prevAmount) + 1 : parseInt(prevAmount);
      onUpdate({ id, qty: newAmount });
      return newAmount.toString();
    });
  };

  const reduceAmount = () => {
    setAmount((prevAmount) => {
      const newAmount = parseInt(prevAmount) > 0 ? parseInt(prevAmount) - 1 : parseInt(prevAmount);
      onUpdate({ id, qty: newAmount });
      return newAmount.toString();
    });
  };

  return (
    <View
      flexDirection="row"
      backgroundColor={bgColor}
      w="100%"
      maxW={1440}
      h={100}
      alignItems="center"
      padding={2}
      marginBottom={2}
      borderRadius={15}
    >
      <Image source={{ uri: image }} alt="product" size="md" borderRadius={15} />
      <View marginLeft={15} flex={1} flexDirection="row" alignItems="center">
        <View justifyContent="space-between" h={85} flex={1}>
          <Text fontSize="md" fontWeight="bold" h="55%">
            {name}
          </Text>
          <View flexDirection="row" justifyContent="space-between">
            <View>
              <Text fontSize="sm">Rp. {price.toLocaleString('id-ID')}</Text>
              <Text fontSize="sm">Stock: {stock.toLocaleString('id-ID')}</Text>
            </View>
            <Input
              type="text"
              py="0"
              w="45%"
              h={8}
              rounded="none"
              textAlign="center"
              InputLeftElement={
                <Button size="sm" rounded="none" h="full" paddingTop={1.5} onPress={reduceAmount}>
                  -
                </Button>
              }
              InputRightElement={
                <Button size="sm" rounded="none" h="full" paddingTop={1.5} onPress={addAmount}>
                  +
                </Button>
              }
              value={amount}
              onChangeText={(value) => handleAmountChange(value)}
            />
          </View>
        </View>
      </View>
    </View>
  );
}
