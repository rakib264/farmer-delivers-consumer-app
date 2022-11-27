import { View, Text, Dimensions } from 'react-native';
import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CartScreen from './CartScreen.jsx';
import OfferScreen from './OfferScreen.jsx';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from './HomeScreen.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { getCartTotal } from '../redux/features/cartSlice.js';
import SignInScreen from './AccountScreen.jsx';

const windowHeight = Dimensions.get('screen').height;


const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  useEffect(() => {
    dispatch(getCartTotal());
  }, [cart, dispatch]);

  return (
    <Tab.Navigator
     screenOptions={({route}) => ({
        tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if(route.name === 'Home'){
                iconName = focused ? 'home' : 'home-outline';
            } else if(route.name === 'Offer'){
                iconName = focused ? 'flower' : 'flower-outline';
            } else if(route.name === 'Cart'){
                iconName = focused ? 'basket' : 'basket-outline';
            }else if(route.name === 'Account'){
                iconName = focused ? 'person' : 'person-outline';
            }
            return <Ionicons name={iconName} color={color} size={size} />
        },
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'white',
        headerShown: false,
        tabBarStyle: {backgroundColor: '#FD6A65'}
     })
    }
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Offer" component={OfferScreen} />
        <Tab.Screen name="Cart" component={CartScreen} options={{tabBarBadge: cart && cart.cartTotalQuantity, tabBarBadgeStyle: {backgroundColor: '#00ABB3', color: 'white',}}} />
        <Tab.Screen name="Account" component={SignInScreen} />
     </Tab.Navigator>
  )
}

export default BottomTabNavigator

