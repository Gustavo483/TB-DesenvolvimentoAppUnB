import {Image, ScrollView, StyleSheet} from "react-native";
import {StatusBar} from "expo-status-bar";
import { Text, View } from 'react-native';
import Button from "../../components/buttons/buttonsPadroes";
import {avatar, User} from "../hooks/useAuth";
import React, {useEffect, useState} from "react";
import {getDownloadURL, getStorage, ref} from "@firebase/storage";
export default function Details({route}) {
    const {userAvatar} = avatar();
    const {userData} = User()
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

    console.log(item)
    const temperamentos = Object.keys(item.temperamento).filter((chave) => item.temperamento[chave]).map((chave) => {
        return (
            <Text key={chave} >
                {item.temperamento[chave] ? `${chave}` : ''}
            </Text>
        );
    });

    const exigencias = Object.keys(item.exigencias).map((chave) => {
        console.log(item.exigencias[chave])
        return (
            <Text key={chave} >
                {item.exigencias[chave] ? `${chave}` : ''}
            </Text>
        );
    });
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
