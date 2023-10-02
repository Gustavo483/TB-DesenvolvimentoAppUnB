import {StatusBar} from 'expo-status-bar';
import {StyleSheet, View,Text} from 'react-native';
import Menu from '../../components/menus/menuTopo'
import Input from "../../components/inputs/inputPadrao";
import Input2 from "../../components/inputs/teste";
export default function Index() {
    return (
        <View>
            <StatusBar style="auto" backgroundColor="#88c9bf"/>
            <Menu nome="Cadastro de Animais"/>
            <View style={styles.container}>
                <Text style={{marginTop:10, marginBottom:10}}>Tenho interesse em cadastrar animal para:</Text>
                <Text style={{fontWeight:"bold", fontSize:20}}>Ajudar</Text>
                <Text style={styles.label}>NOME DO ANIMAL</Text>
                <Input placeholder='Nome do animal'/>
                <Text style={styles.label}>FOTOS DO ANIMAL</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        paddingStart: 20,
        paddingEnd: 20
    },
    label:{
        color: '#88c9bf',
        marginTop: 15,
    }

});
