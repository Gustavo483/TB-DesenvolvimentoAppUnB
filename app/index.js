import {View, Text, StyleSheet, Pressable} from "react-native";
import { Link } from 'expo-router';
import React from "react";
export default function Page() {
    return (
        <View style={styles.container}>
            <Text>Tela Home do App</Text>
            <View style={[styles.standardButton, styles.submitButton]}>
                <Link href="/autentication/login">
                    <Text style={styles.standardButtonText}>LOGIN</Text>
                </Link>
            </View>
            <View style={[styles.standardButton, styles.submitButton]}>
                <Link href="/cadastros/cadastroAnimais">
                    <Text style={styles.standardButtonText}>CADASTRO DE ANIMAIS</Text>
                </Link>
            </View>
            <View style={[styles.standardButton, styles.submitButton]}>
                <Link href="/user/createUser">
                    <Text style={styles.standardButtonText}>REGISTRAR USUÁRIO</Text>
                </Link>
            </View>
            <View style={[styles.standardButton, styles.submitButton]}>
                <Link href="/user/showUser">
                    <Text style={styles.standardButtonText}>PERFIL DE USUÁRIO</Text>
                </Link>
            </View>
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