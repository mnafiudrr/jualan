import { StyleSheet, ScrollView, Dimensions, ActivityIndicator } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import AppView from '~/app/core/component/AppView';
import { CompositeNavigationProp } from '@react-navigation/native';
import { Text, View, useColorModeValue, useToast } from 'native-base';
import ProductBox from '../components/ProductBox';
import AppSearchBar from '~/app/core/component/AppSearchBar';
import axios from 'axios';

const screenWidth = Dimensions.get('window').width;

export default function Sale({ navigation }: { navigation: CompositeNavigationProp<any, any> }) {

  const [showLoading, setShowLoading] = useState(false);
  const iconColor = useColorModeValue('black', 'white');

  type ProductStateType = {
    id: number;
    name: string;
    image: string;
    price: number;
    stock: number;
    qty: number;
  };
  const [allProduct, setAllProduct] = useState<ProductStateType[]>([]);

  const [search, setSearch] = useState('');
  
  const filterProduct = (arr: any[], findText: string) => {
    const searchText = findText.toLowerCase();
    return arr.filter((item) => item.name.toLowerCase().indexOf(searchText) !== -1);
  };

  useEffect(() => {
    getData();
  },[]);

  const getData = async () => {
    setShowLoading(true);
    try {
      const response = await axios({
        method: 'get',
        url: `https://fakestoreapi.com/products?limit=50`,
        timeout: 15000,
      });

      const data = response.data.map((item: any) => {
        return { ...item, stock: Math.floor(Math.random() * 2000), name: item.title, price: item.price*1000, qty: 0};
      });

      setAllProduct(data);
    } catch (error) {
      console.log(error);
      
    }
    setShowLoading(false);
  }

  const updateQty = useCallback(
    (item: { id: number; qty: number }) => {
      setAllProduct((prevProducts) =>
        prevProducts.map((product) =>
          product.id === item.id ? { ...product, qty: item.qty } : product
        )
      );
    },
    []
  );
  
  return (
    <AppView
      withHeader
      title='Sale'
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
          { !showLoading && (
            filterProduct(allProduct, search).length > 0 ? 
            filterProduct(allProduct, search).map((item: any, index) => (
              <ProductBox
                key={index}
                id={item.id}
                name={item.name}
                image={item.image}
                price={item.price}
                stock={item.stock}
                qty={item.qty}
                onUpdate={(val) => updateQty(val)}
              />
            )) : 
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Text>No Data</Text>
            </View>
          )}
        </ScrollView>
      </View>
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
