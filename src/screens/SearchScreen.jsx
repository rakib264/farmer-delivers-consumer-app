import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, Alert, Button, Dimensions } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import {Product} from '../coms/Product.js'
import GlobalSafeareaStyle from '../utils/GlobalSafeareaStyle';
import {Search} from '../coms/Search.js';
import { Ionicons } from '@expo/vector-icons';


const {width, height} = Dimensions.get('window')

const SearchScreen = ({ navigation }) => {
    const data = useSelector(state => state.shopping);
    // const cart = useSelector(state => state.cart);

    const onTapBack = () => {
        navigation.goBack();
    }

  return (
    <SafeAreaView style={GlobalSafeareaStyle.androidSafeArea}>
      
       <View style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={onTapBack}>
                    <Ionicons name='chevron-back' size={30} color="#474E68" />
        </TouchableOpacity>
       <Search navigation={navigation} />
        <View style={styles.secondWrapper}>
            <Text style={styles.textStyle}>Search Results : {data && data.searchItems.length} </Text>
            <Product productData={data.searchItems} navigation={navigation} />
        </View>
       </View>     
   </SafeAreaView>
  )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        width: '100%',
        paddingHorizontal: 5  
    },
    backButton:{
        backgroundColor: "white",
        width: 40,
        height: 40,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: 'black',
        shadowOpacity: 0.2,
        elevation: 6,
        shadowRadius: 2 ,
        shadowOffset : { width: 1, height: 2},
    },
    secondWrapper:{
        flex: 1,
        paddingTop: 10,
    },
    textStyle:{
        fontSize: 24,
        fontWeight: 'bold',
        paddingBottom: 10,
        color: '#3C4048',
        paddingLeft: 5
    }
})

export default SearchScreen