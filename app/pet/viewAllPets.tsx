import {Image, ScrollView, StyleSheet, Text, View, FlatList, TouchableOpacity} from "react-native";
import {StatusBar} from "expo-status-bar";
import Button from "../../components/buttons/buttonsPadroes";
import {avatar, User} from "../hooks/useAuth";
import React, { useEffect, useState } from 'react';
import {collection, query, where, getDocs, doc, getDoc} from "firebase/firestore";
import {auth, fs, st} from "../../config/firebaseConfig";
import {navigation} from "../../styles/global";
import {getDownloadURL, ref} from "@firebase/storage";
export default function ViewAllPets({navigation}) {
    const [data, setData] = useState([]);
    const {userData} = User()


    useEffect(() => {
        const fetchData = async () => {
            const q = query(collection(fs, "pets"));

            const querySnapshot = await getDocs(q);

            const documents = [];
            querySnapshot.forEach((doc) => {
                documents.push({ id: doc.id, ...doc.data() });
                console.log(doc.data())
            });

            setData(documents);
        };

        fetchData();
    }, []);

    return (
        <ScrollView>
            <View>
                <FlatList
                    data={data}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() => navigation.navigate('details', { item })}
                        >
                            <View style={styles.card}>

                                <Text style={styles.name}>{item.nome}</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                />
            </View>
        </ScrollView>
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