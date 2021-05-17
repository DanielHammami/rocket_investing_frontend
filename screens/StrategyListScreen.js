import React from 'react'

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import { StyleSheet, Text, View, Button } from 'react-native'

const Stack = createStackNavigator()

export default function StrategyListScreen(props) {
  return (
    <View style={styles.container}>
      <Text>StrategyListScreen</Text>
      <Button title="Portfolio"
        onPress={() => props.navigation.navigate('PortfolioScreen')}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})