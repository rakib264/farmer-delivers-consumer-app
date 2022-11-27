import { View, Text, SafeAreaView, StyleSheet, 
  TouchableOpacity, Pressable, Modal, Alert, 
  Dimensions, Image, ScrollView, Button,  } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import GlobalSafeareaStyle from '../utils/GlobalSafeareaStyle';
import { onAvailableFarms } from '../redux';
import { Category } from '../coms/Category.js';
import { Vendor } from '../coms/Vendor.js';
import { Location } from '../coms/Location.js';
import { Search } from '../coms/Search.js';

import Carousel from '../coms/carousel/Carousel.jsx'
import { dummyData } from '../coms/carousel/data.js'


const screenWidth = Dimensions.get('window').width;

const HomeScreen = ({ navigation }) => {
  // const userInfo = useSelector(state => state.user);
  const shoppingData = useSelector(state => state.shopping);
  // console.log(shoppingData)
  
  const dispatch = useDispatch();
 
    useEffect(() => {
      dispatch(onAvailableFarms()); 
    },[])

  return (
      <SafeAreaView style={GlobalSafeareaStyle.androidSafeArea}>
        
       
       <ScrollView style={styles.container}>
          {/* <Location /> */}
          <Search navigation={navigation} />
          <Category navigation={navigation} />
          <Carousel data = {dummyData}/>
          <Vendor shoppingData={shoppingData} navigation={navigation} />
          <Button title="Login" onPress={ () => navigation.navigate('LoginStack') } />
        </ScrollView>

      </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFF', //F8FAFF
    paddingHorizontal: 5
  },
  
})