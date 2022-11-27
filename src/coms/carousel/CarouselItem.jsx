import React from 'react'
import { View, StyleSheet, Text, Image, Dimensions, Alert, TouchableOpacity } from 'react-native'

const { width, height } = Dimensions.get('window')


const CarouselItem = ({ item }) => {
    return (
        <View style={styles.cardView}>
            <Image style={styles.image} source={{ uri: item.url }} />
            <View style={styles.buttonView}>
            <TouchableOpacity
                      style={{
                        width: "80%",
                        height: 50,
                        backgroundColor: '#FD6A65',
                        borderRadius: 15,
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                        borderWidth: 2,
                        borderColor: '#00FFD1',
                      }}
                      onPress={() => Alert.alert('Tappeed')}
                    >
                      <Text style={styles.submitBtn}>Buy Now</Text>
                    </TouchableOpacity>
                {/* <Text style={styles.itemTitle}> {item.title}</Text>
                <Text style={styles.itemDescription}>{item.description}</Text> */}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    cardView: {
        flex: 1,
        width: width-20,
        height: height / 4,
        backgroundColor: 'white',
        margin: 10,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0.5, height: 0.5 },
        shadowOpacity: 0.5,
        shadowRadius: 3,
        elevation: 5,
    },

    buttonView: {
        position: 'absolute',
        bottom: 5,
        margin: 5,
        left: 5,
    },
    image: {
        width: width-20,
        height: height / 4,
        borderRadius: 10
    },
    submitBtn: {
        fontSize: 20,
        fontWeight: "bold",
        color: "white",
      },
    // itemTitle: {
    //     color: 'white',
    //     fontSize: 22,
    //     shadowColor: '#000',
    //     shadowOffset: { width: 0.8, height: 0.8 },
    //     shadowOpacity: 1,
    //     shadowRadius: 3,
    //     marginBottom: 5,
    //     fontWeight: "bold",
    //     elevation: 5
    // },
    // itemDescription: {
    //     color: 'white',
    //     fontSize: 12,
    //     shadowColor: '#000',
    //     shadowOffset: { width: 0.8, height: 0.8 },
    //     shadowOpacity: 1,
    //     shadowRadius: 3,
    //     elevation: 5
    // }
})

export default CarouselItem