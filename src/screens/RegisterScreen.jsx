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
import { onSignupUser } from "../redux/features/userSlice";
import { Formik } from "formik";
import * as yup from "yup";
import { LinearGradient } from "expo-linear-gradient";

const RegisterScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [userDataObject, setUserDataObject] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    password: ""
  });
  const [hidePassword, setHidePassword] = useState(true);

  const reDirectToLogin = () => {
    navigation.navigate("LoginStack");
  };

  const handleSignupButton = (values) => {
     if(values !== null){
      dispatch(onSignupUser(values))
      navigation.navigate('VerifyStack', { phoneNumber: values.phone})
      setUserDataObject({});
     }
   }

  // if(userDataObject !== null){
  //   console.log('outside', userDataObject)
  // }

  const loginValidationSchema = yup.object().shape({
    firstName: yup
      .string()
      .min(3, ({ min }) => `FirstName must be at least ${min} characters`)
      .required("First Name is required"),
    lastName: yup
      .string()
      .min(3, ({ min }) => `LastName must be at least ${min} characters`)
      .required("Last Name is required"),
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
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={["#D7816A", "#BD4F6C"]}
            style={styles.linearGradient}
          >
            <View style={styles.firstWrapper}>
              <View style={styles.textWrapper}>
                <Text style={styles.textTitleStyle}>Register Account</Text>
                <Text style={styles.textLittleStyle}>
                  Please, login for experiencing our services...
                </Text>
              </View>
            </View>
          </LinearGradient>
          <View style={styles.secondWrapper}>
            <Formik
              validationSchema={loginValidationSchema}
              initialValues={{
                firstName: "",
                lastName: "",
                phone: "",
                password: "",
              }}
              onSubmit={(values) => {
                setUserDataObject({
                  ...userDataObject,
                  firstName: values.firstName,
                  lastName: values.lastName,
                  phone: values.phone,
                  password: values.password
                });
                handleSignupButton(values);
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
                  <View style={{ paddingTop: 10 }}>
                    <Text style={styles.textStyle}>First Name</Text>
                    <View style={{ justifyContent: "center" }}>
                      <TextInput
                        name="firstName"
                        onChangeText={handleChange("firstName")}
                        onBlur={handleBlur("firstName")}
                        value={values.firstName}
                        style={styles.textInput}
                        placeholder="Rafi"
                      />
                      <Ionicons
                        style={{ position: "absolute", left: 15 }}
                        name="person-outline"
                        size={30}
                        color="black"
                      />
                    </View>
                    {errors.firstName && touched.firstName && (
                      <Text style={styles.errorText}>{errors.firstName}</Text>
                    )}
                  </View>
                  <View style={{ paddingTop: 10 }}>
                    <Text style={styles.textStyle}>Last Name</Text>
                    <View style={{ justifyContent: "center" }}>
                      <TextInput
                        name="lastName"
                        onChangeText={handleChange("lastName")}
                        onBlur={handleBlur("lastName")}
                        value={values.lastName}
                        style={styles.textInput}
                        placeholder="Hasan"
                      />
                      <Ionicons
                        style={{ position: "absolute", left: 15 }}
                        name="person-outline"
                        size={30}
                        color="black"
                      />
                    </View>
                    {errors.lastName && touched.lastName && (
                      <Text style={styles.errorText}>{errors.lastName}</Text>
                    )}
                  </View>
                  <View style={{ paddingTop: 10 }}>
                    <Text style={styles.textStyle}>Phone Number</Text>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        position: "relative",
                      }}
                    >
                      <Image
                        source={require("../images/common/BD.png")}
                        resizeMethod="cover"
                        style={{
                          width: 30,
                          height: 40,
                          position: "absolute",
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

                  <View style={{ paddingTop: 10 }}>
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
                  <View style={{ paddingTop: 15, paddingHorizontal: 10 }}>
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
                      <Text style={styles.submitBtn}>Register</Text>
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </Formik>
            <View style={{ alignItems: "center", paddingHorizontal: 15 }}>
              <View style={styles.newAccountWrapper}>
                <Text style={styles.smallTextBtn}>
                  Already have registered ?{" "}
                </Text>
                <Button title="Login" onPress={reDirectToLogin} />
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
    //backgroundColor: "#F8FAFF",
    backgroundColor: "#CBC3E3",
  },
  wrapper: {
    // backgroundColor: 'white',
    // backgroundColor: "#CBC3E3",
    borderRadius: 10,
    width: "100%",
    height: "100%",
    paddingVertical: 5,
  },
  linearGradient: {
    flex: 0.3,
    marginHorizontal: 5,
    borderTopLeftRadius: 75,
    borderBottomRightRadius: 75,
  },
  firstWrapper: {
    paddingHorizontal: 30,
    paddingVertical: 25,
  },
  secondWrapper: {
    flex: 0.9,
    paddingHorizontal: 20,
    paddingTop: 30,
    marginTop: 5,
    marginHorizontal: 5,
  },
  textWrapper: {
    paddingTop: 10,
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
    color: "#ededed",
  },
  textLittleStyle: {
    fontSize: 18,
    fontWeight: "300",
    color: "white",
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
    paddingHorizontal: 50,
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

export default RegisterScreen;
