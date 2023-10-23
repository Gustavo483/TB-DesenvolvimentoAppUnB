import {Image, ScrollView, StyleSheet, Text, View} from "react-native";
import {StatusBar} from "expo-status-bar";
import Button from "../../components/buttons/buttonsPadroes";
import {auth, fs} from "../../config/firebaseConfig";
import {collection, getDocs, query, where} from "firebase/firestore";
import {useState} from "react";

export default function Profile({navigation}) {

    const splash = require('../../assets/icon.png');
    const [userData, setUserData] = useState(null);

    getDocs(query(collection(fs, "users"), where('uid', '==', auth.currentUser.uid)))
        .then((snapshot) => {
            if (snapshot.empty) {
                console.log('No matching documents.');
                return;
            }

            snapshot.forEach((doc) => {
                setUserData(doc.data());
            });

        }).catch((error) => {
            console.log("Error getting documents: ", error);
        });
    return (
        <ScrollView>
            <StatusBar style="auto" backgroundColor="#88c9bf"/>
            <View style={styles.container}>
                <Image source={splash} style={styles.img}></Image>
                <Text style={{fontWeight: 'bold'}}>{userData ? userData.nome : ''}</Text>
                <View style={styles.contentView}>
                    <Text style={styles.text}>NOME COMPLETO</Text>
                    <Text style={styles.subText}>{userData ? userData.nome : ''}</Text>
                </View>
                <View style={styles.contentView}>
                    <Text style={styles.text}>IDADE</Text>
                    <Text style={styles.subText}>{userData ? userData.idade : ''} anos</Text>
                </View>
                <View style={styles.contentView}>
                    <Text style={styles.text}>EMAIL</Text>
                    <Text style={styles.subText}>{userData ? userData.email : ''}</Text>
                </View>
                <View style={styles.contentView}>
                    <Text style={styles.text}>LOCALIZAÇÃO</Text>
                    <Text style={styles.subText}>{userData ? userData.cidade : ''} - {userData ? userData.uf : ''}</Text>
                </View>
                <View style={styles.contentView}>
                    <Text style={styles.text}>ENDEREÇO</Text>
                    <Text style={styles.subText}>{userData ? userData.endereco : ''}</Text>
                </View>
                <View style={styles.contentView}>
                    <Text style={styles.text}>TELEFONE</Text>
                    <Text style={styles.subText}>{userData ? userData.telefone : ''}</Text>
                </View>
                <View style={styles.contentView}>
                    <Text style={styles.text}>NOME DE USUÁRIO</Text>
                    <Text style={styles.subText}>{userData ? userData.email : ''}</Text>
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