import React, { useState } from 'react'
import { StyleSheet, View, Image } from 'react-native'
import { Text, Overlay, Input, Button } from 'react-native-elements';
import { connect } from 'react-redux';

function HomePageScreen(props) {
  // ------------------------------------- ETATS Overlay -------------------------------------
  const [signUpVisible, setSignUpVisible] = useState(false);
  const [signInVisible, setSignInVisible] = useState(false);

  // ------------------------------------- ETATS SignUp/In -----------------------------------
  const [signUpUsername, setSignUpUsername] = useState('')
  const [signUpPassword, setSignUpPassword] = useState('')
  const [signInUsername, setSignInUsername] = useState('')
  const [signInPassword, setSignInPassword] = useState('')
  const [userExists, setUserExists] = useState(false)
  const [listErrorsSignIn, setErrorsSignIn] = useState([])
  const [listErrorsSignUp, setErrorsSignUp] = useState([])

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
      props.addToken(body.token)
      console.log('TOKEN SIGN UP : ',body.token )
      setUserExists(true)
    } else {
      setErrorsSignUp(body.error)
    }
  }

  // ------------------------------------- Gestion Sign In -------------------------------------
  var handleSubmitSignIn = async () => {
    const data = await fetch('http://192.168.1.30:3000/sign-in', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `usernameFromFront=${signInUsername}&passwordFromFront=${signInPassword}`
    })
    const body = await data.json()
    console.log(body, 'SIGN IN')

    if (body.result == true) {
      props.addToken(body.token)
      console.log('TOKEN SIGN IN : ',body.token )
      setUserExists(true)
    } else {
      setErrorsSignIn(body.error)
    }
  }

  // -------------------------------------- Gestion des erreurs ----------------------------------
  if(userExists){
    var tabErrorsSignIn = listErrorsSignIn.map((error, i) => {
      return (<Text style={{ color: 'red' }}>{error}</Text>
      )
    })
    var tabErrorsSignUp = listErrorsSignUp.map((error, i) => {
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
        buttonStyle={{ backgroundColor: "#e1191d",alignItems: 'baseline', width: 250, height: 50, alignSelf: 'center' }}
        title="Sign Up"
        titleStyle={{paddingTop:5}}
        onPress={() => setSignUpVisible(true)}
      />
      <Overlay isVisible={signUpVisible} overlayStyle={{ marginTop: -60, alignItems: 'center', justifyContent: 'center', width: 300, height: 350 }} onBackdropPress={toggleOverlaySignUp}>
        <Text h4>Sign Up</Text>
        <Text>Entrez votre nom et mot de passe</Text>
        <Input containerStyle={{ marginTop: 30, width: 200 }} placeholder='John' onChangeText={(val) => setSignUpUsername(val)} value={signUpUsername} />
        <Input containerStyle={{ width: 200 }} secureTextEntry={true} placeholder='*********' onChangeText={(val) => setSignUpPassword(val)} value={signUpPassword} />
        <Button
          buttonStyle={{ backgroundColor: "#e1191d", marginTop: 40, width: 80, height:50, alignSelf: 'center' }}
          title="Go"
          onPress={() => { handleSubmitSignUp(), props.navigation.navigate('IntroductionScreen'), setSignUpVisible(false) }}
        />
      </Overlay>

      {/* ----------------------------------- BOUTON SIGN IN -------------------------------------- */}
      <Button
        type="outline"
        buttonStyle={{ backgroundColor: '#fff', marginTop: 20, width: 250,height: 50, alignSelf: 'center', borderColor: '#e1191d' }}
        title="Sign In"
        titleStyle={{ color: '#e1191d' }}
        onPress={() => setSignInVisible(true)}
      />
      <Overlay isVisible={signInVisible} overlayStyle={{ marginTop: -60, alignItems: 'center', justifyContent: 'center', width: 300, height: 350 }} onBackdropPress={toggleOverlaySignin}>
        <Text h4>Sign In</Text>
        <Text>Entrez votre nom et mot de passe</Text>
        <Input containerStyle={{ marginTop: 30, width: 200 }} placeholder='John' onChangeText={(val) => setSignInUsername(val)} value={signInUsername} />
        <Input containerStyle={{ width: 200 }} secureTextEntry={true} placeholder='*********' onChangeText={(val) => setSignInPassword(val)} value={signInPassword} />
        <Button
          buttonStyle={{ backgroundColor: "#e1191d", marginTop: 40, width: 80,height:50, alignSelf: 'center' }}
          title="Go"
          onPress={() => { handleSubmitSignIn(), props.navigation.navigate('WishListScreen'), setSignInVisible(false) }}
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
    marginTop: 80,
    textAlign: 'center'
  },
  text: {
    marginTop: 40,
    marginLeft: 80,
    marginRight: 80,
    marginBottom: 40,
    textAlign: 'center'
  },
  image: {
    alignSelf: 'center',
    width: 300,
    height: 300
  }
})

function mapDispatchToProps(dispatch){
  return {
    addToken: function(token){
      dispatch({type: 'saveToken', token: token})
    }
  }
}

export default connect(
  null,
  mapDispatchToProps
)(HomePageScreen)