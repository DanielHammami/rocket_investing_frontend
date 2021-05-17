import React from 'react'

import { StyleSheet, Text, View, Button } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import HomePageScreen from "./screens/HomePageScreen"
import IntroductionScreen from "./screens/IntroductionScreen"
import PortfolioScreen from "./screens/PortfolioScreen"
import StrategyListScreen from "./screens/StrategyListScreen"
import WishListScreen from "./screens/WishListScreen"

const Stack = createStackNavigator()

export default function App() {
  return (
    <View style={ styles.container }>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="HomePageScreen" component={ HomePageScreen } />
          <Stack.Screen name="IntroductionScreen" component={ IntroductionScreen } />
          <Stack.Screen name="PortfolioScreen" component={ PortfolioScreen } />
          <Stack.Screen name="StrategyListScreen" component={ StrategyListScreen } />
          <Stack.Screen name="WishListScreen" component={ WishListScreen } />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
