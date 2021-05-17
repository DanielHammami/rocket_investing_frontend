import React from 'react'

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import { StyleSheet, Text, View, Button } from 'react-native'

const Stack = createStackNavigator()

export default function HomePageScreen(props) {
  return (
    <View style={ styles.container }>
      <Text>HomePageScreen</Text>
      <Button title="Introduction"
        onPress={() => props.navigation.navigate('IntroductionScreen')}
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