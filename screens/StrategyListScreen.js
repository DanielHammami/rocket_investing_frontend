import React, { useState } from 'react'
import RNPickerSelect from 'react-native-picker-select'

import { StyleSheet, Text, View } from 'react-native'
import { Button, Divider, Overlay } from 'react-native-elements'

export default function StrategyListScreen(props) {

  const [visibleStrategy, setVisibleStrategy] = useState(false)
  const [visiblePrudent, setVisiblePrudent] = useState(false)
  const [visibleEquilibre, setVisibleEquilibre] = useState(false)
  const [visibleAudacieux, setVisibleAudacieux] = useState(false)

  const toggleOverlayStrategy = () => {
    setVisibleStrategy(!visibleStrategy);
  }

  const toggleOverlayPrudent = () => {
    setVisiblePrudent(!visiblePrudent);
  }

  const toggleOverlayEquilibre = () => {
    setVisibleEquilibre(!visibleEquilibre);
  }

  const toggleOverlayAudacieux = () => {
    setVisibleAudacieux(!visibleAudacieux);
  }

  return (
    <View style = { styles.container }>
      <Text style = { styles.title }>Liste des Stratégies</Text>
      <Text style = { styles.title }>(Sélection manuelle)</Text>
      <Divider style={{ backgroundColor: 'gray', marginTop: 30 }} />

      <RNPickerSelect
        placeholder={{
          label: 'Select Stratégie...',
          value: null
        }}
        style={{ ...pickerSelectStyles }}
        onValueChange={(value) => console.log(value)}
        items={[
          { label: "Stratégie ACTIVE", value: "Stratégie ACTIVE" },
          { label: "Stratégie PASSIVE", value: "Stratégie PASSIVE" }
        ]}
      />

      <Text
        style = { styles.text }
        onPress={ toggleOverlayStrategy }
      >
        Voir détails stratégie
      </Text>

      <Overlay
        isVisible={ visibleStrategy }
        onBackdropPress={ toggleOverlayStrategy }
        overlayStyle={{
          width: 300,
          height: 300,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Text>Stratégie ACTIVE</Text>
        <Text>récurrence : 1 fois par mois</Text>
        <Text>Type : DMA</Text>
        <Text>détails</Text>
        <Button
          title="OK"
          buttonStyle={{
            width: 80,
            height: 50,
            marginTop: 40,
            backgroundColor: '#e1191d'
          }}
          onPress={ toggleOverlayStrategy }
        />
      </Overlay>

      <View>
        <Text
          style={{
            marginTop: 50,
            marginBottom: 10
          }}
          onPress={ toggleOverlayPrudent }
        >
          Profil prudent ?
        </Text>

        <Overlay
          isVisible={ visiblePrudent }
          onBackdropPress={ toggleOverlayPrudent }
          overlayStyle={{
            width: 300,
            height: 300,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
        <Text>Profil PRUDENT</Text>
        <Text>risque de perte 0 à 5%</Text>
        <Button
          title="OK"
          buttonStyle={{
            width: 80,
            height: 50,
            marginTop: 40,
            backgroundColor: '#e1191d'
          }}
          onPress={ toggleOverlayPrudent }
        />
      </Overlay>

        <View style={ styles.profilContainer }>
          <Text style={ styles.portefeuil }>Portefeuil 1 / perf / type...</Text>
          <Button
            title="détails"
            buttonStyle={{
              backgroundColor: '#e1191d',
              width: 80,
              height: 50
            }}
            onPress={ () => props.navigation.navigate('PortfolioScreen') }
          />
        </View>
      </View>

      <View>
        <Text
          style={{
            marginTop: 20,
            marginBottom: 10
          }}
          onPress={ toggleOverlayEquilibre }
        >
          Profil équilibré ?
        </Text>

        <Overlay
          isVisible={ visibleEquilibre }
          onBackdropPress={ toggleOverlayEquilibre }
          overlayStyle={{
            width: 300,
            height: 300,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Text>Profil EQUILIBRE</Text>
          <Text>risque de perte 0 à 5%</Text>
          <Button
            title="OK"
            buttonStyle={{
              width: 80,
              height: 50,
              marginTop: 40,
              backgroundColor: '#e1191d'
            }}
            onPress={ toggleOverlayEquilibre }
          />
        </Overlay>

        <View style={ styles.profilContainer }>
          <Text style={ styles.portefeuil }>Portefeuil 2 / perf / type...</Text>
          <Button
            title="détails"
            buttonStyle={{
              backgroundColor: '#e1191d',
              width: 80,
              height: 50
            }}
            onPress={ () => props.navigation.navigate('PortfolioScreen') }
          />
        </View>
      </View>

      <View>
        <Text
          style={{
            marginTop: 20,
            marginBottom: 10
          }}
          onPress={ toggleOverlayAudacieux }
        >
          Profil audacieux ?
        </Text>

        <Overlay
          isVisible={ visibleAudacieux }
          onBackdropPress={ toggleOverlayAudacieux }
          overlayStyle={{
            width: 300,
            height: 300,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
        <Text>Profil AUDATIEUX</Text>
        <Text>risque de perte 0 à 5%</Text>
        <Button
          title="OK"
          buttonStyle={{
            width: 80,
            height: 50,
            marginTop: 40,
            backgroundColor: '#e1191d'
          }}
          onPress={ toggleOverlayAudacieux }
        />
      </Overlay>

        <View style={ styles.profilContainer }>
          <Text style={ styles.portefeuil }>Portefeuil 3 / perf / type...</Text>
          <Button
            title="détails"
            buttonStyle={{
              backgroundColor: '#e1191d',
              width: 80,
              height: 50,
            }}
            onPress={ () => props.navigation.navigate('PortfolioScreen') }
          />
        </View>
      </View>

      <Text
        style={{
          color: 'blue',
          textAlign: 'center',
          marginTop: 50,
          paddingBottom: 300
        }}
        onPress={ () => props.navigation.navigate('IntroductionScreen') }
      >
        Retour
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingVertical: 30,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  title: {
    textAlign: 'center',
  },
  text: {
    marginTop: 10,
    color: 'blue',
    textAlign: 'left',
  },
  profilContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  portefeuil: {
    borderWidth: 1,
    borderColor: 'gray',
    fontSize: 18,
    paddingTop: 13,
    paddingHorizontal: 10,
    paddingBottom: 12,
    color: '#ccc'
  }
})

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 18,
    paddingTop: 13,
    paddingHorizontal: 10,
    paddingBottom: 12,
    marginTop: 10,
    marginHorizontal: 20,
    borderWidth: 1,
    borderColor: 'gray',
    backgroundColor: 'white',
    color: 'black',
    textAlign: 'center'
  },
});