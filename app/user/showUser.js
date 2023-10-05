import {Image, ScrollView, StyleSheet, Text, View} from "react-native";
import Menu from '../../components/menus/menuTopo'
import {StatusBar} from "expo-status-bar";
import splash from '../../assets/icon.png';
import Button from "../../components/buttons/buttonsPadroes";

export default function ShowUser() {
    return (
        <ScrollView>
            <StatusBar style="auto" backgroundColor="#88c9bf"/>
            <View style={styles.container}>
                <Image source={splash} style={styles.img}></Image>
                <Text style={{fontWeight: 'bold'}}>Marilia Martins</Text>
                <View style={styles.contentView}>
                    <Text style={styles.text}>NOME COMPLETO</Text>
                    <Text style={styles.subText}>Marilia Martins de Souza</Text>
                </View>
                <View style={styles.contentView}>
                    <Text style={styles.text}>IDADE</Text>
                    <Text style={styles.subText}>27 anos</Text>
                </View>
                <View style={styles.contentView}>
                    <Text style={styles.text}>EMAIL</Text>
                    <Text style={styles.subText}>marilia_martins@gmail.com</Text>
                </View>
                <View style={styles.contentView}>
                    <Text style={styles.text}>LOCALIZAÇÃO</Text>
                    <Text style={styles.subText}>Sobradinho - Distrito Federal</Text>
                </View>
                <View style={styles.contentView}>
                    <Text style={styles.text}>ENDEREÇO</Text>
                    <Text style={styles.subText}>RUA 203, conjunto B, casa 37</Text>
                </View>
                <View style={styles.contentView}>
                    <Text style={styles.text}>TELEFONE</Text>
                    <Text style={styles.subText}>(61) 9 9106-9393</Text>
                </View>
                <View style={styles.contentView}>
                    <Text style={styles.text}>NOME DE USUÁRIO</Text>
                    <Text style={styles.subText}>mari_martins</Text>
                </View>
                <View style={styles.contentView}>
                    <Text style={styles.text}>HISTÓRICO</Text>
                    <Text style={styles.subText}>Adotou 1 gato</Text>
                </View>
                <View style={styles.buttonEntrar}>
                    <Button color="green" texto="EDITAR PERFIL"/>
                </View>
            </View>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    container: {
        display: "flex",
        alignItems: "center"
    },
    contentView: {
        alignItems:"center",
        marginTop: 25
    },
    img: {
        width: 112,
        height: 112,
        borderRadius: 100,
    },
    text:{
        color: '#589B9B'
    },
    subText:{
        color: '#757575'
    },
    buttonEntrar: {
        alignItems: 'center',
        marginTop: 52
    },
    espacamentoInput: {
        marginTop: 20
    },
    espacamentoMenu: {
        marginBottom: 12
    }
});