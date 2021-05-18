import React from 'react'
import { Header, Button } from 'react-native-elements';

export default function NavBarScreen(props) {
    return (
        <Header
        containerStyle={{ backgroundColor: '#2c2c2c' }}
        leftComponent={ <Button title='Mes Favoris' buttonStyle={{ width:130,color: '#fff',backgroundColor: '#2c2c2c'}} onPress={()=>props.navigation.navigate('WishListScreen')} />}
        rightComponent={<Button title='Déconnexion' buttonStyle={{ width:130,color: '#fff',backgroundColor: '#2c2c2c'}} onPress={()=>props.navigation.navigate('HomePageScreen')} />}
      />
    )
}