import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice } from "@reduxjs/toolkit";

// import axios from "axios";
// import { BASE_URL } from "../../utils/credentials";

import Toast from 'react-native-toast-message';

const initialState = {
    cartItems: [],
    cartTotalQuantity: 0,
    cartTotalPrice: 0
}

const cartSlice = createSlice({
    name: 'cartSlice',
    initialState,
    reducers:{
        addToCart: (state, action) => {
            const itemInCart = state.cartItems.find((item) => item._id === action.payload._id);
            if (itemInCart) {
              itemInCart.quantity++;
            } else {
              state.cartItems.push({ ...action.payload, quantity: 1 });
            }
            Toast.show({
                type: 'success',
                text1: 'Add',
                text2: 'Product added to cart',
                position: 'top',
                visibilityTime: 2000,
                autoHide: true
              });  
            // await AsyncStorage.setItem('cartItems', JSON.stringify(state.cartItems)) 
          },
        removeFromCart: (state, action) => {
            const nextCartItems = state.cartItems.filter(
                item => item._id !== action.payload._id
                );
            state.cartItems = nextCartItems; 
            Toast.show({
                type: 'error',
                text1: 'Remove',
                text2: 'Product removed from cart',
                position: 'top',
                visibilityTime: 2000,
                autoHide: true
              });  
            // await AsyncStorage.setItem('cartItems', JSON.stringify(state.cartItems))   
        },
        incrementQuantity: (state, action) => {
            const item = state.cartItems.find((item) => item._id === action.payload._id);
            item.quantity++;
            Toast.show({
                type: 'info',
                text1: 'Increased',
                text2: 'Product quantity increased',
                position: 'top',
                visibilityTime: 2000,
                autoHide: true
              });  
            // await AsyncStorage.setItem('cartItems', JSON.stringify(state.cartItems))   
          },
        decrementQuantity: (state, action) => {
        const item = state.cartItems.find((item) => item._id === action.payload._id);
        if (item.quantity === 1) {
            item.quantity = 1
        } else {
            item.quantity--;
        }
        Toast.show({
            type: 'error',
            text1: 'Decreased',
            text2: 'Product quantity decreased',
            position: 'top',
            visibilityTime: 2000,
            autoHide: true
          });  
        // await AsyncStorage.setItem('cartItems', JSON.stringify(state.cartItems))   
        },
        getCartTotal: (state, action) => {
            let { total, quantity } = state.cartItems.reduce((cartTotal, cartItem) => {
                cartTotal.total += cartItem.quantity * cartItem.price
                cartTotal.quantity += cartItem.quantity

                return cartTotal;
            },{
                total: 0,
                quantity: 0
            })
            state.cartTotalQuantity = quantity;
            state.cartTotalPrice = total;
            // await AsyncStorage.setItem('catTotalQty', JSON.stringify(state.cartTotalQuantity))   
            // await AsyncStorage.setItem('catTotalPrice', JSON.stringify(state.cartTotalPrice))   
        },
        clearCart: (state, action) => {
            state.cartItems = []
            Toast.show({
                type: 'error',
                text1: 'Empty cart',
                text2: 'Cart has no items available',
                position: 'top',
                visibilityTime: 2000,
                autoHide: true
              });  
            // await AsyncStorage.setItem('cartItems', JSON.stringify(state.cartItems))   
        }
    },
    extraReducers:{

    }
    
})

export const { addToCart, removeFromCart, incrementQuantity, decrementQuantity, getCartTotal, clearCart } = cartSlice.actions;

export default cartSlice.reducer;