import {Image, StyleSheet, Text, View, FlatList, Pressable} from "react-native";
import React, { useEffect, useState } from 'react';
import {collection, query, getDocs, where} from "firebase/firestore";
import {fs,auth} from "../../config/firebaseConfig";
import {getStorage,getDownloadURL, ref } from "@firebase/storage";

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

    async function iniciarChat() {
        console.log('Fazer logica para iniciar chat.')
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
        <View style={styles.animalContainer}>
            <Image source={{ uri: imageUrls[item.id] }} style={styles.animalImage} />
            <View style={styles.animalDetails}>
                <Text style={styles.animalName}>{item.message.body}</Text>
                <Pressable style={[styles.standardButton, styles.submitButton]} onPress={async () => {await iniciarChat();}}>
                    <Text style={styles.standardButtonText}>Iniciar chat</Text>
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
        width: '100%',
        height: 40,
        marginBottom: 10
    },
    standardButtonText: {
        letterSpacing: 0,
        fontSize: 12,
        fontWeight: '400',
        color: '#434343',
        // fontFamily: 'Roboto_400Regular'
    },
    animalContainer: {
        flexDirection: 'row',
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
    animalName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    animalDescription: {
        fontSize: 14,
    },
});