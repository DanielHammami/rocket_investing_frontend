import React, { useState, useEffect } from 'react';
// import { NavigationContainer } from '@react-navigation/native'
// import { createStackNavigator } from '@react-navigation/stack'
import { StyleSheet, View, ScrollView } from 'react-native'
import { Text, Card, Overlay, Button, Icon } from 'react-native-elements';
import { useIsFocused } from '@react-navigation/native';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import IconIonic from 'react-native-vector-icons/Ionicons';

// const Stack = createStackNavigator()

export default function PortfolioScreen(props) {
  const [visible, setVisible] = useState(false);

  return (
    <View style={styles.container}>
    <Text h4 style={{ textAlign: 'center', height: 40, marginTop: 15  }}>Portfefeuille : xxx</Text> 
      <ScrollView>
      
        <Card containerStyle={{ }}>
          <Text>Graphique...</Text>
        </Card>

        <Card containerStyle={{ }}>
          <Text>Performance </Text>
          <Text>1 an : </Text>
          <Text>2 ans : </Text>
          <Text>5 ans : </Text>
          <Text>Max : </Text>
        </Card>

        <Card containerStyle={{ }}>
          <Text>Description... </Text>
        </Card>

        <Card containerStyle={{ }}>
          <Text>Allocation d'actif : Mois en cours </Text>
          <Text>Du 01/05/21 au 30/05/21 </Text>
        </Card>

        <Card containerStyle={{ }}>
          <Text>Composition du portefeuille : </Text>
          <Text>Acheter:  </Text>
          <Text>Vendre:  </Text>
        </Card>

        <Button containerStyle={{ width: '100%', marginTop: 50 }}
          icon={{
            // name: "arrow-right",
            name: "check-circle",
            size: 30,
            color: "white"
          }}
          title=" Enregistrer cette stratégie"
          type="solid"
          onPress={() => setVisible(true)}
        />

        <Button containerStyle={{ width: '100%', marginTop: 15 }}
          title="retour"
          type="clear"
          onPress={() => props.navigation.navigate('StrategyListScreen')}
        />

        <Overlay isVisible={visible} width="auto" height="auto" overlayStyle={{width: '80%', alignItems: 'center'}}>
            
            <Icon 
                  // name= "arrow-right"
                  name="medal"
                  size= '100'
                  type='font-awesome'
                  color= "red"
            />

            <Text h4 style={{ textAlign: 'center', marginTop: 15  }}>Félicitation John</Text>
            <Text style={{ textAlign: 'center', marginTop: 15  }}>Votre stratégie est enregistrée !</Text>

            <Button style={{ width: 50, marginTop: 30, marginBottom: 20}}
            title="ok"
            type="solid"
            onPress={() => {props.navigation.navigate('WishListScreen'), setVisible(false)}}
            />

        </Overlay>
        
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E7E6E6',
    alignItems: 'center',
    justifyContent: 'center',
  },
})