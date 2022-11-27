import { View, Text, SafeAreaView, StyleSheet, Dimensions, Image, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import GlobalSafeareaStyle from '../utils/GlobalSafeareaStyle';
import { Ionicons } from '@expo/vector-icons';
import {Product} from '../coms/Product.js';
import { useDispatch, useSelector } from 'react-redux';
import { getCartTotal } from '../redux/features/cartSlice';

const screenWidth = Dimensions.get('window').width

const VendorScreen = ({ navigation, route }) => {
    const itemData = route.params.itemData;
    const cart = useSelector(state => state.cart);
    const dispatch = useDispatch();
   // console.log(itemData)

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
       {
        itemData && (
            <View style={styles.container} >
            <View style={styles.firstWrapper}>
             <Image source={require('../images/farms/farm5.jpeg')} style={styles.vendorImage} />
             <TouchableOpacity style={styles.backButton} onPress={onTapBack}>
                <Ionicons name='chevron-back' size={30} color="#474E68" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.cartBtn} onPress={onTapCart}>
                <Ionicons name="basket" size={35} color="white" />
                <View style={styles.badgeStyle}>
                <Text style={{color: 'white', fontWeight: 'bold', fontSize: 14,}}>{cart && cart.cartTotalQuantity}</Text>
                </View>
            </TouchableOpacity>
             <View style={styles.textWrapper}>
                 <Text style={styles.vendorText}>{itemData.name}</Text>
                 <Text style={styles.vendorText}>Fresh Foods(Farm to Fork)</Text>
             </View>
            </View>
            <View style={styles.secondWrapper}>
             <Text style={styles.textItem}>Overview</Text>
             <View style={styles.ratingWrapper}>
                 <Ionicons style={{ paddingRight: 5}} name="star-half" size={26} color='orange' />
                 <Text style={styles.textItem}>{itemData.rating} - (123)</Text>
             </View>
            </View>
            <View style={styles.thirdWrapper}>
             <Text style={{ fontSize: 24, fontWeight: 'bold', paddingBottom: 10}}>Products</Text>
             <Product productData={itemData.foods} navigation={navigation} />
            </View>
         </View>
        )
       }
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    firstWrapper:{
        width: screenWidth,
        height: 300,
    },
    vendorImage: {
        width: '100%',
        height: '100%',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        position: 'relative'
    },
    backButton:{
        position: 'absolute',
        left: 10,
        top: '5%',
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
    textWrapper:{
        position: 'absolute',
        left: 0,
        top: '65%',
        width: '100%',
        height: 105,
        backgroundColor: '#111',
        opacity: 0.6,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 15
    },
    vendorText: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold'
    },
    secondWrapper:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingVertical: 15,
        borderBottomWidth: 1
    },
    textItem:{
        fontSize: 24,
        fontWeight: 'bold'
    },
    ratingWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    thirdWrapper:{
        flex: 1,
        paddingHorizontal: 10,
        paddingVertical: 15,
        paddingBottom: 20
    },
    cartBtn: {
        position: 'absolute',
        left: '83%',
        top: '-95%',
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


export default VendorScreen