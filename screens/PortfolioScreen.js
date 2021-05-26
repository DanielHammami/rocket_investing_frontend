import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, ActivityIndicator } from 'react-native'
import { Header, Text, Card, Overlay, Button } from 'react-native-elements';
import { useIsFocused } from '@react-navigation/native';
import { connect } from 'react-redux';
import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
import { LineChart } from "react-native-chart-kit";

function PortfolioScreen(props) {
  const [visible, setVisible] = useState(false);
  const [dataBDD, setdataBDD] = useState({});
  const [username, setUsername] = useState("");
  const [dataUsers, setdataUsers] = useState('');
  const [dataPortofolio, setDataPortofolio] = useState([]);
  const [dataAPI, setDataAPI] = useState({});
  const [ticker, setTicker] = useState("SPY");

  const isFocused = useIsFocused();

  // var APIkey1 = "dd62a27db1860da653545a9bdee0bdce";
  // var APIkey2 = "233b0ce2bd6d0973636042250c2ccc3d";
  var APIkey3 = "bd943945515e4ccec711630fb3df5069";

  useEffect(() => {
    const findAPI = async () => {
      const API = await fetch(`http://api.marketstack.com/v1/eod?access_key=${APIkey3}&symbols=${ticker}`)
      const body = await API.json()
      setDataAPI(body)
      }
    if(dataBDD.selectBS) {
    setTicker(dataBDD.selectBS[0].ticker)
    findAPI()
    }
  }, [dataBDD])

  useEffect(() => {
    const findPortofolio = async () => {
      const dataPortofolio = await fetch(`https://rocketinvesting.herokuapp.com/portofolio?name=${props.name}`)
      const body = await dataPortofolio.json()
      setdataBDD(body.portofolios)
    }
    if(props.name && isFocused) {
    findPortofolio()
    }
  }, [isFocused, dataPortofolio])

  useEffect(() => {
    const findDouble = async () => {
      const dataDouble = await fetch(`https://rocketinvesting.herokuapp.com/wishList?token=${props.token}`)
      const body = await dataDouble.json()
      setDataPortofolio(body.portofolios.portofoliosId)
      setdataUsers(body)
    }
    if(props.token && isFocused) {
    findDouble()
    }
  }, [isFocused])

  let ButtonIsValid = false
  if (dataPortofolio && dataUsers.result && isFocused) {

    for (let i=0; i<dataPortofolio.length; i++){
      if(dataBDD._id == dataPortofolio[i]._id){
        ButtonIsValid = true
      }
    }
  }

  let ButtonVisible;
  if(ButtonIsValid && isFocused){
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
  if (dataBDD && dataBDD.strategy === "passive" && isFocused) {

    passif = <Card containerStyle={{ marginTop: 15, marginBottom: 30}}>
      <Text style={{ fontSize: 16, fontWeight: "bold" }}>Composition du portefeuille : {"\n"}</Text>

      {dataBDD.actifs.map((data, i) => {
        return <Text style={{fontSize: 16}} key={i}>Actif {i + 1}: {"\n"}
                                          Description: {data.description} {"\n"}
                                          Ticker : ({data.ticker}) {"\n"}
                                          Répartition : {data.repartition} % {"\n"}
                                          type : {data.type} {"\n"}
                          </Text>
                  })}
                  <Text style={{fontSize: 16}}>Total répartition des actifs = 100% {"\n"}</Text>
                  <Text style={{fontSize: 16,fontWeight: "bold"}}>Rééquilibrage chaque trimestre pour conserver les mêmes proportions.</Text>
            </Card>

  } else if (dataBDD.strategy === "active") {

    actif = <Card containerStyle={{ marginTop: 15, marginBottom: 30}}>
      <Text style={{ fontSize: 16, fontWeight: "bold" }}>Mois en cours : {"\n"}Du 01/05/21 au 30/05/21 {"\n"}</Text>
      <Text style={{ fontSize: 16, fontWeight: "bold" }}>Composition du portefeuille : {"\n"}</Text>

      {dataBDD.selectBS.map((data, i) => {
        return <Text style={{fontSize: 16}} key={i}>Actif à {data.action} {"\n"}
                                          Description: {data.description} {"\n"}
                                          Ticker : ({data.ticker}) {"\n"}
                                          Répartition : {data.repartition} % {"\n"}
                                          type : {data.type} {"\n"}
        </Text>
      })}

      <Text style={{fontSize: 16}}>Total répartition des actifs = 100% {"\n"}</Text>
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

  if (riskStyle === 'audacieux') {colorRisk=<Text style={{color:'red'}}>{dataBDD.risk} <FontAwesome5 name="chess-king" size={16} color="black" /> </Text>}
  else if (riskStyle === 'prudent') {colorRisk=<Text style={{color:'orange'}}>{dataBDD.risk} <FontAwesome5 name="chess-rook" size={16} color="black" /></Text>}
  else {colorRisk=<Text style={{color:'green'}}>{dataBDD.risk} <FontAwesome5 name="chess-knight" size={16} color="black" /></Text>}
//-----------------------------------------------------------------------------------------------------------//

let date = [];
let price = [];
var monthValid;
let perf6M = 0;
if (dataAPI.data && isFocused) {

  for (let i=0; i<dataAPI.data.length; i++){

    var now = new Date(dataAPI.data[i].date) //  format: 2021-05-24T11:46:22.692Z
    var nowToString = now.getMonth();

    if(nowToString != monthValid){
      var months = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];
      months = months[nowToString]
      date.push(months)
      price.push(dataAPI.data[i].close)
    }
    monthValid = nowToString
  }
  date = date.reverse();
  price = price.reverse();

  // Performances sur 6 mois :
  perf6M = 100-((price[0]*100)/price[5])
  perf6M = perf6M.toFixed(2)
}

let graph;
if(dataAPI.data && isFocused){
  graph = <LineChart
            data={{
              labels: date,
              datasets: [
                {
                  data: price
                }
              ]
            }}
            width={315}
            height={250}
            yAxisLabel="€"
            yAxisSuffix=""
            yAxisInterval={1}
            chartConfig={{
              backgroundColor: "#3f9adb",
              backgroundGradientFrom: "#3f9adb",
              backgroundGradientTo: "#007ed9",
              decimalPlaces: 2,
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16
              },
              propsForDots: {
                r: "6",
                strokeWidth: "2",
                stroke: "#007ed9"
              }
            }}
            bezier
            style={{
              marginVertical: 4,
              borderRadius: 1
            }}
          />
}
else {
  graph = <ActivityIndicator size="large" color="#e26a00" />
}

  return (
    <View style={styles.container}>
      <Header
        containerStyle={{ backgroundColor: '#2c2c2c' }}
        leftComponent={<Button title='Mes Favoris' buttonStyle={{ width: 130, color: '#fff', backgroundColor: '#2c2c2c' }} onPress={() => props.navigation.navigate('WishListScreen')} />}
        rightComponent={<Button title='Déconnexion' buttonStyle={{ width: 130, color: '#fff', backgroundColor: '#2c2c2c' }} onPress={() => {props.addToken(null); props.navigation.navigate('HomePageScreen')}} />}
      />
      <Text h4 style={{ textAlign: 'center', fontWeight: 'bold', marginTop: 15, marginBottom: 15 }}>
        Portefeuille {"\n"}{dataBDD.name}
      </Text>
              <ScrollView>

                <Text style={{alignSelf:'center', fontSize: 16}}>Graphique <Entypo name="area-graph" size={15} color="black" /></Text>
                <Card containerStyle={{ marginTop: 15, marginBottom: 30 }}>
                  {graph}
                </Card>

                <Text style={{alignSelf:'center', fontSize: 16}}>Performances <Ionicons name="rocket-outline" size={15} color="black" /></Text>
                <Card containerStyle={{ marginTop: 15, marginBottom: 30 }}>
                  <Text style={{ fontSize: 16 }}>6 mois :  <Text style={{color:'green'}}>{perf6M} %</Text></Text>
                  <Text style={{ fontSize: 16 }}>1 an :  <Text style={{color:'green'}}>{dataBDD.perf1} </Text></Text>
                  <Text style={{ fontSize: 16 }}>2 ans :  <Text style={{color:'green'}}>{dataBDD.perf2}</Text></Text>
                  <Text style={{ fontSize: 16 }}>5 ans :  <Text style={{color:'green'}}>{dataBDD.perf5}</Text></Text>
                  <Text style={{ fontSize: 16 }}>Max :  <Text style={{color:'green'}}>{dataBDD.perfmax}</Text></Text>
                  <Text style={{ fontSize: 16 }}>Type de stratégie : <Text style={ (dataBDD.strategy == 'passive') ? styles.passif={color:'blue'} : styles.actif={color:'red'}}>{dataBDD.strategy} </Text></Text>
                  <Text style={{ fontSize: 16 }}>Profil de risque : {colorRisk}</Text>
                  <Text style={{ fontSize: 16 }}>Perte maximum : <Text style={{color:'red'}}>{dataBDD.maxloss}</Text></Text>
                  <Text style={{ fontSize: 16 }}>Volatilité : <Text style={{color:'red'}}>{dataBDD.volatility}</Text></Text>
                </Card>


                <Text style={{alignSelf:'center', fontSize: 16}}>Description <MaterialIcons name="description" size={15} color="black" /></Text>
                <Card containerStyle={{ marginTop: 15, marginBottom: 30 }}>
                  <Text style={{textAlign: 'justify', fontSize: 16}}>{dataBDD.description1} {"\n"}</Text>
                  <Text style={{textAlign: 'justify', fontSize: 16}}>{dataBDD.description2} {"\n"}</Text>
                  <Text style={{textAlign: 'justify', fontSize: 16}}>{dataBDD.description3} {"\n"}</Text>
                  <Text style={{textAlign: 'justify', fontSize: 16}}>{dataBDD.description4} {"\n"}</Text>
                  <Text style={{textAlign: 'justify', fontSize: 16}}>{dataBDD.description5} {"\n"}</Text>
                  <Text style={{textAlign: 'justify', fontSize: 16}}>{dataBDD.description6} {"\n"}</Text>
                  <Text style={{textAlign: 'justify', fontSize: 16}}>{dataBDD.description7} {"\n"}</Text>
                  <Text style={{textAlign: 'justify', fontSize: 16}}>{dataBDD.description8} {"\n"}</Text>
                </Card>

                <Text style={{alignSelf:'center', fontSize: 16}}>Allocation d'actifs <Foundation name="graph-horizontal" size={15} color="black" /></Text>
                {passif}
                {actif}

                </ScrollView>

        <View style={{marginBottom:50}}>

          {ButtonVisible}

          <Button buttonStyle={{ backgroundColor: '#fff', width: 300, height: 50, alignSelf: 'center', borderColor: 'black'}}
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

          <Text h4 style={{ textAlign: 'center', marginTop: 15, fontSize: 16 }}>Félicitation {username}</Text>
          <Text style={{ textAlign: 'center', marginTop: 15, fontSize: 16 }}>Votre stratégie est enregistrée !</Text>

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
    flex: 1,
    backgroundColor: '#E7E6E6',
  },
})

function mapStateToProps(state){
  return {token: state.token, name: state.wishlist}
}

function mapDispatchToProps(dispatch) {
  return {
    addToken: function (token) {
      dispatch({ type: 'saveToken', token: token })
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PortfolioScreen);