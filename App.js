import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { AppNavigation } from './src/Navigation/AppNavigation.js';
import Toast from 'react-native-toast-message';
import { Provider } from 'react-redux';
import {store} from './src/redux/store.js';
import { getCartTotal } from './src/redux/features/cartSlice.js';


store.dispatch(getCartTotal());

export default function App() {
  return (
    <Provider store={store}>
        <AppNavigation />
        <Toast />
    </Provider>
  );
}

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   backgroundColor: '#fff',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
});
