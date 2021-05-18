import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native'
import { Header, Text, Card, Overlay, Button, Icon, Badge } from 'react-native-elements';
import { useIsFocused } from '@react-navigation/native';
import { connect } from 'react-redux';
import { FontAwesome5 } from '@expo/vector-icons';

function PortfolioScreen(props) {
  const [visible, setVisible] = useState(false);
  const [dataBDD, setdataBDD] = useState([]);

  useEffect(() => {
    const findPortofolio = async () => {
      const dataPortofolio = await fetch('http://192.168.1.13:3000/portofolio')
      const body = await dataPortofolio.json()
      setdataBDD(body.portofolios)
    }

    findPortofolio()
  },[])

  // console.log("dataBDD :", dataBDD)

  let passif = [];
  let actif = [];
  if(dataBDD && dataBDD.strategy === "passive") {

    passif = <Card containerStyle={{ marginTop: 15, marginBottom: 30 }}>
              <Text style={{fontSize: 15,fontWeight: "bold"}}>Composition du portefeuille : {"\n"}</Text>

              {dataBDD.actifs.map((data, i) => {
                  return  <Text key={i}>Actif {i+1}: {"\n"}
                                          Description: {data.description} {"\n"}
                                          Ticker : ({data.ticker}) {"\n"} 
                                          Répartition : {data.repartition} % {"\n"}
                                          type : {data.type} {"\n"}
                          </Text>
                  })}
                  <Text>Total répartition des actifs = 100% {"\n"}</Text>
                  <Text style={{fontSize: 15,fontWeight: "bold"}}>Rééquilibrage chaque trimestre pour conserver les même proportions.</Text>
            </Card>

  } else if (dataBDD.strategy === "active") {

    actif = <Card containerStyle={{ marginTop: 15, marginBottom: 30 }}>
              <Text style={{fontSize: 15,fontWeight: "bold"}}>Mois en cours : {"\n"}Du 01/05/21 au 30/05/21 {"\n"}</Text>
              <Text style={{fontSize: 15,fontWeight: "bold"}}>Composition du portefeuille : {"\n"}</Text>

              {dataBDD.selectBS.map((data, i) => {
                  return  <Text key={i}>Actif à {data.action} {"\n"}
                                          Description: {data.description} {"\n"}
                                          Ticker : ({data.ticker}) {"\n"} 
                                          Répartition : {data.repartition} % {"\n"}
                                          type : {data.type} {"\n"}
                          </Text>
                  })}

                  <Text>Total répartition des actifs = 100% {"\n"}</Text>
                  <Text style={{fontSize: 15,fontWeight: "bold"}}>Rééquilibrage du portefeuille tous les débuts de mois</Text>
            </Card>
  }

  var saveToWishlist = async () => {

    const reqWishlist = await fetch('http://192.168.1.30:3000/wishlist', {
      method: 'POST',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      body: `_idFront=${dataBDD._id}&token=${props.token}`
    })

  }

  // console.log(props.token)

  return (
    <View style={styles.container}>
    <Header
      containerStyle={{ backgroundColor: '#2c2c2c' }}
      leftComponent={ <Button title='Mes Favoris' buttonStyle={{ width:130,color: '#fff',backgroundColor: '#2c2c2c'}} onPress={()=>props.navigation.navigate('WishListScreen')} />}
      rightComponent={<Button title='Déconnexion' buttonStyle={{ width:130,color: '#fff',backgroundColor: '#2c2c2c'}} onPress={()=>props.navigation.navigate('HomePageScreen')} />}
    />
    <Text h4 style={{ textAlign: 'center', fontWeight: 'bold', marginTop: 15, marginBottom: 15  }}>
      Portfefeuille {"\n"}{dataBDD.name}
    </Text>
      <ScrollView>

        <Badge status="error" value="Graphique"/>
        <Card containerStyle={{ marginTop: 15, marginBottom: 30 }}>
          <Text>Graphique...</Text>
        </Card>

        <Badge status="error" value="Performances"/>
        <Card containerStyle={{ marginTop: 15, marginBottom: 30 }}>
          <Text>1 an :  <Badge status="success" value={dataBDD.perf1}/></Text>
          <Text>2 ans :  <Badge status="success" value={dataBDD.perf2}/></Text>
          <Text>5 ans :  <Badge status="success" value={dataBDD.perf5}/></Text>
          <Text>Max :  <Badge status="success" value={dataBDD.perfmax}/></Text>
          <Text>Type de stratégie:  <Badge status="success" value={dataBDD.strategy}/></Text>
          <Text>Type de profil:  <Badge status="success" value={dataBDD.risk}/></Text>
          <Text>Perte maximum:  <Badge status="success" value={dataBDD.maxloss}/></Text>
          <Text>Volatilité:  <Badge status="success" value={dataBDD.volatility}/></Text>
        </Card>

        <Badge status="error" value="Description"/>
        <Card containerStyle={{ marginTop: 15, marginBottom: 30 }}>
          <Text>{dataBDD.description1}</Text>
          <Text>{dataBDD.description2}</Text>
          <Text>{dataBDD.description3}</Text>
          <Text>{dataBDD.description4}</Text>
          <Text>{dataBDD.description5}</Text>
          <Text>{dataBDD.description6}</Text>
          <Text>{dataBDD.description7}</Text>
          <Text>{dataBDD.description8}</Text>
        </Card>

        <Badge status="error" value="Allocation d'actif"/>
        {passif}
        {actif}

        <Button containerStyle={{ marginTop: 20, alignItems: 'center' }}
          buttonStyle={{ backgroundColor: "#3F9ADB" }}
          icon={{ 
            name: "check-circle",
            size: 30,
            color: "white"
          }}
          title=" Enregistrer cette stratégie"
          type="solid"
          onPress={() => {saveToWishlist(), setVisible(true)}}
        />

        <Button containerStyle={{ width: '100%', marginTop: 15, marginBottom: 50 }}
          title="retour"
          type="clear"
          onPress={() => props.navigation.navigate('StrategyListScreen')}
        />

        <Overlay isVisible={visible} width="auto" height="auto" overlayStyle={{width: '80%', alignItems: 'center'}}>
            
            <FontAwesome5 style={{ marginTop: 30, marginBottom: 20}}
                  name="medal" 
                  size={100} 
                  color="red" 
                  />

            <Text h4 style={{ textAlign: 'center', marginTop: 15  }}>Félicitation John</Text>
            <Text style={{ textAlign: 'center', marginTop: 15  }}>Votre stratégie est enregistrée !</Text>

            <Button style={{ width: 50, marginTop: 30, marginBottom: 20}}
            title="ok"
            type="solid"
            onPress={() => {props.onSave(dataBDD._id), props.navigation.navigate('WishListScreen'), setVisible(false)}}
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

function mapStateToProps(state){
  return {token: state.token}
}

function mapDispatchToProps(dispatch) {
  return {
    onSave: function (data_id) {
      dispatch({ type: 'saveWishlist', data_id : data_id })
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PortfolioScreen);