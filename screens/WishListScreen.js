import React from 'react'

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-elements';

const Stack = createStackNavigator()

export default function WishListScreen(props) {
  return (
    <View style={ styles.container }>
      <Text style={ styles.titleText }>Bonjour "PRENOM" !</Text>
          <View style={ styles.paragraphs }>
          <Text style={ styles.titleFavorite }>Mes favoris :</Text>
                <View style={ styles.listButton}>    
                        <View style={styles.button3}>  
                              <Button  
                                      style={styles.button3}
                                      title="Portefeuille 1"
                                      type="outline"
                                      onPress={() => props.navigation.navigate('StrategyListScreen')}
                                    /> 
                        </View>
                        <View style={styles.button3}>  
                              <Button  
                                       style={styles.button3}
                                       title="Portefeuille 2"
                                       type="outline"
                                       onPress={() => props.navigation.navigate('StrategyListScreen')}
                                    /> 
                        </View>                                               
                        <View style={styles.button3}>  
                              <Button  
                                       style={styles.button3}
                                       title="Portefeuille 3"
                                       type="outline"
                                       onPress={() => props.navigation.navigate('StrategyListScreen')}
                                    /> 
                        </View>
                </View>
          </View>

          <View   style={styles.button1}>
                <Button  
                  title="Ajouter un nouveau produit"
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
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
  },

  button1 : {
    padding: 10,
    width: 250,
  },

  button2 : {
    padding: 10,
    width: 250,
  },

  button3 : {
    padding: 10,
    width: 250,
  },

  listButton : {
    flexDirection: "column",
    justifyContent: "space-around",
    paddingBottom: 20,
  },

  titleFavorite : {
    fontSize: 15,
    paddingBottom: 15,
  },

  titleText: {
    padding: 10,
    fontSize: 20,
    marginBottom: 30,
    fontWeight: "bold",
  },

  paragraphs: {
    alignItems: 'baseline',
    justifyContent: 'center',
    paddingBottom: 15,
    width: 250,
  },

  paragraph: {
    padding: 15,
    fontSize : 15,
  },
})

