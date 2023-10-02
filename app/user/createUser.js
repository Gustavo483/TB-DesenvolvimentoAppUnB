import {Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {StatusBar} from "expo-status-bar";
import Menu from "../../components/menus/menuTopo";
import Input from "../../components/inputs/inputPadrao";
import * as ImagePicker from "expo-image-picker";
import {useState} from "react";
import ImageButton from "../../assets/add-photo.png";
import Button from "../../components/buttons/buttonsPadroes";

export default function CreateUser() {
    const [image, setImage] = useState(null);
    let imgShow;

    if (image) {
        imgShow = <Image source={{uri: image}} style={styles.img}/>
    } else {

        imgShow = <Image source={ImageButton}></Image>
    }
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    return (
        <ScrollView>
            <StatusBar style="auto" backgroundColor="#88c9bf"/>
            <View style={styles.espacamentoMenu}>
                <Menu nome="Cadastro Pessoal"/>
            </View>
            <View style={styles.container}>
                <View style={styles.notification}>
                    <Text style={{textAlign: "center"}}>As informações preenchidas serão divulgadas apenas para a pessoa
                        com a qual você realizar o
                        processo de adoção e/ou apadrinhamento, após a formalização do processo.</Text>
                </View>
                <View>
                    <Text style={styles.text}>
                        INFORMAÇÕES DE PERFIL
                    </Text>
                </View>
                <View style={styles.contentView}>
                    <Input placeholder="Nome Completo"></Input>
                </View>
                <View style={styles.contentView}>
                    <Input
                        placeholder="Idade"
                    ></Input>
                </View>
                <View style={styles.contentView}>
                    <Input
                        placeholder="E-mail"
                    ></Input>
                </View>
                <View style={styles.contentView}>
                    <Input
                        placeholder="Estado"
                    ></Input>
                </View>
                <View style={styles.contentView}>
                    <Input
                        placeholder="Cidade"
                    ></Input>
                </View>
                <View style={styles.contentView}>
                    <Input
                        placeholder="Endereço"
                    ></Input>
                </View>
                <View style={styles.contentView}>
                    <Input
                        placeholder="Telefone"
                    ></Input>
                </View>
                <View>
                    <Text style={styles.text}>
                        INFORMAÇÕES DE PERFIL
                    </Text>
                </View>
                <View style={styles.contentView}>
                    <Input
                        placeholder="Nome de usuário"
                    ></Input>
                </View>
                <View style={styles.contentView}>
                    <Input
                        placeholder="Senha"
                    ></Input>
                </View>
                <View style={styles.contentView}>
                    <Input
                        placeholder="Confirmação de Senha"
                    ></Input>
                </View>
                <View>
                    <Text style={styles.text}>
                        FOTO DE PERFIL
                    </Text>
                </View>
                <View style={styles.imgPerfil}>
                    <TouchableOpacity onPress={pickImage}>
                        {imgShow}
                    </TouchableOpacity>
                </View>
                <View style={styles.buttonEntrar}>
                    <Button color="green" texto="FAZER CADASTRO"/>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        marginLeft: 16,
        marginRight: 16,
        marginTop: 16,
    },
    contentView: {
        marginTop: 25,
        width: '100%'
    },
    img: {
        width: 112,
        height: 112,
        borderRadius: 100,
    },
    imgPerfil:{
        width:'100%',
        alignItems:"center",
        marginTop:32
    },
    notification: {
        borderRadius: 4,
        backgroundColor: '#cfe9e5',
        height: 80,
        width: '100%',
        padding: 8
    },
    text: {
        marginTop: 28,
        color: '#589B9B'
    },
    subText: {
        color: '#757575'
    },
    buttonEntrar: {
        width:'100%',
        alignItems:"center",
        marginTop:32,
        marginBottom:32
    }
});