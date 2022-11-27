import { View, Text, ScrollView, FlatList, TouchableOpacity, Dimensions, StyleSheet, Image, ImageBackground, Alert } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'

const screenWidth = Dimensions.get('window').width

export const Vendor = ({ shoppingData, navigation }) => {


    const onTap = (item) => {
       
         navigation.navigate('VendorStack', { itemData: item })
    }

    const renderItem = ({item}) => {
        return (
            <TouchableOpacity style={styles.itemWrapper} onPress={() => onTap(item)} >
                <ImageBackground source={require('../images/farms/farm4.jpeg')} resizeMode="cover" style={styles.vendorImage}>
                  <View style={styles.textWrapper}>
                     <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                        <Text style={styles.textVendorName}>{item.name}</Text>
                        <Text style={styles.textRating} >Rating: {item.rating}</Text>
                     </View>
                     <Text style={styles.textService}>ServiceAvailable : ON</Text>
                  </View>
                </ImageBackground>
    
            </TouchableOpacity>
        )
    }

  return (
    <View style={styles.container}>
      <View style={styles.subWrapper}>
      <Text style={styles.ventorText}>Nearby Farms</Text>
      <View style={styles.semiSubWrapper}>
        <Ionicons style={{paddingRight: 5}} name="location-outline" size={24} color="#f12711" />
        <Text style={styles.location}>Hazaribagh</Text>
      </View>
      </View>
      <ScrollView>
            <FlatList
            data={shoppingData.availability}
            renderItem={renderItem}
            keyExtractor={(item) => item._id}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
             />
      </ScrollView>

    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        paddingVertical: 10
    },
    itemWrapper:{
        width: screenWidth - 40,
        height: 280,
        borderRadius: 20,
        borderColor: '#FD6A65',
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 5
    },
    subWrapper:{
        paddingHorizontal: 20,
        paddingVertical: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    semiSubWrapper:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    ventorText:{
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    }
    ,
    vendorImage:{
        width: '100%',
        height: 260,
        position: 'relative',
        borderRadius: 20
    },
    textWrapper:{
        position: 'absolute',
        top: '62%',
        left: 0,
        backgroundColor: '#111',
        width: '100%',
        height: 105,
        opacity: 0.8,
        paddingHorizontal: 20,
        paddingVertical: 20,
        borderRadius: 20
    },
    textVendorName:{
        color: 'white',
        fontSize: 22,
        fontWeight: 'bold'
    },
    textRating:{
        color: 'white',
        fontSize: 22,
        fontWeight: 'bold'
    },
    textService:{
        paddingTop: 10,
        color: 'white',
        fontSize: 22,
        fontWeight: 'bold'
    },
    location:{
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold'
    }
    
})

