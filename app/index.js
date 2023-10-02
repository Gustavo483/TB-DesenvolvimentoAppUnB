import {View, Text, StyleSheet} from "react-native";
import { Link } from 'expo-router';
export default function Page() {
    return (
        <View style={styles.container}>
            <Text>Tela Home do App</Text>
            <Link href="/autentication/login" style={styles.link}>
                <Text style={{color: 'white'}}>Login!</Text>
            </Link>
            <Link href="/cadastros/cadastroAnimais" style={styles.link}>
                <Text style={{color: 'white'}}>Cadastro de animais!</Text>
            </Link>
            <Link href="/user/showUser" style={styles.link}>
                <Text style={{color: 'white'}}>Tela de User</Text>
            </Link>
            <Link href="/user/createUser" style={styles.link}>
                <Text style={{color: 'white'}}>Registrar Usuário</Text>
            </Link>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        alignItems: 'center',
        marginTop: 10
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