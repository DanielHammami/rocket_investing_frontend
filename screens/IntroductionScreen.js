import React from 'react'

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import { StyleSheet, Text, View, Button } from 'react-native'

const Stack = createStackNavigator()

export default function IntroductionScreen(props) {
  return (
    <View style={ styles.container }>
      <Text>IntroductionScreen</Text>
      <Button title="StrategyList"
        onPress={() => props.navigation.navigate('StrategyListScreen')}
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