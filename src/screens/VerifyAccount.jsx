import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, Dimensions, TextInput, Alert } from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import GlobalSafeareaStyle from '../utils/GlobalSafeareaStyle';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { onVerifyUser } from '../redux/features/userSlice';
import Toast from 'react-native-toast-message';


const screenWidth = Dimensions.get('window').width

const VerifyScreen = ({ navigation, route }) => {
  const [otp, setOtp] = useState({
    first: '', second: '', third: '', fourth: ''
  })

  const dispatch = useDispatch();
  const userInfo = useSelector(state => state.user)
  // console.log(userInfo)

  const firstInput = useRef();
  const secondInput = useRef();
  const thirdInput = useRef();
  const fourthInput = useRef();

  const phoneNumber = route.params.phoneNumber


  const reDirectToSignUp = () => {
    navigation.navigate('RegisterStack')
  }

  let otpNumber = `${otp.first}${otp.second}${otp.third}${otp.fourth}`;
  let OTP = Number(otpNumber)


  const handleVerify = () => {
    if(userInfo){
      dispatch(onVerifyUser({ OTP, userInfo}));
    }
  }

  // if(userInfo && userInfo.isVerified === true) {
  //   navigation.navigate('OrderStack')
  //   Toast.show({
  //     type: 'success',
  //     text1: 'Right Otp',
  //     text2: 'Your otp is right',
  //     position: 'top',
  //     visibilityTime: 2000,
  //     autoHide: true
  //   }); 
  // }

  const onTapBack = () => {
    navigation.goBack();
    if(userInfo && userInfo.isVerified === false) {
      Toast.show({
        type: 'error',
        text1: 'Wrong Otp',
        text2: 'Your otp is wrong. Please check',
        position: 'top',
        visibilityTime: 2000,
        autoHide: true
      }); 
    }
  }


  return (
    <SafeAreaView style={GlobalSafeareaStyle.androidSafeArea}>
      <View style={styles.container}>
       <View style={styles.wrapper}>
       <View>
       <TouchableOpacity style={styles.backButton} onPress={onTapBack}>
         <Ionicons name='chevron-back' size={30} color="#474E68" />
       </TouchableOpacity>
       </View>
       <View style={styles.textWrapper}>
       <Text style={styles.textTitleStyle}>Verify Account</Text>
       <Text style={styles.textSubTitle}>Check OTP Code</Text>
       <Text style={styles.textSemiSubTitle}>Please, verify your account by entering 
       the code sent at { phoneNumber && phoneNumber }</Text>
       </View>
       <View>
       <View style={styles.inputTextWrapper}>
        <View>
          <TextInput
          style={styles.textInput}
          keyboardType="number-pad"
          ref={firstInput}
          onChangeText={(text) => {
            setOtp({
              ...otp, first: text
            })
            text && secondInput.current.focus()
          }}
           />
        </View>
        <View>
          <TextInput
          style={styles.textInput}
          keyboardType="number-pad"
          ref={secondInput}
          onChangeText={(text) => {
            setOtp({
              ...otp, second: text
            })
            text ? thirdInput.current.focus() : firstInput.current.focus()
          }}
           />
        </View>
        <View>
          <TextInput
          style={styles.textInput}
          keyboardType="number-pad"
          ref={thirdInput}
          onChangeText={(text) => {
            setOtp({
              ...otp, third: text
            })
            text ? fourthInput.current.focus() : secondInput.current.focus()
          }}
           />
        </View>
        <View>
          <TextInput
          style={styles.textInput}
          keyboardType="number-pad"
          ref={fourthInput}
          onChangeText={(text) => {
            setOtp({
              ...otp, fourth: text
            })
            !text && thirdInput.current.focus()
          }}
           />
        </View>
       </View>
       </View>
       <View style={{ paddingTop: 30, paddingHorizontal: 10}}>
        <TouchableOpacity style={styles.submitButton} onPress={handleVerify}>
          <Text style={styles.submitBtn}>Verify</Text>
        </TouchableOpacity>
       </View>
       {
        userInfo && userInfo.isVerified === true && navigation.navigate('OrderStack')
       }
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
    backgroundColor: '#E3E5F3',
    borderRadius: 20,
    width: '100%',
    paddingHorizontal: 25,
    paddingVertical: 40
  },
  textWrapper: {
    paddingTop: 10,
    paddingBottom: 20
  },
  inputTextWrapper: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textInput:{
    width: 50,
    height: 50,
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
  textTitleStyle: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingBottom: 10
  } ,

  submitBtn:{
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white'
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


submitButton:{
  width: '100%',
  height: 60,
  backgroundColor: '#FD6A65',
  borderRadius: 20,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: 10,
},

textSubTitle:{
  fontSize: 20,
  fontWeight: '500',
  paddingVertical: 5
},
textSemiSubTitle:{
  fontSize: 18,
  fontWeight: '300',
  paddingVertical: 5
}


})
export default VerifyScreen