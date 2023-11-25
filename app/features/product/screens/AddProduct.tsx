import { Alert, StyleSheet } from 'react-native';
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import AppView from '~/app/core/component/AppView';
import { CompositeNavigationProp, useNavigation } from '@react-navigation/native';
import { Button, FormControl, Image, Input, Text, View, WarningOutlineIcon, useColorModeValue } from 'native-base';
import { Entypo } from '@expo/vector-icons';
import ProductScreen from '../config/Screens';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import { showLoading } from '~/app/core/utils/loader';
import { URL_PRODUCT } from '~/app/service/ApiServices';
import { AuthContext } from '~/app/core/config/AuthContext';
import InputForm, { inputHandle } from '~/app/core/component/InputForm';
import { formatNumberInput } from '~/app/core/utils/formatter-utils';

type RouteProps = {
  route?: any
};

export default function AddProduct({ route }: RouteProps) {
  const navigation = useNavigation<CompositeNavigationProp<any, any>>();

  const {authData} = useContext(AuthContext);
  
  const [product, setProduct] = useState({name: '', price: 0, stock: 0, image: ''});
  const [imageFile, setImageFile] = useState<any>(null);

  const priceRef = useRef<inputHandle>(null);
  const stockRef = useRef<inputHandle>(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImageFile(result.assets[0]);
      setProduct({...product, image: result.assets[0].uri});
    }
  };

  const saveProduct = async () => {

    // validation all field required
    if (product.name == '' || product.price == 0 || product.stock == 0 || imageFile == null) {
      Alert.alert('Error', 'All field required!');
      return;
    }

    showLoading(true);
    try {
      let localUri = imageFile.uri;
      let filename = localUri.split('/').pop();
      let match = /\.(\w+)$/.exec(filename);
      let type = match ? `image/${match[1]}` : `image`;

      const formData = new FormData();
      formData.append('name', product.name);
      formData.append('description', product.name);
      formData.append('price', product.price.toString());
      formData.append('stock', product.stock.toString());
      formData.append('image', { uri: localUri, name: filename, type });

      const promise = await axios({
        method: 'post',
        url: URL_PRODUCT,
        headers: {
          'Authorization': 'Bearer ' + authData.token,
          'Content-Type': 'multipart/form-data',
        },
        data: formData,
      });

      Alert.alert('Success', 'Product saved!', [
        {
          text: 'OK',
          onPress: () => ProductScreen.PRODUCT.navigate(navigation),
          style: 'cancel',
        },
      ]);
    
    } catch (error: any) {
      console.log(error.response);
      
      Alert.alert('Error', error.response?.data?.message ?? 'Something wrong!');
    } finally {
      showLoading(false);
    }

  }

  return (
    <AppView
      withHeader
      title='Add Product'
    >
      <View style={styles.container}>
        <FormControl w={'95%'} marginBottom={4}>
          <FormControl.Label>Image</FormControl.Label>
          <View flexDir={'row'} alignItems={'flex-end'}>
            <Image size={'xl'} borderRadius={10} source={{ uri: product.image != '' ? product.image : 'https://react.semantic-ui.com/images/wireframe/image.png' }} alt='image'/>
            <Button flexDir={'row'} colorScheme={'muted'} ml={5} onPress={pickImage}>
              <Text>Change Image</Text>
            </Button>
          </View>
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            File harus berupa gambar.
          </FormControl.ErrorMessage>
        </FormControl>
        <FormControl w={'100%'} maxW={1600} marginBottom={4}>
          <FormControl.Label>Name</FormControl.Label>
          <InputForm 
            placeholder="Nama Produk" 
            value={product.name} 
            onChangeText={val => setProduct({...product, name: val})} 
            onSubmitEditing={() => priceRef.current?.onFocus()}
            returnKeyType='next'
          />
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            Something is wrong.
          </FormControl.ErrorMessage>
        </FormControl>
        <FormControl w={'100%'} maxW={1600} marginBottom={5}>
          <FormControl.Label>Price</FormControl.Label>
          <InputForm 
            placeholder="Price" 
            value={product.price.toString()} 
            onChangeText={val => setProduct({...product, price: formatNumberInput(val)})}
            ref={priceRef}
            onSubmitEditing={() => stockRef.current?.onFocus()}
            returnKeyType='next'
            />
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            Something is wrong.
          </FormControl.ErrorMessage>
        </FormControl>
        <FormControl w={'100%'} maxW={1600} marginBottom={5}>
          <FormControl.Label>Stock</FormControl.Label>
          <InputForm 
            placeholder="Price" 
            value={product.stock.toString()} 
            onChangeText={val => setProduct({...product, stock: formatNumberInput(val)})}
            ref={stockRef}
            returnKeyType='done'
            />
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            Something is wrong.
          </FormControl.ErrorMessage>
        </FormControl>
        <Button colorScheme={'primary'} maxW={1600} onPress={() => {
          Alert.alert('Save', 'Wanna Save?', [
            {
              text: 'Cancel',
              onPress: () => {},
              style: 'cancel',
            },
            {text: 'Save', onPress: saveProduct},
          ]);
        }}>
          <Text>Save</Text>
        </Button>
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