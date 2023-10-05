import {View, Text, StyleSheet, Pressable} from "react-native";
import React from "react";
import {StatusBar} from "expo-status-bar";
export default function Home({navigation}) {
    return (
        <View style={styles.container}>
            <StatusBar style="auto" backgroundColor="#88c9bf"/>
            <Text>Tela Home do App</Text>
            <Pressable style={[styles.standardButton, styles.submitButton]} onPress={() => navigation.navigate('Login')}>
                <Text style={styles.standardButtonText}>LOGIN</Text>
            </Pressable>
            <Pressable style={[styles.standardButton, styles.submitButton]}onPress={() => navigation.navigate('CadastroAnimais')}>
                <Text style={styles.standardButtonText}>CADASTRO DE ANIMAIS</Text>
            </Pressable>
            <Pressable style={[styles.standardButton, styles.submitButton]} onPress={() => navigation.navigate('CreateUser')}>
                <Text style={styles.standardButtonText}>REGISTRAR USUÁRIO</Text>
            </Pressable>
            <Pressable style={[styles.standardButton, styles.submitButton]} onPress={() => navigation.navigate('ShowUser')}>
                <Text style={styles.standardButtonText}>PERFIL DE USUÁRIO</Text>
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