import { View, Text, SafeAreaView, StyleSheet, ScrollView, TouchableOpacity, Alert, Image, Dimensions } from 'react-native'
import React, { useEffect } from 'react'
import GlobalSafeareaStyle from '../utils/GlobalSafeareaStyle';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, decrementQuantity, getCartTotal, incrementQuantity, removeFromCart } from '../redux/features/cartSlice';
import { withSafeAreaInsets } from 'react-native-safe-area-context';

const screenWidth = Dimensions.get('window').width

const CartScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const cart = useSelector(state => state.cart)

  const onTapBack = () => {
    navigation.goBack()
 }
  const onTapClearCart = () => {
    dispatch(clearCart())
  }

  const backToHome = () => {
    navigation.navigate('Home')
  }

  const handleRemoveFromCart = (item) => {
    dispatch(removeFromCart(item))
  }

  const handleIncrement = (item) => {
    dispatch(incrementQuantity(item))
  }

  const handleDecrement = (item) => {
    dispatch(decrementQuantity(item))
  }

  useEffect(() => {
    dispatch(getCartTotal())
  }, [cart, dispatch]);

  return (
    <SafeAreaView style={GlobalSafeareaStyle.androidSafeArea}>
   <ScrollView>
    <View style={styles.container}>
      <View style={styles.wrapper}>
      <View style={styles.firstWrapper}>
        <TouchableOpacity style={styles.backButton} onPress={onTapBack}>
            <Ionicons name='chevron-back' size={30} color="#474E68" />
        </TouchableOpacity>
        <View style={styles.cartItemWrapper}>
        <TouchableOpacity style={styles.backButton} onPress={onTapBack}>
            <Ionicons name='person' size={30} color="#474E68" />
        </TouchableOpacity>
        <Text style={styles.cartText}>My Cart</Text>
        </View>
        <TouchableOpacity style={styles.backButton} onPress={onTapClearCart}>
            <Ionicons name='close' size={30} color="#FD6A65" />
        </TouchableOpacity>
      </View>
      <View>
        {
          cart.cartItems && cart.cartItems.map(item => (
            <View key={item._id} style={styles.secondWrapper}>
        <View style={styles.cartItemWrapper}>
          <View style={styles.imageContainer}>
            {
              item && (
                <Image source={{uri: item.images[0]}} 
                   style={styles.cartImage} resizeMode = 'contain' />
              )
            }
          </View>
          <View style={styles.textWrapper}>
            <Text style={styles.productText}>{item.name}</Text>
            <Text style={styles.categoryText}>{item.category}</Text>
            <Text style={{color: '#FD6A65', fontSize: 20, paddingTop: 6}}>৳ <Text style={styles.priceText}>{item.price}</Text></Text>
          </View>
          <View style={{paddingVertical: 10}}>
              <View style={{}}>
              <View style={styles.flexItemsCenterWrapper}>
                <TouchableOpacity style={styles.incdecIconStyle} onPress={() => handleIncrement(item)}>
                <Ionicons name="add" size={20} color='white' />
                </TouchableOpacity>
                  <Text style={{fontSize: 16, paddingVertical: 10}}>{item.quantity}</Text>
                <TouchableOpacity style={styles.incdecIconStyle} onPress={() => handleDecrement(item)}>
                <Ionicons name="remove" size={20} color='white' />
                </TouchableOpacity>
              </View>
              
              </View>
          </View> 
          <TouchableOpacity style={styles.backButton} onPress={() => handleRemoveFromCart(item)}>
              <Ionicons name='close' size={30} color="#FD6A65" />
          </TouchableOpacity>
        </View>
      </View>
          ))
        }
      </View>
      <View>
      {
        cart.cartItems.length > 0 && (
      <View>
      <View style={styles.secondWrapperExtended}>
       <View>
       <View style={styles.cartItemWrapper}>
        <Text style={{fontSize: 18}}>Total Items</Text>
        <Text style={{fontSize: 18, fontWeight: 'bold'}}>
        { cart.cartTotalQuantity}
        </Text>
       </View>
       </View>
      <View>
     <View style={{paddingVertical: 4}}>
     <View style={styles.cartItemWrapper}>
        <Text style={{fontSize: 18}}>Delivery Fee</Text>
        <Text style={{fontSize: 18, fontWeight: 'bold'}}>৳ 60</Text>
      </View>
     </View>
      </View>
       <View style={{paddingVertical: 4}}>
       <View  style={styles.cartItemWrapper}>
        <Text style={{fontSize: 18}}>SubTotal</Text>
        <Text style={{fontSize: 18, fontWeight: 'bold'}}>৳ {cart.cartTotalPrice}</Text>
       </View>
       </View>
      <View style={{borderTopWidth: 2, borderTopColor: '#FD6A65', paddingVertical: 5}}>
      <View  style={styles.cartItemWrapper}>
        <Text style={{fontSize: 18, fontWeight: 'bold', color: '#FD6A65'}}>Total(Inc. Vat)</Text>
        <Text style={{fontSize: 18, fontWeight: 'bold', color: '#FD6A65'}}>
        ৳ {cart.cartTotalPrice + 60}
        </Text>
       </View>
      </View>
      </View>
      <TouchableOpacity style={styles.addToBagBtn}>
        <View style={{ flexDirection: 'row' , alignItems: 'center', justifyContent: 'space-between'}}>
          <Text style={{fontSize: 18, fontWeight: 'bold', color: 'white'}}>Proceed to Checkout</Text>
          <Ionicons name="chevron-forward" size={26} color="white" />
        </View>
      </TouchableOpacity>
      </View>
        )
      }
      </View>
      <View>
      {
        cart.cartItems.length === 0 && (
          <View style={styles.flexItemsCenterWrapper}>
            <Text style={{fontWeight: 'bold', fontSize: 20, paddingVertical: 10}}>Cart is empty</Text>
            <TouchableOpacity style={styles.emptyCartBtn} onPress={backToHome}>
            <Text style={{color: 'white', fontSize: 20}}>Order Now</Text>
            </TouchableOpacity>
          </View>
        )
      }
      </View>
    </View>
    </View>
   </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFF',
    paddingHorizontal: 15
},
  wrapper: {
    backgroundColor: 'white',
    borderRadius: 20
  },
