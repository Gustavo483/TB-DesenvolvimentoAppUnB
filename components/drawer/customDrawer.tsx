import React, {useEffect, useState} from "react";
import {DrawerContentScrollView, DrawerItemList} from "@react-navigation/drawer";
import {Image, ImageBackground, Pressable, Text, View} from "react-native";
import {auth} from "../../config/firebaseConfig";
import {useNavigation} from "@react-navigation/native";

const CustomDrawer = (props) => {
    const [user, setUser] = useState(null);
    const navigation = useNavigation();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user);
        });

        return () => {
            unsubscribe();
        };
    }, []);

    const name: string = user ? user.email : 'Usuário Desconhecido';

    const signOut = async () => {
        await auth.signOut()
            .then(() => {
                navigation.navigate('Login' as never);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode);
                console.log(errorMessage);
            });
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
            <View style={{padding: 20, backgroundColor: '#88c9bf', alignItems: 'center'}}>
                <Pressable onPress={() => signOut()}>
                    <Text>SAIR</Text>
                </Pressable>
            </View>
        </View>
    )
}

export default CustomDrawer;
