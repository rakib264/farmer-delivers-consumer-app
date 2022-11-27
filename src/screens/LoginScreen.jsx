import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Image,
  Dimensions,
  TextInput,
  Button,
} from "react-native";
import React, { useEffect, useState } from "react";
import GlobalSafeareaStyle from "../utils/GlobalSafeareaStyle";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { onSignInUser } from "../redux/features/userSlice";
import { Formik } from "formik";
import * as yup from "yup";
import { LinearGradient } from 'expo-linear-gradient';
import Toast from 'react-native-toast-message';

const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const userInfo = useSelector(state => state.user);
  console.log(userInfo)
  const [userLoginData, setUserLoginData] = useState({
    phone: "",
    password: ""
  })
  const [hidePassword, setHidePassword] = useState(true);


  const reDirectToSignUp = () => {
    navigation.navigate("RegisterStack");
  };
  const onTapBack = () => {
    navigation.navigate("Home");
  };

  const handleLoginButton = (values) => {
    if(values !== null){
      dispatch(onSignInUser(values));
      if(userInfo && userInfo.userData !== null ){
        navigation.navigate('OrderStack')
        Toast.show({
          type: 'success',
          text1: 'Welcome',
          text2: 'Your are loggedin',
          position: 'top',
          visibilityTime: 2000,
          autoHide: true
        }); 
      } else{
        Toast.show({
          type: 'error',
          text1: 'Failed',
          text2: userInfo.userData ? userInfo.userData.message : 'Wrong credentials' ,
          position: 'top',
          visibilityTime: 2000,
          autoHide: true
        }); 
      }
    }
  }

  // useEffect(() => {
  //   if(userInfo){
  //     navigation.navigate('OrderStack')
  //     Toast.show({
  //       type: 'success',
  //       text1: 'Welcome',
  //       text2: 'Your are loggedin',
  //       position: 'top',
  //       visibilityTime: 2000,
  //       autoHide: true
  //     }); 
  //   } else{
  //     Toast.show({
  //       type: 'error',
  //       text1: 'Failed',
  //       text2: 'Wrong username or password',
  //       position: 'top',
  //       visibilityTime: 2000,
  //       autoHide: true
  //     }); 
  //   }
  // }, [])


  //   const onHandleSubmit = () => {
  //     dispatch(onSignInUser({phone, password}));
  //     if(userInfo){
  //       navigation.navigate('OrderStack')
  //     }
  //   }

  const loginValidationSchema = yup.object().shape({
    phone: yup.string().min(10).required("A phone number is required"),
    password: yup
      .string()
      .min(8, ({ min }) => `Password must be at least ${min} characters`)
      .required("Password is required"),
  });

  return (
    <SafeAreaView style={GlobalSafeareaStyle.androidSafeArea}>
      <ScrollView style={styles.container}>
        <View style={styles.wrapper}>
          <LinearGradient
          start={{x: 0, y: 0}} end={{x: 1, y: 0}} 
          colors={['#D7816A', '#BD4F6C']} 
          style={styles.linearGradient}
          >
          <View style={styles.firstWrapper}>
          <View style={{ paddingBottom: 20 }}>
            <TouchableOpacity style={styles.backButton} onPress={onTapBack}>
              <Ionicons name="chevron-back" size={30} color="#474E68" />
            </TouchableOpacity>
          </View>
          <View style={styles.textWrapper}>
            <Text style={styles.textTitleStyle}>Login Account</Text>
            <Text style={styles.textLittleStyle}>
              Please, login for experiencing our services...
            </Text>
          </View>
          </View>
          </LinearGradient>
          <View style={styles.secondWrapper}>
            <Formik
              validationSchema={loginValidationSchema}
              initialValues={{ phone: "", password: "" }}
              onSubmit={(values) => {
                setUserLoginData({
                  ...userLoginData,
                  phone: values.phone,
                  password: values.password
                })
                handleLoginButton(values)
              }}
            >
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                touched,
                isValid,
              }) => (
                <>
                  <View>
                    <Text style={styles.textStyle}>Phone Number</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: "space-between", position: 'relative' }}>
                    <Image 
                      source={require('../images/common/BD.png')}
                      resizeMethod='cover'
                      style={{
                        width: 30,
                        height: 40,
                        position: 'absolute',
                        left: 15,
                        zIndex: 1,
                      }}
                      />
                      <TextInput
                        name="phone"
                        onChangeText={handleChange("phone")}
                        onBlur={handleBlur("phone")}
                        value={values.phone}
                        style={styles.textInputPhone}
                        placeholder="01828123..."
                      />
                      
                    </View>
                    {errors.phone && touched.phone && (
                      <Text style={styles.errorText}>{errors.phone}</Text>
                    )}
                  </View>

                  <View style={{ paddingTop: 20 }}>
                  
                    <Text style={styles.textStyle}>Password</Text>
                    <View style={{ justifyContent: "center" }}>
                      <TextInput
                        name="password"
                        onChangeText={handleChange("password")}
                        onBlur={handleBlur("password")}
                        value={values.password}
                        style={styles.textInput}
                        placeholder="* * * * * * * * * * "
                        secureTextEntry={hidePassword}
                      />
                      <Ionicons
                        style={{ position: "absolute", right: 25 }}
                        name={hidePassword ? "eye-off-outline" : "eye-outline"}
                        size={30}
                        color="black"
                        onPress={() => setHidePassword(!hidePassword)}
                      />
                    </View>
                    {errors.password && touched.password && (
                      <Text style={styles.errorText}>{errors.password}</Text>
                    )}
                  </View>
                  <View style={{ paddingTop: 30, paddingHorizontal: 10 }}>
                    <TouchableOpacity
                      style={{
                        width: "95%",
                        height: 60,
                        backgroundColor: isValid ? "#FD6A65" : "#FAA0A0",
                        borderRadius: 20,
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: 10,
                      }}
                      onPress={handleSubmit}
                      disabled={!isValid}
                    >
                      <Text style={styles.submitBtn}>LogIn</Text>
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </Formik>
            <View style={{ alignItems: 'center', paddingTop: 30}}>
          <View style={styles.newAccountWrapper}>
              <Text style={styles.smallTextBtn}>Not Registered yet ? </Text>
              <Button
              title="SignUp"
              onPress={reDirectToSignUp}
              />
            </View>
            <View style={styles.newAccountWrapper}>
              <Text style={styles.smallTextBtn}>Forgot Password ? </Text>
              <Button
              title="Request for Newone"
              />
            </View>
          </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
   // backgroundColor: "#F8FAFF",
   backgroundColor: '#CBC3E3',
  },
  wrapper: {
   // backgroundColor: 'white',
  //  backgroundColor: '#CBC3E3',
    borderRadius: 10,
    width: "100%",
    height: '100%',
    paddingVertical: 5,   
  },
  linearGradient: {
    flex: .4,
    marginHorizontal: 5,
    borderTopLeftRadius: 75,
    borderBottomRightRadius: 75
  },
  firstWrapper: {
    paddingHorizontal: 30,
    paddingVertical: 20,
  },
  secondWrapper : {
    flex: .8,
    paddingHorizontal: 20,
    paddingTop: 50,
    marginTop: 5,
    marginHorizontal: 5,
  },
  textWrapper: {
    paddingTop: 20,
  },
  textStyle: {
    fontSize: 20,
    fontWeight: "bold",
    paddingBottom: 20,
  },
  textTitleStyle: {
    fontSize: 26,
    fontWeight: "bold",
    paddingBottom: 10,
    color: '#ededed'
  },
  textLittleStyle: {
    fontSize: 18,
    fontWeight: "300",
    color: 'white'
  },
  smallBtn: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FD6A65",
  },
  submitBtn: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  smallTextBtn: {
    fontSize: 16,
    fontWeight: "3",
    color: "black",
  },
  textInput: {
    width: "100%",
    height: 65,
    borderRadius: 15,
    padding: 15,
    backgroundColor: "#F8F9F9",
    borderWidth: 2,
    borderColor: "#EAEAEA",
    shadowColor: "black",
    shadowOpacity: 0.2,
    elevation: 6,
    shadowRadius: 2,
    shadowOffset: { width: 1, height: 2 },
    position: "relative",
    fontSize: 20,
  },
  textInputPhone: {
    width: "100%",
    height: 65,
    borderRadius: 15,
    paddingLeft: 60,
    padddingRight: 10,
    paddingVertical: 15,
    backgroundColor: "#F8F9F9",
    borderWidth: 2,
    borderColor: "#EAEAEA",
    shadowColor: "black",
    shadowOpacity: 0.2,
    elevation: 6,
    shadowRadius: 2,
    shadowOffset: { width: 1, height: 2 },
    position: "relative",
    fontSize: 20,
  },

  backButton: {
    backgroundColor: "white",
    width: 40,
    height: 40,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "black",
    shadowOpacity: 0.2,
    elevation: 6,
    shadowRadius: 2,
    shadowOffset: { width: 1, height: 2 },
  },

  newAccountWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  errorText: {
    fontSize: 16,
    color: "red",
    paddingVertical: 10,
  },
});

export default LoginScreen;
