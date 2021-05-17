import React from 'react'
import { Header, Button } from 'react-native-elements';

export default function NavBarScreen() {
    return (
        <Header
        containerStyle={{ backgroundColor: '#2c2c2c', height: 110 }}
        leftComponent={ <Button title='Mes Favoris' buttonStyle={{ width:130,color: '#fff',backgroundColor: '#2c2c2c'}} onPress={()=>props.navigation.navigate('WishListScreen')} />}
        rightComponent={<Button title='Déconnexion' buttonStyle={{ width:130,color: '#fff',backgroundColor: '#2c2c2c'}} onPress={()=>props.navigation.navigate('HomePageScreen')} />}
      />
    )
}