firstWrapper: {
   paddingHorizontal: 15,
   paddingVertical: 10,
   borderRadius: 10,
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
secondWrapper:{
  width: '100%',
  height: 140,
  backgroundColor: '#F8F8F8', 
  marginVertical: 2,  //#F8F8F8
  padding: 10,
  shadowColor: 'black',
  shadowOpacity: 0.4,
  elevation: 6,
  shadowRadius: 2 ,
  shadowOffset : { width: 1, height: 2},
  borderRadius: 10
},
cartItemWrapper:{
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
},
imageContainer:{
  width: 120,
  height: 110,
},
cartImage:{
  width: 120,
  height: 110,
},
textWrapper:{
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
},
productText:{
  fontSize: 22,
  fontWeight: 'bold',
},
cartText:{
  fontSize: 22,
  paddingLeft: 10,
  color: '#3C4048',
},
priceText: {
  fontSize: 26,
  fontWeight: 'bold',
},
categoryText:{
  fontSize: 16,
  fontWeight: 'bold',
  color: '#3C4048',
},
flexItemsCenterWrapper:{
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-between',
},
incdecIconStyle:{
  backgroundColor: '#FD6A65',
  width: 30,
  height: 30,
  borderRadius: 100,
  alignItems: 'center',
  justifyContent: 'center',
  shadowColor: 'black',
  shadowOpacity: 0.2,
  elevation: 6,
  shadowRadius: 2 ,
  shadowOffset : { width: 1, height: 2},
},

emptyCartBtn:{
  backgroundColor: '#FD6A65',
  width: 150,
  height: 60,
  borderRadius: 10,
  alignItems: 'center',
  justifyContent: 'center',
  shadowColor: 'black',
  shadowOpacity: 0.2,
  elevation: 6,
  shadowRadius: 2 ,
  shadowOffset : { width: 1, height: 2},
},
secondWrapperExtended:{
  width: '100%',
  height: 145,
  backgroundColor: '#FFEFEC', 
  marginVertical: 2,  //#F8F8F8
  padding: 10,
  shadowColor: 'black',
  shadowOpacity: 0.4,
  elevation: 6,
  shadowRadius: 2 ,
  shadowOffset : { width: 1, height: 2},
  borderRadius: 10,
  paddingHorizontal: 20,
  paddingVertical: 15
},
addToBagBtn:{
  width: screenWidth * .88,
  height: 60,
  paddingVertical: 10,
  backgroundColor: '#FD6A65',
  borderRadius: 20,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  marginLeft: 10,
  marginTop: 10
},


})
export default CartScreen