import {Image, Pressable, ScrollView, StyleSheet} from "react-native";
import {StatusBar} from "expo-status-bar";
import { Text, View } from 'react-native';
import {User} from "../hooks/useAuth";
import React, {useEffect, useState} from "react";
import {getDownloadURL, getStorage, ref} from "@firebase/storage";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import {auth, fs} from "../../config/firebaseConfig";
import {addDoc, collection, doc, getDoc} from "firebase/firestore";


export default function Details({route}) {
    const {userData} = User()
    const [userDono, setUserDono] = useState(null);
    const { item } = route.params;
    const [imageUrls, setImageUrls] = useState({});
    useEffect(() => {
        const fetchImageUrls = async () => {
            const storage = getStorage();

            const imageUrls = {};
            try {
                const imageRef = ref(storage, 'pets/' + item.id + '.jpeg');
                const url = await getDownloadURL(imageRef);
                imageUrls[item.id] = url;
            } catch (error) {
                console.log(error);
            }
            setImageUrls(imageUrls);
        };
        fetchImageUrls();
    }, [item]);

    const temperamentos = Object.keys(item.temperamento).filter((chave) => item.temperamento[chave]).map((chave) => {
        return (
            <Text key={chave} >
                {item.temperamento[chave] ? `${chave}` : ''}
            </Text>
        );
    });

    const exigencias = Object.keys(item.exigencias).map((chave) => {
        return (
            <Text key={chave} >
                {item.exigencias[chave] ? `${chave}` : ''}
            </Text>
        );
    });

    async function registrarInteresseAdocao() {

        // Recuperando as informações do dono do animal
        if (item.idDono) {
            console.log(item.idDono)
            const docRef = doc(fs, "users", item.idDono);

            const docSnap = await getDoc(docRef);

            console.log(docSnap.data())
            if (docSnap.exists()) {
                setUserDono(docSnap.data());
            } else {
                console.log("Usuario não encontrado!");
            }
        }

        // enviando notificação
        if (userDono.pushToken){
            let token = await Notifications.getExpoPushTokenAsync({
                projectId: Constants.expoConfig.extra.eas.projectId,
            })

            token.data = userDono.pushToken.data;
            let teste = userData.nome ? userData.nome :'Alguem'
            const message = {
                to: token.data,
                sound: 'default',
                title: 'Adoção',
                body: teste+' tem interesse em adotar o '+item.nome,
                data: { someData: 'goes here' },
            };

            await fetch('https://exp.host/--/api/v2/push/send', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Accept-encoding': 'gzip, deflate',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(message),
            });

            //registrando no firebase a notificação
            const docRef = await addDoc(collection(fs, "notification"), {
                IDPets: item.id,
                IDUserDesejaAdotar: auth.currentUser.uid,
                IDUserDono: item.idDono,
                message : message,
            });

            console.log('Envio de noticação realizado com sucesso.')

        }else{
            console.log('Dono do animal não tem pushToken')
        }
    }

    return (
        <ScrollView>
            <StatusBar style="auto" backgroundColor="#88c9bf"/>
            <View style={styles.container}>

                <Image source={{ uri: imageUrls[item.id] }} style={styles.image} />

                <Text style={{fontWeight: 'bold'}}>{item ? item.nome : ''}</Text>

                <View style={styles.contentView1}>
                    <View style={styles.contentView}>
                        <Text style={styles.text}>SEXO</Text>
                        <Text style={styles.subText}>{item ? item.sexo : ''}</Text>
                    </View>

                    <View style={styles.contentView}>
                        <Text style={styles.text}>PORTE</Text>
                        <Text style={styles.subText}>{item ? item.porte : ''} anos</Text>
                    </View>

                    <View style={styles.contentView}>
                        <Text style={styles.text}>IDADE</Text>
                        <Text style={styles.subText}>{item ? item.idade : ''}</Text>
                    </View>
                </View>

                <View style={styles.contentView1}>
                    <View style={styles.contentView}>
                        <Text style={styles.text}>LOCALIZAÇÃO</Text>
                        <Text style={styles.subText}>{userData ? userData.cidade : ''} - {userData ? userData.uf : ''}</Text>
                    </View>
                </View>

                <View style={styles.contentView1}>
                    <View style={styles.contentView}>
                        <Text style={styles.text}>CASTRADO</Text>
                        <Text style={styles.subText}>{item.saude.Castrado ? 'Sim' : 'Não'}</Text>
                    </View>

                    <View style={styles.contentView}>
                        <Text style={styles.text}>VERMIFUGADO</Text>
                        <Text style={styles.subText}>{item.saude.Vermifugado ? 'Sim' : 'Não'}</Text>
                    </View>
                </View>

                <View style={styles.contentView1}>
                    <View style={styles.contentView}>
                        <Text style={styles.text}>VACINADO</Text>
                        <Text style={styles.subText}>{item.saude.Vacinado ? 'Sim' : 'Não'}</Text>
                    </View>

                    <View style={styles.contentView}>
                        <Text style={styles.text}>DOENÇAS</Text>
                        <Text style={styles.subText}>{item.saude.Doente ? 'Sim' : 'Não'}</Text>
                    </View>
                </View>

                <View style={styles.contentView}>
                    <Text style={styles.text}>TEMPERAMENTO</Text>
                    <View>
                        {temperamentos}
                    </View>
                </View>

                <View style={styles.contentView}>
                    <Text style={styles.text}>EXIGÊNCIAS DO DOADOR</Text>
                    <View>
                        {exigencias}
                    </View>
                </View>

                <View style={styles.contentView}>
                    <Text style={styles.text}>MAIS SOBRE {item ? item.nome : ''}</Text>
                    <Text style={styles.subText}>{item ? item.descricao : ''}</Text>
                </View>

                <Pressable style={[styles.standardButton, styles.submitButton]} onPress={async () => {await registrarInteresseAdocao();}}>
                    <Text style={styles.standardButtonText}>Interesse em adotar</Text>
                </Pressable>
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
        flex: 1,
        alignItems: "center",
        marginTop: 25
    },
    contentView1: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    img: {
        width: 112,
        height: 112,
        borderRadius: 100,
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
    image: {
        width: '95%',
        height: 200,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        marginTop: 10,
        marginBottom: 10
    },
    text: {
        color: '#589B9B'
    },
    subText: {
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
