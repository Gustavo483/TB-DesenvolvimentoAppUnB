import {useState} from "react";
import {StatusBar} from 'expo-status-bar';
import {signInWithEmailAndPassword} from "firebase/auth";
import {Pressable, View} from 'react-native';
import {auth} from "../../config/firebaseConfig";
import {global} from "../../styles/global";
import Input from "../../components/inputs/inputPadrao";
import Button from "../../components/buttons/buttonsPadroes";

export default function Login({ navigation,setUser }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const signIn = async () => {
        signInWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                if (auth.currentUser){
                    navigation.navigate('Pets');
                }
            })
            .catch((error) => {
                alert('E-mail ou senha errados.')
            });
    }

    return (
        <View>
            <StatusBar style="auto" backgroundColor="#88c9bf"/>
            <View style={global.container}>
                <View>
                    <Input onTextChange={setEmail} placeholder='Nome de usuário'/>
                </View>
                <View style={global.espacamentoInput}>
                    <Input onTextChange={setPassword} placeholder='Senha'/>
                </View>
            </View>
            <View style={global.buttonEntrar}>
                <Pressable onPress={() => signIn()}>
                    <Button color="green" texto="ENTRAR"/>
                </Pressable>
            </View>
            <View style={global.buttonEntrar}>
                <Pressable onPress={() => navigation.navigate('Signup')}>
                    <Button color="green" texto="CADASTRAR-SE"/>
                </Pressable>
            </View>
            <View style={global.buttonFacebook}>
                <Button color="blue" texto="ENTRAR COM FACEBOOK" svg="facebook"/>
            </View>
            <View style={global.buttonGoogle}>
                <Button color="orange" texto="ENTRAR COM GOOGLE" svg="google-"/>
            </View>
        </View>
    );
}
