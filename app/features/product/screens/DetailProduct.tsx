import { Alert, StyleSheet } from 'react-native';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import AppView from '~/app/core/component/AppView';
import { CompositeNavigationProp, useNavigation } from '@react-navigation/native';
import { Button, FormControl, Image, Input, Text, View, WarningOutlineIcon, useColorModeValue } from 'native-base';
import { Entypo } from '@expo/vector-icons';
import ProductScreen from '../config/Screens';

type RouteProps = {
  route?: any
};

export default function DetailProduct({ route }: RouteProps) {
  const { data, config } = route.params;
  const navigation = useNavigation<CompositeNavigationProp<any, any>>();
  
  const [product, setProduct] = useState(data);
  
  const iconColor = useColorModeValue("light.200", "coolGray.800");

  return (
    <AppView
      withHeader
      title={data.name}
    >
      <View style={styles.container}>
        <FormControl w={'95%'} marginBottom={4}>
          <FormControl.Label>Image</FormControl.Label>
          <View flexDir={'row'} alignItems={'flex-end'}>
            <Image size={'xl'} borderRadius={10} source={{ uri: data.image }} alt={data.name} />
            <Button flexDir={'row'} colorScheme={'muted'} ml={5}>
              <Text>Change Image</Text>
            </Button>
          </View>
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            File harus berupa gambar.
          </FormControl.ErrorMessage>
        </FormControl>
        <FormControl w={'100%'} maxW={1600} marginBottom={4}>
          <FormControl.Label>Name</FormControl.Label>
          <Input placeholder="Nama Produk" defaultValue={product.name} isReadOnly={config.disabled}/>
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            Something is wrong.
          </FormControl.ErrorMessage>
        </FormControl>
        <FormControl w={'100%'} maxW={1600} marginBottom={5}>
          <FormControl.Label>Price</FormControl.Label>
          <Input placeholder="Price" defaultValue={data.price.toString()} isReadOnly={config.disabled}/>
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            Something is wrong.
          </FormControl.ErrorMessage>
        </FormControl>
        <FormControl w={'100%'} maxW={1600} marginBottom={5}>
          <FormControl.Label>Stock</FormControl.Label>
          <Input placeholder="Price" defaultValue={data.stock.toString()} isReadOnly={config.disabled}/>
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            Something is wrong.
          </FormControl.ErrorMessage>
        </FormControl>
        {
          config.disabled ? null : (
            <Button colorScheme={'primary'} maxW={1600} onPress={() => {
              Alert.alert('Save', 'Wanna Save?', [
                {
                  text: 'Cancel',
                  onPress: () => {},
                  style: 'cancel',
                },
                {text: 'Save', onPress: () => ProductScreen.PRODUCT.navigate(navigation)},
              ]);
            }}>
              <Text>Save</Text>
            </Button>)
        }
      </View>
    </AppView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
  },
});