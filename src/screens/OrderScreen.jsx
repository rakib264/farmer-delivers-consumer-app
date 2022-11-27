import { View, Text } from 'react-native'
import React from 'react'

const OrderScreen = ({ navigation }) => {
  const onTap = () => {
    navigation.navigate('Home')
  }
  return (
    <View>
      <Text>OrderScreen</Text>
      <Text style={{ paddingTop: 40, paddingHorizontal: 20}} onPress={onTap}>Back</Text>
    </View>
  )
}

export default OrderScreen