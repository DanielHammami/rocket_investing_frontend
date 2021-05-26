import React, { useState } from 'react'
import { StyleSheet, View, Image } from 'react-native'
import { Text, Overlay, Input, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';

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
  const isFocused = useIsFocused();


  // ------------------------------------- Gestion Sign Up -------------------------------------
  var handleSubmitSignUp = async () => {
    var rawData = await fetch('https://rocketinvesting.herokuapp.com/sign-up', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `usernameFromFront=${signUpUsername}&passwordFromFront=${signUpPassword}`
    })
    const body = await rawData.json()

    if (body.result == true) {
      props.addToken(body.token)
      setUserExists(true)
      props.navigation.navigate('IntroductionScreen')
      setErrorsSignUp([])
      setErrorsSignIn([])
      setSignInUsername("")
      setSignInPassword("")
      setSignUpVisible(false)
    } else {
      setErrorsSignUp(body.error)
    }
  }

  // ------------------------------------- Gestion Sign In -------------------------------------
  var handleSubmitSignIn = async () => {
    const data = await fetch('https://rocketinvesting.herokuapp.com/sign-in', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `usernameFromFront=${signInUsername}&passwordFromFront=${signInPassword}`
    })
    const body = await data.json()

    if (body.result == true) {
      props.addToken(body.token)
      setUserExists(true)
      props.navigation.navigate('WishListScreen')
      setErrorsSignIn([])
      setErrorsSignUp([])
      setSignInUsername("")
      setSignInPassword("")
      setSignInVisible(false)
    } else {
      setErrorsSignIn(body.error)
    }
  }

  // ------------------------------------- Msgs d'erreurs -------------------------------------

  var errorsSignIn = <View>
    {listErrorsSignIn.map((error, i) => {
      return (<Text key={i} style={{ color: 'red', alignSelf: 'center' }}>{error}</Text>)
    })}</View>

  var errorsSignUp = <View>
    {listErrorsSignUp.map((error, i) => {
      return (<Text key={i} style={{ color: 'red', alignSelf: 'center' }}>{error}</Text>)
    })}</View>

  // -------------------------------------- Overlay setter -----------------------------------------

  const toggleOverlaySignUp = () => {
    setSignUpVisible(false);
  };
  const toggleOverlaySignIn = () => {
    setSignInVisible(false);
  };

  // -------------------------------------------------------------------------------------------------
  // -------------------------------------- RETURN ---------------------------------------------------
  // -------------------------------------------------------------------------------------------------
  return (

    <View style={styles.container}>

      <Text h1 style={styles.title}>Rocket Investing</Text>

      <Text style={styles.text}>L'application boursière qui facilite vos investissements à long terme</Text>

      <Image source={require('../assets/Rocket_logo.png')} style={styles.image} />

      <View style={{ marginBottom: 70 }}>

        {/* ----------------------------------- BOUTON SIGN UP -------------------------------------- */}
        <Button
          buttonStyle={{ backgroundColor: "#e1191d", marginBottom: 15, alignItems: 'baseline', width: 250, height: 50, alignSelf: 'center' }}
          title="Sign Up"
          titleStyle={{ paddingTop: 5 }}
          onPress={() => setSignUpVisible(true)}
        />
        <Overlay isVisible={signUpVisible} overlayStyle={{ marginTop: -60, alignItems: 'center', justifyContent: 'center', width: 300, height: 350 }} onBackdropPress={toggleOverlaySignUp}>
          <Text h4>Sign Up</Text>
          <Text>Entrez votre nom et mot de passe</Text>
          <Input containerStyle={{ marginTop: 30, width: 200 }} placeholder='John' onChangeText={(val) => setSignUpUsername(val)} />
          <Input containerStyle={{ width: 200 }} secureTextEntry={true} placeholder='*********' onChangeText={(val) => setSignUpPassword(val)} />
          {errorsSignUp}
          <Button
            buttonStyle={{ backgroundColor: "#e1191d", marginTop: 40, width: 80, height: 50, alignSelf: 'center' }}
            title="Go"
            onPress={() => handleSubmitSignUp()}
          />
        </Overlay>

        {/* ----------------------------------- BOUTON SIGN IN -------------------------------------- */}
        <Button
          type="outline"
          buttonStyle={{ backgroundColor: '#fff', width: 250, height: 50, alignSelf: 'center', borderColor: '#e1191d' }}
          title="Sign In"
          titleStyle={{ color: '#e1191d' }}
          onPress={() => setSignInVisible(true)}
        />
        <Overlay isVisible={signInVisible} overlayStyle={{ marginTop: -60, alignItems: 'center', justifyContent: 'center', width: 300, height: 350 }} onBackdropPress={toggleOverlaySignIn}>
          <Text h4>Sign In</Text>
          <Text>Entrez votre nom et mot de passe</Text>
          <Input containerStyle={{ marginTop: 30, width: 200 }} placeholder='John' onChangeText={(val) => setSignInUsername(val)}  />
          <Input containerStyle={{ width: 200 }} secureTextEntry={true} placeholder='*********' onChangeText={(val) => setSignInPassword(val)}/>
          {errorsSignIn}
          <Button
            buttonStyle={{ backgroundColor: "#e1191d", marginTop: 40, width: 80, height: 50, alignSelf: 'center' }}
            title="Go"
            onPress={() => { handleSubmitSignIn() ; errorsSignIn }}
          />
        </Overlay>
      </View>

    </View>
  )
}

// ----------------------- STYLE --------------------------
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    marginTop: 20,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  text: {
    marginTop: -20,
    marginLeft: 75,
    marginRight: 75,
    textAlign: 'center',
    fontSize: 18
  },
  image: {
    alignSelf: 'center',
    width: 300,
    height: 300
  }
})

function mapDispatchToProps(dispatch) {
  return {
    addToken: function (token) {
      dispatch({ type: 'saveToken', token: token })
    }
  }
}

export default connect(
  null,
  mapDispatchToProps
)(HomePageScreen)