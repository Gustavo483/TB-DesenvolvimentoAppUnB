import {StatusBar} from 'expo-status-bar';
import {Pressable, StyleSheet, View} from 'react-native';
import Input from "../../components/inputs/inputPadrao";
import Button from "../../components/buttons/buttonsPadroes";
import React, {useState} from "react";
import {signInWithEmailAndPassword} from "@firebase/auth";
import {FIREBASE_AUTH} from "../../firebaseConfig";

export default function Login({ navigation,setUser }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signIn = async () => {
        signInWithEmailAndPassword(FIREBASE_AUTH, email, password)
            .then(async (userCredential) => {
                if (FIREBASE_AUTH.currentUser){
                    navigation.navigate('Home');
                }
            })
            .catch((error) => {
                alert('E-mail ou senha errados.')
            });
    }

    return (
        <View>
            <StatusBar style="auto" backgroundColor="#88c9bf"/>
            <View style={styles.container}>
                <View>
                    <Input onTextChange={setEmail} placeholder='Nome de usuário'/>
                </View>
                <View style={styles.espacamentoInput}>
                    <Input onTextChange={setPassword} placeholder='Senha'/>
                </View>
            </View>
            <View style={styles.buttonEntrar}>
                <Pressable onPress={() => signIn()}>
                    <Button color="green" texto="ENTRAR"/>
                </Pressable>
            </View>
            <View style={styles.buttonFacebook}>
                <Button color="blue" texto="ENTRAR COM FACEBOOK" svg="facebook"/>
            </View>
            <View style={styles.buttonGoogle}>
                <Button color="orange" texto="ENTRAR COM GOOGLE" svg="google-"/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        marginStart: 20,
        marginEnd: 20
    },
    buttonEntrar: {
        alignItems: 'center',
        marginTop: 52
    },
    buttonFacebook: {
        alignItems: 'center',
        marginTop: 72
    },
    buttonGoogle: {
        alignItems: 'center',
        marginTop: 8
    },
    espacamentoInput: {
        marginTop: 20
    },
    espacamentoMenu: {
        marginBottom: 64
    }
});
