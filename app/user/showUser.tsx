import {Image, ImageSourcePropType, ScrollView, StyleSheet, Text, View} from "react-native";
import {StatusBar} from "expo-status-bar";
import Button from "../../components/buttons/buttonsPadroes";
import {st, fs} from "../../config/firebaseConfig";
import {getDownloadURL, ref} from "@firebase/storage";
import {useContext, useState} from "react";
import {collection, getDoc} from "firebase/firestore";
import UserContext from "../../context/UserContext";

export default function ShowUser({ navigation }) {
    const { userContext } = useContext(UserContext);

    const [userAvatar, setUserAvatar] = useState(null);
    const [name, setName] = useState('');

    const downloadImage = async (imageName: string) => {
        const storageRef = getDownloadURL(ref(st, imageName))
            .then((url) => {
                setUserAvatar(url);
            }).catch((error) => {
                console.log(error);
            });
    }

    // const querySnapshot = getDoc(userContext.docRef)
    //     .then((docSnap) => {
    //         setName(docSnap.get("name"));
    //     })

    downloadImage('img/default/icon.png').then(r => {});
    return (
        <ScrollView>
            <StatusBar style="auto" backgroundColor="#88c9bf"/>
            <View style={styles.container}>
                <Image source={{uri: userAvatar}} style={styles.img}></Image>
                <Text style={{fontWeight: 'bold'}}>Nome teste</Text>
                <View style={styles.contentView}>
                    <Text style={styles.text}>NOME COMPLETO</Text>
                    <Text style={styles.subText}>Nome teste</Text>
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