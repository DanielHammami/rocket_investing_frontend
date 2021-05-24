import React, { useState, useEffect } from 'react'
import { useIsFocused } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { Entypo } from '@expo/vector-icons';

const Stack = createStackNavigator()

function WishListScreen(props) {
  const [dataUsers, setdataUsers] = useState('');
  const [dataPortofolio, setDataPortofolio] = useState('');
  // const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [isToggled, setIsToggled] = React.useState(false);

  const isFocused = useIsFocused();

  useEffect(() => {
    const findUsername = async () => {
      // console.log("--------------------------Props.token:-----------------------------", props.token)
      const dataUsers = await fetch(`http://192.168.1.11:3000/wishList?token=${props.token}`)
      const body = await dataUsers.json()
      setdataUsers(body)
      setDataPortofolio(body.portofolios.portofoliosId)
    }
    findUsername()
  }, [isFocused, isToggled])

  // console.log("--------------------------Users:-----------------------------", dataUsers)

  var deleteArticle = async (i) => {
    const deleteReq = await fetch('http://192.168.1.11:3000/wishlist', {
      method: 'DELETE',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      body: `position=${i}&token=${props.token}`
    })
      const body = await deleteReq.json()
      if (body.result) {
        // setDeleteConfirm(true)
        setIsToggled(!isToggled)
      }
  }

  let portefeuille = [];
  if (dataPortofolio && dataUsers.result && isFocused) {

    portefeuille = <View>
      {dataPortofolio.map((data, i) => {
        return <View key={i} style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
          <Button
            buttonStyle={{ backgroundColor: '#fff', width: 250, height: 50, alignSelf: 'center', borderColor: '#e1191d', marginBottom: 10 }}
            title={data.name}
            titleStyle={{ color: '#e1191d' }}
            type="outline"
            onPress={() => { props.onSave(data.name); props.navigation.navigate('PortfolioScreen') }}
          />
          <Entypo style={{marginBottom: 10}}
            name="squared-cross"
            size={55}
            color="#e1191d"
            onPress={() => deleteArticle(i)}
            />
        </View>
      })}
    </View>
    // console.log("test1 :", dataUsers.portofolios.portofoliosId[0].name)
    // console.log("test1 :", dataPortofolio)
  } else {
    portefeuille = <Text style={{ alignSelf:'center',fontSize: 15, marginTop: 250, fontWeight: "bold" }}>Aucun portefeuille enregistré</Text>
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Bonjour {dataUsers.username}</Text>
      <Text style={styles.titleFavorite}>Mes portefeuilles favoris :</Text>
      <ScrollView style={{width:500, height:'auto'}}>
        <View style={styles.listButton}>

          {portefeuille}

        </View>
      </ScrollView>

      <View style={{marginBottom:100}}>
        <Button buttonStyle={{ backgroundColor: "#e1191d", marginBottom: 15, alignItems: 'baseline', width: 300, height: 50, alignSelf: 'center' }}
          title="Ajouter un nouveau produit"
          titleStyle={{ paddingTop: 5 }}
          type="solid"
          onPress={() => props.navigation.navigate('StrategyListScreen')}
        />
        <Button
          buttonStyle={{ backgroundColor: '#fff', width: 300, height: 50, alignSelf: 'center', borderColor: '#e1191d' }}
          title="Déconnexion"
          titleStyle={{ color: '#e1191d' }}
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
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
  },

  // button3: {
  //   padding: 5,
  //   width: 270,
  // },

  // listButton : {
  //   flexDirection: "column",
  //   justifyContent: "space-around",
  //   paddingBottom: 20,
  // },

  titleFavorite: {
    fontSize: 20,
    paddingBottom: 15,
    textAlign: 'center',
  },

  titleText: {

    fontSize: 20,
    marginTop: 100,
    marginBottom: 30,
    fontWeight: "bold",
  },

  // paragraphs: {
  //   alignItems: 'baseline',
  //   justifyContent: 'center',
  //   paddingBottom: 15,
  //   width: "80%",
  // },

  paragraph: {
    padding: 15,
    fontSize: 15,
  },
})


function mapStateToProps(state) {
  return { token: state.token }
}

function mapDispatchToProps(dispatch) {
  return {
    onSave: function (name) {
      dispatch({ type: 'saveWishlist', name : name })
    }
  }
}

export default connect(
  mapStateToProps,    //state//
  mapDispatchToProps   //dispatch//
)(WishListScreen);
