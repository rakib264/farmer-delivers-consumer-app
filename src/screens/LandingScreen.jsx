import { View, Text, StyleSheet, Dimensions, Image, Alert  } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as Location from 'expo-location';
import { OnUpdateLocation } from '../redux/features/userSlice.js';
import { useDispatch } from 'react-redux';
import axios from 'axios';



const API_KEY = 'AIzaSyB633qNA9-K8b5KoadIpSuaMVlm62WP310'

const screenWidth = Dimensions.get('screen').width;

const LandingScreen = ({ navigation }) => {
    const dispatch = useDispatch();

    const [errMsg, setErrMsg] = useState("");
    const [address, setAddress] = useState({});
    const [displayAddress, setDisplayAddress] = useState("Waiting for current locations");
    const [clicked, setClicked] = useState(false);
    const [locationServiceEnabled, setLocationServiceEnabled] = useState(false);

    const CheckIfLocationEnabled = async () => {
        let enabled = await Location.hasServicesEnabledAsync();
    
        if (!enabled) {
          Alert.alert(
            'Location Service not enabled',
            'Please enable your location services to continue',
            [{ text: 'OK' }],
            { cancelable: false }
          );
        } else {
          setLocationServiceEnabled(enabled);
        }
      };

      const GetCurrentLocation = async () => {
        try{
            let { status } = await Location.requestForegroundPermissionsAsync();
        console.log(status)
        if(status !== 'granted'){
            setErrMsg('Permission to access location was denied');
            Alert.alert(
                'Permission to access location was denied',
                [{ text: 'OK' }],
                { cancelable: false }
              );
            return;
        }
        let { coords } = await Location.getCurrentPositionAsync({});
        if(coords){
            const { latitude, longitude } = coords;

            console.log(latitude, longitude);

            // Reverse Geo Address Location
            // let res = await axios.get(`https://barikoi.xyz/v1/api/search/reverse/NDE4OTpHRThPODNDSVIy/geocode?longitude=${longitude}&latitude=${latitude}&district=true&post_code=true&country=true&sub_district=true&union=true&pauroshova=true&location_type=true&division=true&address=true&area=true&bangla=false`)
            
            // console.log(res.data);

            const addressResponse = {
                "place":{
                   "address":"House 135, Akram Uddin Molla Road, Hazaribagh Model Town, Jhauchor",
                   "address_components":[
                    {"house": "House 135", "place_name": null, "road": " Akram Uddin Molla Road"}
                   ],
                   "area":"Hazaribagh",
                   "area_components":[
                    {"area": "Hazaribagh", "sub_area": null}
                   ],
                   "city":"Dhaka",
                   "country":"Bangladesh",
                   "distance_within_meters":17.4902,
                   "district":"Dhaka",
                   "division":"Dhaka",
                   "id":853291,
                   "location_type":"Urban",
                   "pauroshova":null,
                   "postCode":1209,
                   "sub_district":"Hazaribagh",
                   "union":null
                },
                "status":200
             }

            if(addressResponse !== null) {
                // const { address, address_components, area_components, area, city, country, postCode } = res.data.place;
                // let currentAddress = {
                //     address: address,
                //     address_components: address_components,
                //     area: area,
                //     area_components: area_components,
                //     city: city,
                //     country: country,
                //     postCode: postCode
                // }

                const { address, address_components, area_components, area, city, country, postCode } = addressResponse.place;

                let currentAddress = {
                    address: address,
                    address_components: address_components,
                    area: area,
                    area_components: area_components,
                    city: city,
                    country: country,
                    postCode: postCode
                }
                // console.log(currentAddress) 

                setDisplayAddress(`${address_components[0].house}, ${address_components[0].road}, ${area}, ${city}, ${country}, ${postCode}`);
                dispatch(OnUpdateLocation(currentAddress));

                // setTimeout(() => {
                //     navigation.navigate('HomeStack')
                // }, 4000)
                navigation.navigate('HomeStack')

            }


        } else{
            //Something went wrong with location data
        }
        }catch(err) {

        }
      };

    useEffect(() => {

         CheckIfLocationEnabled();
         GetCurrentLocation();

    },[])

  return (
    <View style={styles.container}>
      <View style={styles.navigation}>
      </View>
      <View style={styles.body}>
          <Image source={require('../images/farmex_logo.png')} style={styles.logo} />
          <View style={styles.deliveryContainer}>
              <Text style={styles.deliveryTitle}>Your Delivery Address</Text>
          </View>
          <Text style={styles.deliveryAddress}>{displayAddress}</Text>
          
      </View>
      <View style={styles.footer}>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    navigation: {
        flex: 2,
    },
    body: {
        flex: 9,
        justifyContent: 'center',
        alignItems: 'center',
    },
    footer: {
        flex: 1,
    },
    logo:{
        width: 150,
        height: 120
    },
    deliveryContainer:{
        width: screenWidth - 100,
        padding: 5,
        borderBottomColor: 'red',
        borderBottomWidth: 0.5,
        marginBottom: 10,
        alignItems: 'center',
    },
    deliveryTitle:{
        fontSize: 22,
        fontWeight: '700',
        color: '#707070'
    },
    deliveryAddress:{
        fontSize: 18,
        fontWeight: '300',
        color: '#707070'
    },
        
})

export default LandingScreen