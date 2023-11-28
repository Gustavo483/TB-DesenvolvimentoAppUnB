import {View, Text, StyleSheet, Pressable} from "react-native";
import React from "react";
import {StatusBar} from "expo-status-bar";
import {auth} from "../../config/firebaseConfig";
import Constants from "expo-constants";
import * as Notifications from 'expo-notifications';

export default function Home({navigation}) {
    const signOut = async () => {
            await auth.signOut()
                .then(navigation.navigate('Login'))
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(errorCode);
                    console.log(errorMessage);
                });

    }


// Can use this function below or use Expo's Push Notification Tool from: https://expo.dev/notifications
    async function sendPushNotification(target: string) {
        let token = await Notifications.getExpoPushTokenAsync({
            projectId: Constants.expoConfig.extra.eas.projectId,
        })
        console.log(token);
        if(target == "gustavo")
            token.data = "ExponentPushToken[d-tdNWEw4OI2xVy8o3m_Zq]";
        const message = {
            to: token.data,
            sound: 'default',
            title: 'Original Title',
            body: 'And here is the body!',
            data: { someData: 'goes here' },
        };

        await fetch('https://exp.host/--/api/v2/push/send', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Accept-encoding': 'gzip, deflate',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(message),
        });
    }

    return (
        <View style={styles.container}>
            <StatusBar style="auto" backgroundColor="#88c9bf"/>
            <Text>Tela Home do App</Text>
            {!auth ? (<Pressable style={[styles.standardButton, styles.submitButton]} onPress={() => navigation.navigate('Login')}>
                <Text style={styles.standardButtonText}>LOGIN</Text>
            </Pressable>) : (<Text style={styles.standardButtonText}></Text>)}

            <Pressable style={[styles.standardButton, styles.submitButton]} onPress={() => navigation.navigate('Create')}>
                <Text style={styles.standardButtonText}>CADASTRO DE ANIMAIS</Text>
            </Pressable>
            <Pressable style={[styles.standardButton, styles.submitButton]} onPress={() => navigation.navigate('Signup')}>
                <Text style={styles.standardButtonText}>REGISTRAR USUÁRIO</Text>
            </Pressable>
            <Pressable style={[styles.standardButton, styles.submitButton]} onPress={() => navigation.navigate('Profile')}>
                <Text style={styles.standardButtonText}>PERFIL DE USUÁRIO</Text>
            </Pressable>

            {auth ? ( <Pressable  style={[styles.standardButton, styles.submitButton]}  onPress={() => signOut()}>
                <Text style={styles.standardButtonText}> SIGN OUT</Text>
            </Pressable>) : (<Text style={styles.standardButtonText}></Text>)}

            <Pressable style={[styles.standardButton, styles.submitButton]} onPress={() => navigation.navigate('Notifies')}>
                <Text style={styles.standardButtonText}>NOTIFICAÇÕES RECEBIDAS</Text>
            </Pressable>

            <Pressable style={[styles.standardButton, styles.submitButton]} onPress={async () => {await sendPushNotification("self");}}>
                <Text style={styles.standardButtonText}>TESTE NOTIFICAÇÃO (SELF)</Text>
            </Pressable>

            <Pressable style={[styles.standardButton, styles.submitButton]} onPress={async () => {await sendPushNotification("gustavo");}}>
                <Text style={styles.standardButtonText}>TESTE NOTIFICAÇÃO (GUSTAVO)</Text>
            </Pressable>

        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        alignItems: 'center',
        marginTop: 10,
        justifyContent: 'center',
    },
    containerCenter: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    standardButton: {
        boxShadow: '0px 1px 4px #000000bf',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 2,
        elevation: 3,
        backgroundColor: '#ffd358',
        width: 100,
        height: 40
    },
    submitButton: {
        width: 232,
        height: 40,
        margin: 24,
        marginBottom: 10
    },
    standardButtonText: {
        letterSpacing: 0,
        fontSize: 12,
        fontWeight: '400',
        color: '#434343',
        // fontFamily: 'Roboto_400Regular'
    },
    link: {
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        width: 232,
        height: 40,
        borderRadius: 5,
        elevation: 5,
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.3,
        shadowRadius: 3,
        marginTop:15,
        backgroundColor: '#88c9bf',
    },
});