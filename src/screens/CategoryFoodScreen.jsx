import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Product} from '../coms/Product.js'
import GlobalSafeareaStyle from '../utils/GlobalSafeareaStyle';
import { Ionicons } from '@expo/vector-icons';
import { getCartTotal } from '../redux/features/cartSlice';


const CategoryFoodScreen = ({ navigation, route }) => {
    const data = useSelector(state => state.shopping);
    const cart = useSelector(state => state.cart);
    const categoryName = route.params.categoryName;
    const dispatch = useDispatch();

    const onTapBack = () => {
      navigation.goBack()
    }

    const onTapCart = () => {
      navigation.navigate('CartStack')
    }

    useEffect(() => {
      dispatch(getCartTotal())
    }, [cart, dispatch]);

  return (
    <SafeAreaView style={GlobalSafeareaStyle.androidSafeArea}>
        <View style={styles.container}>
        <View style={styles.itemsCenter}>
        <TouchableOpacity style={styles.backButton} onPress={onTapBack}>
            <Ionicons name='chevron-back' size={30} color="#474E68" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.cartBtn} onPress={onTapCart}>
            <Ionicons name="basket" size={35} color="white" />
            <View style={styles.badgeStyle}>
            <Text style={{color: 'white', fontWeight: 'bold', fontSize: 14,}}>{cart && cart.cartTotalQuantity}</Text>
            </View>
        </TouchableOpacity>
        </View>
          <View style={{ paddingVertical: 15, flex: 1}}>
          <Text style={styles.textItem}>Category: { categoryName } </Text>
            <Product productData={data.allVendorFoods} navigation={navigation} />
          </View>
        </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10
    },
    textItem:{
      fontSize: 24,
      fontWeight: 'bold',
      paddingBottom: 10,
      paddingHorizontal: 5,
  },
  itemsCenter:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  cartBtn: {
    width: 60,
    height: 60,
    backgroundColor: '#FD6A65',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    zIndex: 1
  },
  badgeStyle: {
    position: 'absolute', 
    top: 5, 
    right: 4, 
    width: 25, 
    height: 25,
    backgroundColor: '#00ABB3',
    borderRadius: 100, 
    alignItems: 'center', 
    justifyContent:'center',
    padding: 2  
  }
})

export default CategoryFoodScreen