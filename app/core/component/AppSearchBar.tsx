import { Input, View } from 'native-base';
import React, { useState } from 'react';
import { Entypo, AntDesign } from '@expo/vector-icons';
import { StyleSheet, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

type Props = {
  onSearch: (text: string) => void;
  placeholder?: string;
  defaultValue?: string;
};

export default function AppSearchBar({ onSearch, placeholder, defaultValue }: Props) {

  const [search, setSearch] = useState(defaultValue??'');

  return (
    <View style={styles.searchContainer}>
      <Entypo name="magnifying-glass" size={24} color="grey" style={{ marginRight: -30 }} />
      <Input 
        variant="rounded" 
        w={'85%'} maxW={1000} 
        placeholder={placeholder??'search'} 
        style={{ paddingLeft: 30 }} 
        // value={search} 
        defaultValue={defaultValue??''}
        fontSize='sm' 
        onChangeText={(value) => onSearch(value)}
        // onChangeText={(value) => setSearch(value)} 
        // inputMode='search'
        // onEndEditing={() => onSearch(search)}
        />
      <AntDesign name="filter" size={24} color="grey" style={{ marginLeft: 10 }}/>
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal:  (screenWidth * 0.4) / 35,
    marginBottom: 20,
  },
});