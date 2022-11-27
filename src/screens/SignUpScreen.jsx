import { View, Text, SafeAreaView, StyleSheet, ScrollView, TouchableOpacity, Alert, Image, Dimensions, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import GlobalSafeareaStyle from '../utils/GlobalSafeareaStyle';
import PhoneInput from "react-native-phone-number-input";
import { Ionicons } from '@expo/vector-icons';
import { useRef } from 'react';
import { onSignupUser } from '../redux/features/userSlice';
import { useDispatch, useSelector } from 'react-redux'
import Animated, {
  LightSpeedInLeft, 
  LightSpeedOutRight,
  Layout
} from 'react-native-reanimated';

const screenWidth = Dimensions.get('window').width

const SignUpScreen = ({ navigation }) => {
  const [value, setValue] = useState("");
  const [phone, setPhone] = useState("");
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true);
  const [data, setData] = useState({
    errorMsgPhone: '',
    errorMsgPassword: '',
    errorMsgFirst: '',
    errorMsgLast: '',
    isValidNumber: true,
    isValidPassword: true,
    isFirstName: true,
    isLastName: true
  })
  const phoneInput = useRef();

  // const dispatch = useDispatch();
  const  dispatch = useDispatch();
  const user = useSelector(state => state.user)

  const reDirectToSignIn = () => {
    navigation.navigate('Account')
  }

  const handleSignupButton = () => {
   dispatch(onSignupUser({firstName, lastName, phone, password}))
   navigation.navigate('VerifyStack', { phoneNumber: phone})
   setFirstName('');
   setLastName('');
   setPhone('');
   setPassword('');
   setData({})
  }
  // const onTapBack = () => {
  //   navigation.goBack()
  // }
   

  return (
    <SafeAreaView style={GlobalSafeareaStyle.androidSafeArea}>
      <View style={styles.container}>
       <View style={styles.wrapper}>
       <View style={styles.textWrapper}>
       <Text style={styles.textTitleStyle}>Signup Account</Text>
       <Text style={styles.textLittleStyle}>Please, signup for experiencing our services...</Text>
       </View>
       <View style={{ paddingTop: 10}}>
        <Text style={styles.textStyle}>First Name</Text>
        <View style={{ justifyContent: 'center',}}>
        <TextInput
         style={styles.textInputName}
         placeholder="Rafi"
         onChangeText={(text) => {
          if(text.length >= 3){
            setFirstName(text)
            setData({
              ...data,
              isFirstName: true
            })
          }
          else{
            setData({
              ...data,
              isFirstName: false,
              errorMsgFirst: 'First Name must be 3 digits'
            })
          }
         }}
         />
         <Ionicons style={{position: 'absolute', left: 10}} name='person-outline' size={30} color="black" />
        </View>
        <Animated.View
        entering={LightSpeedInLeft}
        exiting={LightSpeedOutRight}
        layout={Layout.springify()}>
        <Text style={styles.formErrors}>
          {
            data.isFirstName === false ? `${data.errorMsgFirst}` : null
          }
        </Text>
        </Animated.View>
       </View>
       <View style={{ paddingTop: 10}}>
        <Text style={styles.textStyle}>Last Name</Text>
        <View style={{ justifyContent: 'center',}}>
        <TextInput
         style={styles.textInputName}
         placeholder="Hasan"
         onChangeText={(text) => {
          if(text.length >= 3){
            setLastName(text)
            setData({
              ...data,
              isLastName: true
            })
          }
          else{
            setData({
              ...data,
              isLastName: false,
              errorMsgLast: 'Last Name must be 3 digits'
            })
          }
         }}
         />
         <Ionicons style={{position: 'absolute', left: 10}} name='person-outline' size={30} color="black" />
        </View>
        <Animated.View
        entering={LightSpeedInLeft}
        exiting={LightSpeedOutRight}
        layout={Layout.springify()}>
        <Text style={styles.formErrors}>
          {
            data.isLastName === false ? `${data.errorMsgLast}` : null
          }
        </Text>
        </Animated.View>
       </View>
       <View>
        <Text style={styles.textStyle}>Phone Number</Text>
        <PhoneInput
          containerStyle={{
          width: '100%',
          borderRadius: 20, 
          padding: 2,
          borderWidth: 2,
          borderColor: '#EAEAEA',
          shadowColor: 'black',
          shadowOpacity: 0.2,
          elevation: 6,
          shadowRadius: 2 ,
          shadowOffset : { width: 0, height: 2}
        }}
          textInputStyle={{fontSize: 20}}
          placeholder="1828123264"
          codeTextStyle={{fontSize: 20}}
          ref={phoneInput}
          defaultValue={value}
          defaultCode="BD"
          layout="first"
          onChangeText={(text) => {
            setValue(text);
          }}
          onChangeFormattedText={(text) => {
            if(text.trim().length === 14){
              setPhone(text)
              setData({
                ...data,
                isValidNumber: true
              })
            } else{
              setData({
                ...data,
                isValidNumber: false,
                errorMsgPhone: 'Phone number must be 11 digits'
              })
            }
          }}
          withDarkTheme
          autoFocus
        />
        <Animated.View
        entering={LightSpeedInLeft}
        exiting={LightSpeedOutRight}
        layout={Layout.springify()}>
        <Text style={styles.formErrors}>
          {
            data.isValidNumber === false ? `${data.errorMsgPhone}` : null
          }
        </Text>
        </Animated.View>
        </View>
        <View style={{ paddingTop: 10}}>
        <Text style={styles.textStyle}>Password</Text>
        <View style={{ justifyContent: 'center',}}>
        <TextInput
         style={styles.textInput}
         placeholder="* * * * * * * * * * "
         secureTextEntry={hidePassword}
         onChangeText={(text) => {
          if(text.length >= 8){
            setPassword(text)
            setData({
              ...data,
              isValidPassword: true
            })
          }
          else{
            setData({
              ...data,
              isValidPassword: false,
              errorMsgPassword: 'Password must be 8 digits'
            })
          }
         }}
         />
         <Ionicons style={{position: 'absolute', right: 25}} name={hidePassword ? 'eye-off-outline' : 'eye-outline'} size={30} color="black" onPress={() => setHidePassword(!hidePassword)} />
        </View>
        <Animated.View
        entering={LightSpeedInLeft}
        exiting={LightSpeedOutRight}
        layout={Layout.springify()}>
        <Text style={styles.formErrors}>
          {
            data.isValidPassword === false ? `${data.errorMsgPassword}` : null
          }
        </Text>
        </Animated.View>
       </View>
       <View style={{ paddingTop: 10, paddingHorizontal: 10}}>
       <TouchableOpacity style={{
          width: '95%',
          height: 60,
          backgroundColor: password.length > 7 && phone.length > 10 ? '#FD6A65' : '#FAA0A0',
          borderRadius: 20,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 10,
        }} disabled={phone.length >10 && password.length >8 ? false : true} onPress={handleSignupButton}>
          <Text style={styles.submitBtn}>Submit</Text>
        </TouchableOpacity>
       </View>
       <View style={{ paddingVertical: 10}}>
       <View style={styles.newAccountWrapper}>
        <Text style={styles.smallTextBtn}>Have already registered ? </Text>
        <TouchableOpacity onPress={reDirectToSignIn}>
          <Text style={styles.smallBtn}>LogIn</Text>
        </TouchableOpacity>
       </View>
       {/* <Text>{user && user.userData.phone}</Text> */}
       </View>
      </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFF',
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
},
  wrapper: {
    // backgroundColor: '#E3E5F3',
    // borderRadius: 20,
    width: '100%',
    paddingHorizontal: 25,
    paddingVertical: 20
  },
  textWrapper: {
    paddingTop: 10,
    paddingBottom: 20
  },
  textStyle: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingBottom: 20
  },
  textTitleStyle: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingBottom: 10
  } ,
  textLittleStyle: {
    fontSize: 16,
    fontWeight: '300'
  },
  smallTextBtn:{
    fontSize: 16,
    fontWeight: '3',
    color: 'black'
  },
  smallBtn:{
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FD6A65'
  },
  submitBtn:{
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white'
  },
  textInputName:{
    width: '100%',
    height: 65,
    borderRadius: 15,
    padding: 15,
    backgroundColor: '#F8F9F9',
    borderWidth: 2,
    borderColor: '#EAEAEA',
    shadowColor: 'black',
    shadowOpacity: 0.2,
    elevation: 6,
    shadowRadius: 2 ,
    shadowOffset : { width: 1, height: 2},
    position: 'relative',
    fontSize: 20,
    paddingHorizontal: 50
  },
  textInput:{
    width: '100%',
    height: 65,
    borderRadius: 15,
    padding: 15,
    backgroundColor: '#F8F9F9',
    borderWidth: 2,
    borderColor: '#EAEAEA',
    shadowColor: 'black',
    shadowOpacity: 0.2,
    elevation: 6,
    shadowRadius: 2 ,
    shadowOffset : { width: 1, height: 2},
    position: 'relative',
    fontSize: 20
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

newAccountWrapper:{
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
},

submitButton:{
  width: '95%',
  height: 60,
  backgroundColor: '#FD6A65',
  borderRadius: 20,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: 10,
},

formErrors:{
  color: '#FD6A65',
  fontSize: 16,
  fontWeight: 'bold',
  paddingVertical: 5,
  paddingHorizontal: 10
 }


})
export default SignUpScreen