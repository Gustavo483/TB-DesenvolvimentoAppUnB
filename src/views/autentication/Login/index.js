import {StatusBar} from 'expo-status-bar';
import {StyleSheet, View} from 'react-native';
import Menu from '../../../components/Menu'
import Input from "../../../components/Input";
import Button from "../../../components/Button";

export default function Index() {
    return (
        <View>
            <StatusBar style="auto" backgroundColor="#88c9bf"/>
            <View style={styles.espacamentoMenu}>
                <Menu/>
            </View>
            <View>
                <Input placeholder='Nome de usuário'/>
            </View>
            <View style={styles.espacamentoInput}>
                <Input placeholder='Senha'/>
            </View>
            <View style={styles.buttonEntrar}>
                <Button color="green" texto="ENTRAR"/>
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
