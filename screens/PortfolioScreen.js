import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native'
import { Header, Text, Card, Overlay, Button, Icon, Badge } from 'react-native-elements';
import { useIsFocused } from '@react-navigation/native';
import { connect } from 'react-redux';
import { FontAwesome5 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';


function PortfolioScreen(props) {
  const [visible, setVisible] = useState(false);
  const [dataBDD, setdataBDD] = useState([]);
  const [username, setUsername] = useState("");
  const [dataUsers, setdataUsers] = useState('');
  const [dataPortofolio, setDataPortofolio] = useState('');

  const isFocused = useIsFocused();

  useEffect(() => {
    const findPortofolio = async () => {
      const dataPortofolio = await fetch(`https://rocketinvesting.herokuapp.com/portofolio?name=${props.name}`)
      const body = await dataPortofolio.json()
      setdataBDD(body.portofolios)
    }
    findPortofolio()
  }, [isFocused, props.name, dataPortofolio])

  //console.log("dataBDD :", dataBDD)
  //console.log("props.name :", props.name)
  //console.log("props.token :", props.token)

  useEffect(() => {
    const findDouble = async () => {
      const dataDouble = await fetch(`https://rocketinvesting.herokuapp.com/wishList?token=${props.token}`)
      const body = await dataDouble.json()
      setDataPortofolio(body.portofolios.portofoliosId)
      setdataUsers(body)
      // console.log("body double :",body.portofolios.portofoliosId)
    }
    findDouble()
  }, [])

  let ButtonIsValid = false
  if (dataPortofolio && dataUsers.result && isFocused) {

    for (let i=0; i<dataPortofolio.length; i++){
      // console.log("dataPortofolio[i]", dataPortofolio[i]._id)
      // console.log("dataBDD._id", dataBDD._id)

      if(dataBDD._id == dataPortofolio[i]._id){
        ButtonIsValid = true
        // console.log("ButtonIsValid", ButtonIsValid)
      }
    }
  }

  let ButtonVisible;
  if(ButtonIsValid){
    ButtonVisible = <Button containerStyle={{ marginTop: 20, alignItems: 'center' }}
                    buttonStyle={{ backgroundColor: "#5DC803", marginBottom: 15, alignItems: 'baseline', width: 300, height: 50, alignSelf: 'center' }}
                    icon={{
                      name: "check-circle",
                      size: 30,
                      color: "white",
                      paddingBottom: 5
                    }}
                    title=" Retour à Mes Favoris"
                    titleStyle={{ paddingBottom: 5 }}
                    type="solid"
                    onPress={() => props.navigation.navigate('WishListScreen')}
                    />
  } else {
    ButtonVisible = <Button containerStyle={{ marginTop: 20, alignItems: 'center' }}
                    buttonStyle={{ backgroundColor: "#e1191d", marginBottom: 15, alignItems: 'baseline', width: 300, height: 50, alignSelf: 'center' }}
                    icon={{
                      name: "star",
                      size: 30,
                      color: "white",
                      paddingBottom: 5
                    }}
                    title=" Enregistrer cette stratégie"
                    titleStyle={{ paddingBottom: 5 }}
                    type="solid"
                    onPress={() => { saveToWishlist(); setVisible(true) }}
    />
  }

  let passif = [];
  let actif = [];
  if (dataBDD && dataBDD.strategy === "passive") {
    console.log("test",dataBDD.strategy)

    passif = <Card containerStyle={{ marginTop: 15, marginBottom: 30}}>
      <Text style={{ fontSize: 16, fontWeight: "bold" }}>Composition du portefeuille : {"\n"}</Text>

      {dataBDD.actifs.map((data, i) => {
        return <Text key={i}>Actif {i + 1}: {"\n"}
                                          Description: {data.description} {"\n"}
                                          Ticker : ({data.ticker}) {"\n"}
                                          Répartition : {data.repartition} % {"\n"}
                                          type : {data.type} {"\n"}
                          </Text>
                  })}
                  <Text>Total répartition des actifs = 100% {"\n"}</Text>
                  <Text style={{fontSize: 16,fontWeight: "bold"}}>Rééquilibrage chaque trimestre pour conserver les mêmes proportions.</Text>
            </Card>

  } else if (dataBDD.strategy === "active") {
    console.log("test",dataBDD.strategy)

    actif = <Card containerStyle={{ marginTop: 15, marginBottom: 30}}>
      <Text style={{ fontSize: 16, fontWeight: "bold" }}>Mois en cours : {"\n"}Du 01/05/21 au 30/05/21 {"\n"}</Text>
      <Text style={{ fontSize: 16, fontWeight: "bold" }}>Composition du portefeuille : {"\n"}</Text>

      {dataBDD.selectBS.map((data, i) => {
        return <Text key={i}>Actif à {data.action} {"\n"}
                                          Description: {data.description} {"\n"}
                                          Ticker : ({data.ticker}) {"\n"}
                                          Répartition : {data.repartition} % {"\n"}
                                          type : {data.type} {"\n"}
        </Text>
      })}

      <Text>Total répartition des actifs = 100% {"\n"}</Text>
      <Text style={{ fontSize: 16, fontWeight: "bold" }}>Rééquilibrage du portefeuille tous les débuts de mois</Text>
    </Card>
  }

  var saveToWishlist = async () => {

    const reqWishlist = await fetch('https://rocketinvesting.herokuapp.com/wishlist', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `_idFront=${dataBDD._id}&token=${props.token}`
    })
    const body = await reqWishlist.json()
    setUsername(body.userName)
  }


  //---------------------------------changement de couleur pour la catégorie Risque--------------------------------//
  var riskStyle = dataBDD.risk
  var colorRisk;
  // console.log("---------------------------riskstyle---------------------", riskStyle)
  if (riskStyle === 'audacieux') {colorRisk={color:'red'}} 
  else if (riskStyle === 'prudent') {colorRisk={color:'orange'}} 
  else {colorRisk={color:'green'}}; 
//-----------------------------------------------------------------------------------------------------------//


  return (
    <View style={styles.container}>
      <Header
        containerStyle={{ backgroundColor: '#2c2c2c' }}
        leftComponent={<Button title='Mes Favoris' buttonStyle={{ width: 130, color: '#fff', backgroundColor: '#2c2c2c' }} onPress={() => props.navigation.navigate('WishListScreen')} />}
        rightComponent={<Button title='Déconnexion' buttonStyle={{ width: 130, color: '#fff', backgroundColor: '#2c2c2c' }} onPress={() => props.navigation.navigate('HomePageScreen')} />}
      />
      <Text h4 style={{ textAlign: 'center', fontWeight: 'bold', marginTop: 15, marginBottom: 15 }}>
        Portefeuille {"\n"}{dataBDD.name}
      </Text>
              <ScrollView>

                <Text style={{alignSelf:'center'}}>Graphique <Entypo name="area-graph" size={15} color="black" /></Text>
                <Card containerStyle={{ marginTop: 15, marginBottom: 30 }}>
                <Text>Graphique</Text>
                </Card>

                <Text style={{alignSelf:'center'}}>Performances <Ionicons name="rocket-outline" size={15} color="black" /></Text>
                <Card containerStyle={{ marginTop: 15, marginBottom: 30 }}>
                  <Text>1 an :  <Text style={{color:'green'}}>{dataBDD.perf1} </Text></Text>
                  <Text>2 ans :  <Text style={{color:'green'}}>{dataBDD.perf2}</Text></Text>
                  <Text>5 ans :  <Text style={{color:'green'}}>{dataBDD.perf5}</Text></Text>
                  <Text>Max :  <Text style={{color:'green'}}>{dataBDD.perfmax}</Text></Text>
                  <Text>Type de stratégie : <Text style={ (dataBDD.strategy == 'passive') ? styles.passif={color:'blue'} : styles.actif={color:'red'}}>{dataBDD.strategy} </Text></Text>
                  <Text>Profil de risque : <Text style={colorRisk}>{dataBDD.risk} </Text></Text>  
                  <Text>Perte maximum : <Text style={{color:'red'}}>{dataBDD.maxloss}</Text></Text>
                  <Text>Volatilité : <Text style={{color:'red'}}>{dataBDD.volatility}</Text></Text>
                </Card>


                <Text style={{alignSelf:'center'}}>Description <MaterialIcons name="description" size={15} color="black" /></Text>
                <Card containerStyle={{ marginTop: 15, marginBottom: 30 }}>
                  <Text style={{textAlign: 'justify'}}>{dataBDD.description1} {"\n"}</Text>
                  <Text style={{textAlign: 'justify'}}>{dataBDD.description2} {"\n"}</Text>
                  <Text style={{textAlign: 'justify'}}>{dataBDD.description3} {"\n"}</Text>
                  <Text style={{textAlign: 'justify'}}>{dataBDD.description4} {"\n"}</Text>
                  <Text style={{textAlign: 'justify'}}>{dataBDD.description5} {"\n"}</Text>
                  <Text style={{textAlign: 'justify'}}>{dataBDD.description6} {"\n"}</Text>
                  <Text style={{textAlign: 'justify'}}>{dataBDD.description7} {"\n"}</Text>
                  <Text style={{textAlign: 'justify'}}>{dataBDD.description8} {"\n"}</Text>
                </Card>

                <Text style={{alignSelf:'center'}}>Allocation d'actifs <Foundation name="graph-horizontal" size={15} color="black" /></Text>
                {passif}
                {actif}

                </ScrollView>

        <View style={{marginBottom:50}}>

          {ButtonVisible}

          <Button buttonStyle={{ backgroundColor: '#fff', width: 300, height: 50, alignSelf: 'center', borderColor: 'black'}}
            // containerStyle={{ width: '100%', marginTop: 15, marginBottom: 50 }}
            title="Retour"
            titleStyle={{ color: "black" }}
            type="outline"
            onPress={() => props.navigation.navigate('WishListScreen')}
          />
        </View>
        <Overlay isVisible={visible} width="auto" height="auto" overlayStyle={{ width: '80%',alignItems: 'center' }}>

          <FontAwesome5 style={{ marginTop: 30, marginBottom: 20 }}
            name="medal"
            size={100}
            color="#f6b93b"
          />

          <Text h4 style={{ textAlign: 'center', marginTop: 15 }}>Félicitation {username}</Text>
          <Text style={{ textAlign: 'center', marginTop: 15 }}>Votre stratégie est enregistrée !</Text>

          <Button buttonStyle={{ backgroundColor: '#e1191d', width: 100, alignSelf: 'center', borderColor: 'black', marginTop:20, marginBottom: 20}}
            title="ok"
            titleStyle={{ color: "#fff" }}
            type="solid"
            onPress={() => { props.navigation.navigate('WishListScreen'); setVisible(false) }}
          />

        </Overlay>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',

    flex: 1,
    // display: 'flex',
    // flexDirection: 'column',
    // justifyContent: 'space-around',
    // alignItems: 'center',
    backgroundColor: '#E7E6E6',
  },
})

function mapStateToProps(state){
  console.log("state", state)
  return {token: state.token, name: state.wishlist}
}

export default connect(
  mapStateToProps,
  null
)(PortfolioScreen);