import { Alert, StyleSheet, ScrollView, TouchableOpacity, BackHandler, Dimensions, ActivityIndicator } from 'react-native';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import AppView from '~/app/core/component/AppView';
import { CompositeNavigationProp, useFocusEffect } from '@react-navigation/native';
import { Text, Image, Input, View, Actionsheet, Box, Icon, useDisclose, Button, useColorModeValue, useToast } from 'native-base';
import { Entypo, AntDesign, SimpleLineIcons, MaterialIcons } from '@expo/vector-icons';
import { Path } from 'react-native-svg';
import ProductBox from '../components/ProductBox';
import Modal from "react-native-modal";
import AppSearchBar from '~/app/core/component/AppSearchBar';
import ProductScreen from '../config/Screens';
import axios from 'axios';
import { URL_PRODUCT } from '~/app/service/ApiServices';
import { AuthContext } from '~/app/core/config/AuthContext';
// showLoading as showFullLoading
import { showLoading as FullLoading } from '~/app/core/utils/loader';

const screenWidth = Dimensions.get('window').width;
type ProductStateType = {
  id: number,
  name: string,
  image: string,
  price: number,
  stock: number,
};

export default function Product({ navigation }: { navigation: CompositeNavigationProp<any, any> }) {

  const { authData } = useContext(AuthContext);

  const [showOption, setShowOption] = useState(false);
  const bg = useColorModeValue("light.200", "coolGray.800");
  const toast = useToast();
  const iconColor = useColorModeValue('black', 'white');
  const [showLoading, setShowLoading] = useState(false);

  const [allProduct, setAllProduct] = useState<ProductStateType[]>([]);

  const [selectedProduct, setselectedProduct] = useState({
    id: 0,
    name: '',
    image: '',
    price: 0,
    stock: 0,
  })

  const [search, setSearch] = useState('');

  const openSetting = (item: any) => {
    setselectedProduct(item);
    setShowOption(true);
  }

  const removeSelected = async(id: number) => {

    FullLoading(true);

    try {
      const res = await axios({
        method: 'DELETE',
        url: URL_PRODUCT + '/' + id,
        headers: {
          'Authorization': `Bearer ${authData.token}`
        },
      });

      getData();
      toast.show({
        title: "Product deleted",
        placement: "bottom",
        duration: 3000,
      })
      
    } catch (e:any) {
      toast.show({
        title: "Error",
        placement: "bottom",
        duration: 3000,
      });

    } finally {
      setShowOption(false);
      FullLoading(false);
    }

  }

  const filterProduct = (arr: any[], findText: string) => {
    return arr.filter((item) => item.name.toLowerCase().includes(findText.toLowerCase()));
  }

  useFocusEffect(
    useCallback(() => {
      getData();
    }, [])
  );

  const getData = async () => {
    setShowLoading(true);
    try {
      console.log('request');

      const promise = await axios({
        method: 'get',
        url: URL_PRODUCT,
        timeout: 15000,
        headers: {
          'Authorization': `Bearer ${authData.token}`,
        },
        params: {
          keyword: search,
        },
      });

      console.log('done');
      console.log(promise.data);
      
      const data = promise.data.data;

      setAllProduct(data);
      
    } catch (error:any) {
      
      console.log({
        keyword: '',
      });
      console.log(error.response.data);
    }
    setShowLoading(false);
  }

  return (
    <AppView
      withHeader
      title='Products'
      suffixHeader={
        <TouchableOpacity onPress={() => ProductScreen.ADD_PRODUCT.navigate(navigation)}>
          <Entypo name="plus" size={24} color={iconColor} />
        </TouchableOpacity>
      }
    >
      <AppSearchBar onSearch={(value) => setSearch(value)} defaultValue={search} />
      <View style={styles.container}>
        {
          showLoading && (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <ActivityIndicator size="large" color={iconColor} />
            </View>
          )
        }
        <ScrollView
          showsVerticalScrollIndicator={false}
        >
          { 
            !showLoading && (( filterProduct(allProduct, search).length >= 0 ) ?
            filterProduct(allProduct, search).map((item, index) => (
              <ProductBox
                key={index}
                name={item.name}
                image={item.image}
                price={item.price}
                stock={item.stock}
                onPress={() => openSetting(item)}
              />
            )) : (<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Text>No Product Found</Text>
            </View>))
          }
        </ScrollView>
      </View>
      <Modal 
        style={styles.modalView}
        onBackdropPress={() => setShowOption(false)}
        deviceHeight={Dimensions.get('screen').height}
        swipeDirection={['down']}
        onSwipeComplete={() => setShowOption(false)}
        coverScreen={false}
        useNativeDriverForBackdrop
        isVisible={showOption}>
        <View style={styles.content} bgColor={bg}>
          <View style={styles.contentLine} />
            <Box w="100%" h={60} px={4} justifyContent="center" >
              <Text fontSize="16" color="gray.500" _dark={{
              color: "gray.300"
            }}>
                {selectedProduct.name}'s Settings
              </Text>
            </Box>
          <TouchableOpacity style={styles.contentButton} 
          onPress={() => {
            ProductScreen.DETAIL_PRODUCT.navigate(navigation, {data: selectedProduct, config: {disabled: true}});
            setShowOption(false);
          }}>
            <Icon as={MaterialIcons} size="5" name="remove-red-eye"/>
            <Text fontSize={'sm'} paddingLeft={2}>View</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.contentButton}
          onPress={() => {
            ProductScreen.DETAIL_PRODUCT.navigate(navigation, {data: selectedProduct, config: {disabled: false}});
            setShowOption(false);
          }}>
            <Icon as={MaterialIcons} size="5" name="edit" />
            <Text fontSize={'sm'} paddingLeft={2}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.contentButton}
          onPress={() => {
            Alert.alert(
              "Delete Product",
              "Are you sure want to delete this product?",
              [
                {
                  text: "Cancel",
                  onPress: () => setShowOption(false),
                  style: "cancel"
                },
                { text: "OK", onPress: () => removeSelected(selectedProduct.id) }
              ]
            );
            setShowOption(false);
          }}>
            <Icon as={MaterialIcons} size="5" name="delete" />
            <Text fontSize={'sm'} paddingLeft={2}>Delete</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.contentButton} onPress={() => setShowOption(false)}>
            <Icon viewBox="0 0 24 24" size="5" fill="none">
              <Path d="M12.0007 10.5862L16.9507 5.63623L18.3647 7.05023L13.4147 12.0002L18.3647 16.9502L16.9507 18.3642L12.0007 13.4142L7.05072 18.3642L5.63672 16.9502L10.5867 12.0002L5.63672 7.05023L7.05072 5.63623L12.0007 10.5862Z" />
            </Icon>
            <Text fontSize={'sm'} paddingLeft={2}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </AppView>
  )
}

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal:  (screenWidth * 0.4) / 35,
    marginBottom: 20,
  },
  container: {
    flex: 1,
    marginHorizontal:  (screenWidth / 2.5) / 10,
  },
  modalView: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  content: {
    justifyContent: 'center',
    borderRadius: 20,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    alignContent: 'center',
    paddingTop: 10,
    paddingBottom: 20,
  },
  contentButton: {
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  contentTitle: {
    fontSize: 20,
    marginLeft: 15,
  },
  contentLine: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    width: '20%',
    height: 5,
    alignSelf: 'center',
    borderRadius: 10,
  },
});