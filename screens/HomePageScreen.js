import React, { useState } from 'react'
import { StyleSheet, View, Image } from 'react-native'
import { Text, Overlay, Input, Button } from 'react-native-elements';

export default function HomePageScreen(props) {
  // ------------------------------------- ETATS Overlay -------------------------------------
  const [signUpVisible, setSignUpVisible] = useState(false);
  const [signInVisible, setSignInVisible] = useState(false);

  // ------------------------------------- ETATS SignUp/In -----------------------------------
  const [signUpUsername, setSignUpUsername] = useState('')
  const [signUpPassword, setSignUpPassword] = useState('')
  const [signInUsername, setSignInUsername] = useState('')
  const [signInPassword, setSignInPassword] = useState('')
  const [userExists, setUserExists] = useState(false)
  const [listErrorsSignin, setErrorsSignin] = useState([])
  const [listErrorsSignup, setErrorsSignup] = useState([])

  // ------------------------------------- Gestion Sign Up -------------------------------------
  var handleSubmitSignUp = async () => {
    var rawData = await fetch('http://192.168.1.30:3000/sign-up', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `usernameFromFront=${signUpUsername}&passwordFromFront=${signUpPassword}`
    })
    const body = await rawData.json()
    console.log(body, 'SIGN UP')

    if (body.result == true) {
      setUserExists(true)
    } else {
      setErrorsSignup(body.error)
    }
  }

  // ------------------------------------- Gestion Sign In -------------------------------------
  var handleSubmitSignin = async () => {
    const data = await fetch('http://192.168.1.30:3000/sign-in', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `usernameFromFront=${signInUsername}&passwordFromFront=${signInPassword}`
    })
    const body = await data.json()
    console.log(body, 'SIGN IN')

    if (body.result == true) {
      setUserExists(true)
    } else {
      setErrorsSignin(body.error)
    }
  }

  // -------------------------------------- Gestion des erreurs ----------------------------------
  if (userExists) {
    var tabErrorsSignin = listErrorsSignin.map((error, i) => {
      return (<Text style={{ color: 'red' }}>{error}</Text>
      )
    })
    var tabErrorsSignup = listErrorsSignup.map((error, i) => {
      return (<Text style={{ color: 'red' }}>{error}</Text>)
    })
  }

  // -------------------------------------- Overlay setter -----------------------------------------
  const toggleOverlaySignUp = () => {
    setSignUpVisible(false);
  };
  const toggleOverlaySignin = () => {
    setSignInVisible(false);
  };

  // -------------------------------------------------------------------------------------------------
  // -------------------------------------- RETURN ---------------------------------------------------
  // -------------------------------------------------------------------------------------------------
  return (

    <View style={styles.container}>

      <Text h2 style={styles.title}>Rocket Investing</Text>
      <Text style={styles.text}>L'application boursière qui facilite vos investissements long termes</Text>

      <Image source={require('../assets/Rocket_logo.png')} style={styles.image} />

      {/* ----------------------------------- BOUTON SIGN UP -------------------------------------- */}
      <Button
        buttonStyle={{ backgroundColor: "#e1191d", marginTop: 90, width: 300, alignSelf: 'center' }}
        title="Sign Up"
        onPress={() => setSignUpVisible(true)}
      />
      <Overlay isVisible={signUpVisible} overlayStyle={{ marginTop: -60, alignItems: 'center', justifyContent: 'center', width: 400, height: 400 }} onBackdropPress={toggleOverlaySignUp}>
        <Text h4>Sign Up</Text>
        <Text>Entrez votre nom et mot de passe</Text>
        <Input containerStyle={{ marginTop: 30, width: 300 }} placeholder='John' onChangeText={(val) => setSignUpUsername(val)} value={signUpUsername} />
        <Input containerStyle={{ width: 300 }} secureTextEntry={true} placeholder='*********' onChangeText={(val) => setSignUpPassword(val)} value={signUpPassword} />

        {tabErrorsSignup}

        <Button
          buttonStyle={{ backgroundColor: "#e1191d", marginTop: 40, width: 300, alignSelf: 'center' }}
          title="Go"
          onPress={() => { handleSubmitSignUp(), props.navigation.navigate('IntroductionScreen'), setSignUpVisible(false) }}
        />
      </Overlay>

      {/* ----------------------------------- BOUTON SIGN IN -------------------------------------- */}
      <Button
        type="outline"
        buttonStyle={{ backgroundColor: '#fff', marginTop: 40, width: 300, alignSelf: 'center', borderColor: '#e1191d' }}
        title="Sign In"
        titleStyle={{ color: '#e1191d' }}
        onPress={() => setSignInVisible(true)}
      />
      <Overlay isVisible={signInVisible} overlayStyle={{ marginTop: -60, alignItems: 'center', justifyContent: 'center', width: 400, height: 400 }} onBackdropPress={toggleOverlaySignin}>
        <Text h4>Sign In</Text>
        <Text>Entrez votre nom et mot de passe</Text>
        <Input containerStyle={{ marginTop: 30, width: 300 }} placeholder='John' onChangeText={(val) => setSignInUsername(val)} value={signInUsername} />
        <Input containerStyle={{ width: 300 }} secureTextEntry={true} placeholder='*********' onChangeText={(val) => setSignInPassword(val)} value={signInPassword} />

        {tabErrorsSignin}

        <Button
          buttonStyle={{ backgroundColor: "#e1191d", marginTop: 40, width: 300, alignSelf: 'center' }}
          title="Go"
          onPress={() => { handleSubmitSignin(), props.navigation.navigate('WishListScreen'), setSignInVisible(false) }} 
          />
      </Overlay>
    </View>
  )
}

// ----------------------- STYLE --------------------------
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