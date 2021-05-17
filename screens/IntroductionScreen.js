import React from 'react'

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import { StyleSheet, Text, View} from 'react-native'
import { Button } from 'react-native-elements';

const Stack = createStackNavigator()

export default function IntroductionScreen(props) {
  return (
    <View style={ styles.container }>
      <Text style={ styles.titleText }>Bonjour "PRENOM" !</Text>
          <View style={ styles.paragraphs }>
      <Text style={ styles.paragraph}>Bienvenue sur l'application Rocket Investing. La première application boursière qui facilite tes investissements long terme.</Text>
      <Text style={ styles.paragraph}> Cette application a été conçue pour faciliter l'investissements boursier des particuliers qui ne possèdent aucune connaissance en finance de marché.</Text>
      <Text style={ styles.paragraph}> Laissez-nous vous guider pas à pas dans la définition de votre stratégie boursière long terme et appliquez facilement nos conseils pour placer votre argent.</Text>
          </View>

          <View   style={styles.button1}>
                <Button  
                  title="Accès aux portefeuilles"
                  type="solid"
                  onPress={() => props.navigation.navigate('StrategyListScreen')}
                />
          </View>

          <View style={styles.button2}>
                <Button
                  title="Déconnexion"
                  type="outline"
                  onPress={() => props.navigation.navigate('HomePageScreen')}
                />
          </View> 
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center',
  },

  button1 : {
    padding: 10,
    backgroundColor: 'green',
  },

  button2 : {
    padding: 10,
    backgroundColor: 'yellow',
  },

  titleText: {
    padding: 10,
    fontSize : 20,
    marginBottom :30,
    fontWeight: "bold",
  },

  paragraphs: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 15,
  },

  paragraph: {
    padding: 15,
    backgroundColor: 'blue',
    fontSize : 15,
  },
})