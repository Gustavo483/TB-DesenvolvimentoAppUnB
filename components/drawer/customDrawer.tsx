import React from "react";
import {DrawerContentScrollView, DrawerItemList} from "@react-navigation/drawer";
import {Image, ImageBackground, Pressable, Text, View} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {signOut, useAuth, User} from "../../app/hooks/useAuth";

const CustomDrawer = (props) => {
    const navigation = useNavigation();
    const {user} = useAuth()
    const {userData} = User()

    let name: string = "";
    let logout = null;

    if (user) {
        logout =
            <View style={{padding: 20, backgroundColor: '#88c9bf', alignItems: 'center'}}>
                <Pressable onPress={signOut(navigation)}>
                    <Text>SAIR</Text>
                </Pressable>
            </View>;

        name = userData?.nome || '';
    }

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
                    <DrawerItemList {...props} />
                </View>
            </DrawerContentScrollView>
            {logout}
        </View>
    )
}

export default CustomDrawer;
