import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTabNavigator from "../screens/BottomTab.jsx";
import { NavigationContainer } from "@react-navigation/native";

import LandingScreen from "../screens/LandingScreen.jsx";
import VendorScreen from "../screens/VendorScreen.jsx";
import CategoryFoodScreen from "../screens/CategoryFoodScreen.jsx";
import SearchScreen from "../screens/SearchScreen.jsx";
import ProductScreen from "../screens/ProductScreen.jsx";
import CartScreen from "../screens/CartScreen.jsx";
import SignUpScreen from "../screens/SignUpScreen.jsx";
import SignInScreen from "../screens/AccountScreen.jsx";
import VerifyScreen from "../screens/VerifyAccount.jsx";
import OrderScreen from "../screens/OrderScreen.jsx";
import RegisterScreen from "../screens/RegisterScreen.jsx";
import LoginScreen from "../screens/LoginScreen.jsx";

const Stack = createNativeStackNavigator();

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="LandingStack"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="LandingStack" component={LandingScreen} />
        <Stack.Screen name="HomeStack" component={BottomTabNavigator} />
        <Stack.Screen name="VendorStack" component={VendorScreen} />
        <Stack.Screen name="CategoryFoodStack" component={CategoryFoodScreen} />
        <Stack.Screen name="SearchStack" component={SearchScreen} />
        <Stack.Screen name="ProductStack" component={ProductScreen} />
        <Stack.Screen name="CartStack" component={CartScreen} />
        <Stack.Screen name="SignUpStack" component={SignUpScreen} />
        <Stack.Screen name="SignInStack" component={SignInScreen} />
        <Stack.Screen name="RegisterStack" component={RegisterScreen} />
        <Stack.Screen name="LoginStack" component={LoginScreen} />
        <Stack.Screen name="VerifyStack" component={VerifyScreen} />
        <Stack.Screen name="OrderStack" component={OrderScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export { AppNavigation };
