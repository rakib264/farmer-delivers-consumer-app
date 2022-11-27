import { View, Text, FlatList, Image, StyleSheet, Dimensions, ScrollView, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import { useDispatch } from 'react-redux';
import { onAllVendorFoods } from '../redux/features/shoppingSlice.js';

const screenWidth = Dimensions.get('window').width;

 const CategoryObj = [
    {
        id: 1,
        name: "Fruits",
        image: require('../images/categories/fruits.jpeg'),
        
    },
    {
        id: 2,
        name: "Vegetables",
        image: require('../images/categories/vegetables.jpeg'),
    },
    {
        id: 3,
        name: "Fish",
        image: require('../images/categories/fish.jpeg'),
    },
    {
        id: 4,
        name: "Meat",
        image: require('../images/categories/meat.jpeg'),
    },
    {
        id: 5,
        name: "Chicken",
        image: require('../images/categories/chicken.jpeg'),
    },
    {
        id: 6,
        name: "Mutton",
        image: require('../images/categories/mutton.jpeg'),
    },
    {
        id: 7,
        name: "Eggs",
        image: require('../images/categories/eggs.jpeg'),
    }
]

export const Category = ({ navigation }) => {
    const dispatch = useDispatch();

    const onTap = (name) => {
       dispatch(onAllVendorFoods(name));
       navigation.navigate('CategoryFoodStack', { categoryName: name}); 
    }

    const renderItem = ({item}) => {
     
        return (
            <TouchableOpacity style={styles.categoryWrapper} onPress={() => onTap(item.name)} >
               <View style={styles.itemWrapper}>
               <Image source={item.image} resizeMode="cover" style={styles.categoryImage} />
               </View>
               <Text style={styles.categoryName}>{item.name}</Text>
            </TouchableOpacity>
        )
    }

  return (
    <View style={styles.container}>
       <ScrollView>
       <FlatList
          data= {CategoryObj}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
         />
       </ScrollView>
     </View>
  )
}

const styles = StyleSheet.create({
    container:{
        width: screenWidth,
        height: 130
    },
    categoryWrapper: {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between',  
      paddingHorizontal: 5
    },
    itemWrapper:{
        width: 100,
        height: 95,
        backgroundColor: '#FFF5F5'
    },
    categoryImage: {
        width: 100,
        height: 90,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#00FFD1',
    },
    categoryName: {
        fontSize: 20,
        fontColor: '#000',
        paddingTop: 4
    }
    
})

