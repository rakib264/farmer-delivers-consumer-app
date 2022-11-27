import { View, Text, StyleSheet, 
    TouchableOpacity, Pressable, Modal, Alert, 
    Dimensions, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
  
  
const screenWidth = Dimensions.get('window').width;

export const Location = () => {
  const [openModal, setOpenModal] = useState(false);
   
  let addressElements = {};
  let location;
  useEffect(async() => {
     location = await AsyncStorage.get('CurrentLocation')
  }, [])

  const { address, address_components, area_components, area, city, country, postCode } = location;
    if(address_components){
      address_components.forEach((element, index) => {
        addressElements['house'] = element.house;
        addressElements['road'] = element.road;
      });
    }
  
  const handleLocationBtn = () => {
    setOpenModal(!openModal);
  }
  return (
    <View>
      <Modal
          animationType='slide'
          transparent={true}
          visible={openModal}
          onRequestClose={() => {
            Alert.alert('Modal is closed')
            setOpenModal(!openModal)
          }}
          >
          <View style={styles.modalWrapper}>
            <View style={styles.modalView}>
            <View style={styles.firstWrapper}>
            <Text style={{fontSize: 22, fontWeight: 'bold'}}>Your Current Location: </Text>
            <Pressable style={styles.modalCancel} onPress={() => setOpenModal(!openModal)}>
              <Ionicons name='close' size={20} color='white' />
            </Pressable>
            </View>
            <Text style={{ fontSize: 16, paddingTop: 5}}>
              {
                location ? `${addressElements.house} ${addressElements.road} ${area} ${city} - ${postCode} ${country}` : 'Location not found'
               }
            </Text>

            </View>
          </View>
          </Modal>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Image source={require('../images/farmex_logo.png')}  style={{ width:140, height: 60 }} />  
          <TouchableOpacity style={styles.locationButton} onPress={handleLocationBtn}>
            <Text style={styles.buttonText}>Location</Text>
          </TouchableOpacity>
          </View>
    </View>
  )
}

const styles = StyleSheet.create({
    modalWrapper: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: 95
    },
    modalView: {
     width: screenWidth - 100,
     height: 120,
     paddingHorizontal: 10,
     paddingVertical: 20,
     backgroundColor: '#f3f3f3',
     shadowOpacity: 0.25,
     shadowOffset: {
      width: 2,
      height: 5
     },
     shadowColor: 'blue',
     shadowRadius: 4,
     elevation: 5,
     borderRadius: 10,
     borderWidth: 1,
     borderColor: '#30E3CA'
    },
    firstWrapper:{
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    modalCancel:{
      width: 30,
      height: 30,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 5,
      borderRadius: 100,
      backgroundColor: '#FF5858',
    },
    locationButton: {
      backgroundColor: '#FD6A65',
      alignItems: 'center',
      justifyContent: 'center',
      width: 100,
      height: 40,
      borderColor: '#00ADB5',
      borderRadius: 10,
    },
    buttonText: {
      color: 'white',
      fontSize: 18,
      fontWeight: '600'
    }
  })

