import { Alert, StyleSheet, ScrollView, TouchableOpacity, BackHandler, Dimensions } from 'react-native';
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

const screenWidth = Dimensions.get('window').width;

const dummyList = [
  {
    id: 1,
    name: 'Masako Ayam',
    image: 'https://images.tokopedia.net/img/cache/700/attachment/2019/12/4/157539860879169/157539860879169_3f9ec97d-5fdd-4245-af20-2f7741279bc6.png',
    price: 2000,
    stock: 10,
  },
  {
    id: 2,
    name: 'Masako Sapi',
    image: 'https://images.tokopedia.net/img/cache/700/attachment/2019/12/4/157539860879169/157539860879169_3f9ec97d-5fdd-4245-af20-2f7741279bc6.png',
    price: 2000,
    stock: 10,
  },
];

export default function Product({ navigation }: { navigation: CompositeNavigationProp<any, any> }) {

  const [showOption, setShowOption] = useState(false);
  const bg = useColorModeValue("light.200", "coolGray.800");
  const toast = useToast();

  const [allProduct, setAllProduct] = useState(dummyList);
  const [filteredProduct, setFilteredProduct] = useState(allProduct);

  const [selectedProduct, setselectedProduct] = useState({
    id: 0,
    name: '',
    image: '',
    price: 0,
    stock: 0,
  })

  const [search, setSearch] = useState('');

  useEffect(() => {
    searchProduct();
  }, [search, allProduct]);

  const openSetting = (item: any) => {
    setselectedProduct(item);
    setShowOption(true);
  }

  const removeSelected = (id: number) => {
    setAllProduct(allProduct.filter((item) => item.id !== id));
    setShowOption(false);
    toast.show({
      title: "Product deleted",
      placement: "bottom",
      duration: 3000,
    })
  }

  const searchProduct = () => {
    setFilteredProduct(allProduct.filter((item) => item.name.toLowerCase().includes(search.toLowerCase())));
  }

  return (
    <AppView
      withHeader
      title='Product'
    >
      <AppSearchBar onSearch={(value) => setSearch(value)} defaultValue={search} />
      <View style={styles.container}>
        <ScrollView>
          {
            filteredProduct.map((item, index) => (
              <ProductBox
                key={index}
                name={item.name}
                image={item.image}
                price={item.price}
                stock={item.stock}
                onPress={() => openSetting(item)}
              />
            ))
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
    flexDirection: 'row',
    flexWrap: 'wrap',
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