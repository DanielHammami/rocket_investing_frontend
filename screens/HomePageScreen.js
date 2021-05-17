import React, { useState } from 'react'
import { StyleSheet, View, Image } from 'react-native'
import { Text, Button, Overlay, Input } from 'react-native-elements';

export default function HomePageScreen(props) {

  const [signUpVisible, setSignUpVisible] = useState(false);
  const [signInVisible, setSignInVisible] = useState(false);

  const toggleOverlaySignUp = () => {
    setSignUpVisible(false);
  };

  const toggleOverlaySignin = () => {
    setSignInVisible(false);
  };

  return (

    <View style={styles.container}>

      <Text h2 style={styles.title}>Rocket Investing</Text>
      <Text style={styles.text}>L'application boursière qui facilite vos investissements long termes</Text>

      {/* --------------------------------------- IMAGE ------------------------------------------- */}

      <Image source={require('../assets/Rocket_logo.png')} style={styles.image} />

      {/* ----------------------------------- BOUTON SIGN UP -------------------------------------- */}

      <Button
        buttonStyle={{ backgroundColor: "#e1191d", marginTop: 90, width: 300, alignSelf: 'center' }}
        title="Sign Up"
        onPress={() => setSignUpVisible(true)}
      />
      <Overlay isVisible={signUpVisible} overlayStyle={{ alignItems: 'center', justifyContent: 'center', width: 400, height: 400 }} onBackdropPress={toggleOverlaySignUp}>
        <Text h4>Sign Up</Text>
        <Text>Entrez votre nom et mot de passe</Text>
        <Input containerStyle={{ marginTop: 30, width: 300 }} placeholder='John' />
        <Input containerStyle={{ width: 300 }} secureTextEntry={true} placeholder='*********' />
        <Button
          buttonStyle={{ backgroundColor: "#e1191d", marginTop: 40, width: 300, alignSelf: 'center' }}
          title="Go"
          onPress={() => { props.navigation.navigate('IntroductionScreen'), setSignUpVisible(false) }} />
      </Overlay>

      {/* ----------------------------------- BOUTON SIGN IN -------------------------------------- */}

      <Button
        type="outline"
        buttonStyle={{ backgroundColor: '#fff', marginTop: 40, width: 300, alignSelf: 'center', borderColor: '#e1191d' }}
        title="Sign In"
        titleStyle={{ color: '#e1191d' }}
        onPress={() => setSignInVisible(true)}
      />
      <Overlay isVisible={signInVisible} overlayStyle={{ alignItems: 'center', justifyContent: 'center', width: 400, height: 400 }} onBackdropPress={toggleOverlaySignin}>
        <Text h4>Sign In</Text>
        <Text>Entrez votre nom et mot de passe</Text>
        <Input containerStyle={{ marginTop: 30, width: 300 }} placeholder='John' />
        <Input containerStyle={{ width: 300 }} secureTextEntry={true} placeholder='*********' />
        <Button
          buttonStyle={{ backgroundColor: "#e1191d", marginTop: 40, width: 300, alignSelf: 'center' }}
          title="Go"
          onPress={() => { props.navigation.navigate('WishListScreen'), setSignInVisible(false) }} />
      </Overlay>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    fontFamily: 'open sans'
  },
  title: {
    marginTop: 70,
    textAlign: 'center'
  },
  text: {
    marginTop: 70,
    marginLeft: 80,
    marginRight: 80,
    marginBottom: 60,
    textAlign: 'center'
  },
  image: {
    alignSelf: 'center',
    width: 300,
    height: 300
  }
})