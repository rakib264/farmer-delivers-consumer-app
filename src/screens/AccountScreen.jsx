import { View, Text, SafeAreaView, StyleSheet, ScrollView, TouchableOpacity, Alert, Image, Dimensions, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import Animated, {
  LightSpeedInLeft, 
  LightSpeedOutRight,
  Layout
} from 'react-native-reanimated';
import GlobalSafeareaStyle from '../utils/GlobalSafeareaStyle';
import PhoneInput, { isValidNumber } from "react-native-phone-number-input";
import { Ionicons } from '@expo/vector-icons';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { onSignInUser } from '../redux/features/userSlice';

const screenWidth = Dimensions.get('window').width

const SignInScreen = ({ navigation }) => {
  const [value, setValue] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true);
  const [data, setData] = useState({
    errorMsg: '',
    errorMsgPhone: '',
    errorMsgPassword: '',
    isValidNumber: true,
    isValidPassword: true,
  })
  const phoneInput = useRef();
  const dispatch = useDispatch();
  const userInfo = useSelector(state => state.user)


  const reDirectToSignUp = () => {
    navigation.navigate('SignUpStack')
  }
  const onTapBack = () => {
    navigation.navigate('Home')
  }

  const onHandleSubmit = () => {
    dispatch(onSignInUser({phone, password}));
    if(userInfo){
      navigation.navigate('OrderStack')
    }
  }


  return (
    <SafeAreaView style={GlobalSafeareaStyle.androidSafeArea}>
      <View style={styles.container}>
       <View style={styles.wrapper}>
       <View style={{ paddingBottom: 20}}>
        <TouchableOpacity style={styles.backButton} onPress={onTapBack}>
        <Ionicons name='chevron-back' size={30} color="#474E68" />
        </TouchableOpacity>
      </View>
       <View style={styles.textWrapper}>
       <Text style={styles.textTitleStyle}>Login Account</Text>
       <Text style={styles.textLittleStyle}>Please, login for experiencing our services...</Text>
       </View>
        <View>
        <Text style={styles.textStyle}>Phone Number</Text>
        <PhoneInput
          containerStyle={{
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
        <View style={{ paddingTop: 20}}>
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
       <View style={{ paddingTop: 30, paddingHorizontal: 10}}>
        <TouchableOpacity style={{
          width: '95%',
          height: 60,
          backgroundColor: password.length > 7 && phone.length > 10 ? '#FD6A65' : '#FAA0A0',
          borderRadius: 20,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 10,
        }} disabled={password.length >8 ? false : true} onPress={onHandleSubmit}>
          <Text style={styles.submitBtn}>LogIn</Text>
        </TouchableOpacity>
       </View>
       <View style={{ paddingVertical: 10}}>
       <View style={styles.newAccountWrapper}>
        <Text style={styles.smallTextBtn}>Not Registered yet ? </Text>
        <TouchableOpacity onPress={reDirectToSignUp}>
          <Text style={styles.smallBtn}>Create Account</Text>
        </TouchableOpacity>
       </View>
       <View style={styles.newAccountWrapper}>
        <Text style={styles.smallTextBtn}>Forgot Password ? </Text>
        <TouchableOpacity>
          <Text style={styles.smallBtn}>Request for Newone</Text>
        </TouchableOpacity>
       </View>
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
    paddingVertical: 40
  },
  textWrapper: {
    paddingTop: 10,
    paddingBottom: 80
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
  textInput:{
    width: '95%',
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
  // width: '95%',
  // height: 60,
  // borderRadius: 20,
  // flexDirection: 'row',
  // alignItems: 'center',
  // justifyContent: 'center',
  // marginBottom: 10,
},
formErrors:{
 color: '#FD6A65',
 fontSize: 16,
 fontWeight: 'bold',
 paddingVertical: 8,
 paddingHorizontal: 10
}

})
export default SignInScreen