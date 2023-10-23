import React from "react";
import {DrawerContentScrollView, DrawerItemList} from "@react-navigation/drawer";
import {Image, ImageBackground, Text, TouchableOpacity, View} from "react-native";
import {auth} from "../../config/firebaseConfig";

const name: string = auth.currentUser.email //TROCAR PARA NOME

const signOut = async () => {
    await auth.signOut()
        .then(() => {
            //Ajustar o caso de sucesso de Logout
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);
        });

}

const CustomDrawer = (props) => {
    return (
        <View style={{flex: 1}}>
            <DrawerContentScrollView {...props} contentContainerStyle={{backgroundColor: '#88c9bf'}}>
                <ImageBackground source={require('../../assets/images/menu-bg.jpg')} style={{padding: 20}}>
                    <Image source={require('../../assets/icon.png')}
                           style={{
                               height: 64,
                               width: 64,
                               borderRadius: 40,
                               marginBottom: 68,
                               marginTop: 40,
                               marginLeft: 16
                           }}/>
                    <Text style={{color: '#434343', fontSize: 14}}>{name}</Text>
                </ImageBackground>
                <View style={{flex: 1, backgroundColor: '#f7f7f7', paddingTop: 16}}>
                    <DrawerItemList {...props}/>
                </View>
            </DrawerContentScrollView>
            <View style={{padding: 20, backgroundColor: '#88c9bf', alignItems: 'center'}}>
                <TouchableOpacity onPress={() => signOut()}>
                    <Text>SAIR</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default CustomDrawer