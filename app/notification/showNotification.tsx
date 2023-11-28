import {Image, ScrollView, StyleSheet, Text, View, FlatList, TouchableOpacity} from "react-native";
import React, { useEffect, useState } from 'react';
import {collection, query, getDocs, where,} from "firebase/firestore";
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
            console.log('entrei aqui')
        };

        fetchData();
    }, []);

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


    return (

        <View>
            <FlatList
                data={data}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => navigation.navigate('details', { item })}
                    >
                        <View style={styles.card}>
                            <Image source={{ uri: imageUrls[item.id] }} style={styles.image} />
                            <Text style={styles.name}>{item.nome}</Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </View>

    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginStart: 15,
        marginRight: 15,
        marginTop : 10,
        marginBottom : 10
    },
    image: {
        width: '100%',
        height: 150,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        padding: 10,
        textAlign: 'center',
    },
});