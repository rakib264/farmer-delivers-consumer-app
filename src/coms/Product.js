import { View, Text, FlatList, TouchableOpacity, Dimensions, Alert, StyleSheet, Image, ScrollView, Button } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/features/cartSlice';

const screenWidth = Dimensions.get('window').width;

const imageWrapperWidth = screenWidth/2.0;


export const Product = ({navigation, productData}) => {
    const dispatch = useDispatch();
    // console.log(`Product: ${productData}`)

    const renderItem = ({ item }) => {

        const onProductTap = (item) => {
            navigation.navigate('ProductStack', { itemData: item})
        }

        const handleAddToCart = (item) => {
            dispatch(addToCart(item))
        }

        const onTap = () => {
            Alert.alert('Product Tapped')
        }

        return(
            <TouchableOpacity style={{ cursor: 'pointer'}} onPress={() => onProductTap(item)}>
                <View style={styles.container}>
                <View style={{padding: 5}}>
                <TouchableOpacity style={styles.backButton} onPress={onTap}>
                <Ionicons name='heart-outline' size={25} color="#FD6A65" />
                </TouchableOpacity>
                </View>
                {
                    item && (
                        <Image source={{uri : item.images[0]}} 
                       resizeMode='cover' style={styles.productImage} />
                    )
                }
                <View style={{paddingHorizontal: 15, paddingVertical: 8}}>
                    <View style={styles.productWrapper}>
                    <Text style={styles.productText}>{item.name}</Text>
                    </View>
                    <View style={styles.catePriceWrapper}>
                    <Text style={styles.categoryText}>{item.category}</Text>
                    <Text style={styles.priceText}>৳ {item.price}</Text>
                    </View>
                    <View style={{alignItems: 'center', justifyContent: 'center'}}>
                    <TouchableOpacity style={styles.addToBagBtn} onPress={() => handleAddToCart(item)}>
                        <Ionicons name="basket" size={35} color="white" />
                        <Text style={styles.textStyle}>Add To Bag</Text>
                    </TouchableOpacity>
                    </View>
                </View>       
            </View>
            </TouchableOpacity>
        )
    }

  return (
    <View style={{flex:1}}>
    <FlatList
       data={productData}
       renderItem={renderItem}
       keyExtractor={(item) => item._id}
       numColumns={2}
       scrollEnabled={true}
       contentContainerStyle={{
        flexGrow: 1,
        }}
        showsVerticalScrollIndicator={false}
       />

    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        width: imageWrapperWidth - 20,
        height: 270,
        borderWidth: 1,
        borderColor: '#FD6A65',
        borderRadius: 20,
        marginHorizontal: 5,
        marginVertical: 6,
        backgroundColor: 'white',
        shadowColor: 'black',
        shadowOpacity: 0.4,
        elevation: 6,
        shadowRadius: 2 ,
        shadowOffset : { width: 1, height: 3},
       
    },
    backButton:{
        backgroundColor: "white",
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
    productImage:{
        width: '100%',
        height: 120,   
    },
    catePriceWrapper:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: 5
    },
    productText:{
        fontSize: 20,
        fontWeight: 'bold',
    },
    priceText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#3C4048'
    },
    categoryText:{
        fontSize: 16,
        fontWeight: 'bold',
        color: '#3C4048',
    },
    addToBagBtn:{
        width: '90%',
        height: 38,
        backgroundColor: '#FD6A65',
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    }, 
    textStyle:{
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
})

