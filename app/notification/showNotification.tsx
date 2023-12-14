import {Image, StyleSheet, Text, View, FlatList, Pressable} from "react-native";
import React, { useEffect, useState } from 'react';
import {collection, query, getDocs, where, getDoc} from "firebase/firestore";
import {fs,auth} from "../../config/firebaseConfig";
import {getStorage,getDownloadURL, ref } from "@firebase/storage";
import { doc, updateDoc,deleteDoc } from 'firebase/firestore';
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";

export default function ShowNotification({navigation}) {
    const [data, setData] = useState([]);
    const [imageUrls, setImageUrls] = useState({});

    useEffect(() => {
        const fetchData = async () => {

            const notificationCollection = collection(fs, 'notification');
            const q = query(notificationCollection, where('IDUserDono', '==', auth.currentUser.uid));
            const querySnapshot = await getDocs(q);

            const documents = [];
            querySnapshot.forEach((doc) => {
                documents.push({ id: doc.id, ...doc.data() });
            });

            setData(documents);
        };

        fetchData();
    }, []);

    async function iniciarChat(infoNotification) {
        console.log('Fazer logica para iniciar chat: ',infoNotification)
    }
    async function recusarPedidoAdocao(infoNotification){
        try {
            const docRef = doc(fs, 'notification', infoNotification.id);
            await deleteDoc(docRef);

            const usuario = doc(fs, "users", infoNotification.IDUserDesejaAdotar);

            const userDesejaAdotar = await getDoc(usuario);

            if (userDesejaAdotar.data().pushToken){
                let token = await Notifications.getExpoPushTokenAsync({
                    projectId: Constants.expoConfig.extra.eas.projectId,
                })
                console.log(userDesejaAdotar.data())

                token.data = userDesejaAdotar.data().pushToken.data;
                let nome = userDesejaAdotar.data().nome ? userDesejaAdotar.data().nome :'Alguem'
                const message = {
                    to: token.data,
                    sound: 'default',
                    title: 'Adoção',
                    body: nome+' recusou seu pedido de adoção.',
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
            }
            console.log('Rotina realizada com sucesso.')
        } catch (error) {
            console.error('Erro ao tentar atualizar o documento:', error);
        }
    }

    async function aceitarPedidoAdocao(infoNotification){
        const idPet = infoNotification.IDPets;
        const docRefNotification = doc(fs, 'notification', infoNotification.id);
        const docRefPet = doc(fs, 'pets', infoNotification.IDPets);

        try {

            const novoDono = doc(fs, "users", infoNotification.IDUserDesejaAdotar);

            const userdono = await getDoc(novoDono);

            if (userdono.data().pushToken){
                let token = await Notifications.getExpoPushTokenAsync({
                    projectId: Constants.expoConfig.extra.eas.projectId,
                })

                token.data = userdono.data().pushToken.data;
                let nome = userdono.data().nome ? userdono.data().nome :'Alguem'
                const message = {
                    to: token.data,
                    sound: 'default',
                    title: 'Adoção',
                    body: nome+' aceitou seu pedido de notificação.',
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
            }

            // Atualizando o id do novo dono
            await deleteDoc(docRefNotification);
            await updateDoc(docRefPet, {'idDono' : infoNotification.IDUserDesejaAdotar});

            const queryNotification = query(collection(fs, 'notification'), where('IDPets', '==', idPet));

            const dadosNotification = await getDocs(queryNotification);

            const IdUsuarios = [];
            const refsNotification = [];
            dadosNotification.forEach((doc) => {
                const dado = doc.data();
                IdUsuarios.push(dado.IDUserDesejaAdotar);
                refsNotification.push( doc.ref)
            });

            const documentosUsuarios = [];

            console.log(IdUsuarios.length)
            if (IdUsuarios.length > 0){
                const queryUsuarios = query(collection(fs, 'users'), where('__name__', 'in', IdUsuarios));

                const usuarios = await getDocs(queryUsuarios);

                usuarios.forEach((doc) => {
                    documentosUsuarios.push({ id: doc.id, ...doc.data() });
                });
            }

            // Envia a notificação para os usuarios que tinham interesse em adotar o animal
            for (const dado of documentosUsuarios) {
                if (dado.pushToken){
                    let token = await Notifications.getExpoPushTokenAsync({
                        projectId: Constants.expoConfig.extra.eas.projectId,
                    })

                    token.data = dado.pushToken.data;
                    let nome = dado.nome ? dado.nome :'Alguem'
                    const message = {
                        to: token.data,
                        sound: 'default',
                        title: 'Adoção',
                        body: nome+' doou um animal que você tinha interesse para outra pessoa.',
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
                }
            }

            // Deletando as notificações de interesse de adoção do animal
            for (const  notificacao of refsNotification){
                await deleteDoc(notificacao);
            }

            console.log('Pet doado com sucesso.')

        } catch (error) {
            console.error('Ocorreu um erro na sua solicitação : ', error);
        }

    }

    useEffect(() => {
        const fetchImageUrls = async () => {
            const storage = getStorage();

            const imageUrls = {};

            for (const item of data) {
                try {
                    const imageRef = ref(storage, 'avatars/'+ item.IDUserDesejaAdotar + '.jpeg');
                    const url = await getDownloadURL(imageRef);
                    imageUrls[item.id] = url;
                } catch (error) {
                    console.log(error);
                }
            }
            setImageUrls(imageUrls);
        };

        fetchImageUrls();
    }, [data]);

    const renderItem = ({ item }) => (
        <View style={styles.animalContainer} >
            <View style={styles.flexRow}>
                <Image source={{ uri: imageUrls[item.id] }} style={styles.animalImage} />
                <View style={styles.animalDetails}>
                    <Text style={styles.animalName}>{item.message.body}</Text>
                </View>
            </View>

            <View style={styles.acitions}>
                <Pressable style={[styles.standardButton, styles.submitButton, styles.backgroudYellou]} onPress={async () => {await iniciarChat(item)}}>
                    <Text style={styles.standardButtonText}>Chat</Text>
                </Pressable>
                <Pressable style={[styles.standardButton, styles.submitButton, styles.backgroudRed]} onPress={async () => {await recusarPedidoAdocao(item)}}>
                    <Text style={styles.standardButtonText}>Recusar</Text>
                </Pressable>
                <Pressable style={[styles.standardButton, styles.submitButton, styles.backgroudGreen]} onPress={async () => {await aceitarPedidoAdocao(item)}}>
                    <Text style={styles.standardButtonText}>Aceitar</Text>
                </Pressable>
            </View>
        </View>
    );

    return (
        <FlatList
            data={data}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
            style={styles.container}
        />
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    backgroudYellou : {
        backgroundColor: '#ffd358',
    },
    backgroudRed : {
        backgroundColor: 'rgb(245,143,143)',
    },
    backgroudGreen : {
        backgroundColor: 'rgb(210,252,199)',
    },
    standardButton: {
        boxShadow: '0px 1px 4px #000000bf',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 2,
        elevation: 3,
        width: 95,
        height: 40,
    },
    submitButton: {
        height: 40,
        marginBottom: 10
    },
    standardButtonText: {
        letterSpacing: 0,
        fontSize: 12,
        fontWeight: '400',
        color: '#434343',
    },
    flexRow :{
        flexDirection: 'row',
        alignItems: 'center',
    },
    animalContainer: {
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        overflow: 'hidden',
    },
    animalImage: {
        width: 100,
        height: 100,
        resizeMode: 'cover',
    },
    animalDetails: {
        flex: 1,
        padding: 10,
    },
    acitions: {
        flex: 1,
        flexDirection : 'row',
        justifyContent :'space-around',
        padding: 10,
    },
    animalName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    animalDescription: {
        fontSize: 14,
    },
});