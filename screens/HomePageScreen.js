import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Text, Button } from 'react-native-elements';

export default function HomePageScreen(props) {
  return (
    <View style={ styles.container }>
    <Text h3 style={ styles.title }>Rocket Investing</Text>
    <Text style={ styles.text }>L'application boursière qui facilite vos investissements long termes</Text>
      <Button title="Introduction"
        onPress={() => props.navigation.navigate('IntroductionScreen')}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'pink'
  },
  title: {
    marginTop: 50
  },
  text: {
    marginBottom: 130
  },

})