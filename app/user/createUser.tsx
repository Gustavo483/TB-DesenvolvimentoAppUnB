import {Image, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {StatusBar} from "expo-status-bar";
import * as ImagePicker from "expo-image-picker";
import React, {useContext, useState} from "react";
import {Controller, useForm} from "react-hook-form";
import Button from "../../components/buttons/buttonsPadroes";
import { auth, fs } from "../../config/firebaseConfig";
import { createUserWithEmailAndPassword } from "@firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import Input from "../../components/inputs/inputPadrao";
import UserContext from "../../context/UserContext";

export default function CreateUser({ navigation }) {
    const { userContext } = useContext(UserContext);
    const [image, setImage] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [name, setName] = useState('');

    const registerUser = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                const user = userCredential.user;
                const docRef = await addDoc(collection(fs, "users"), {
                    uid: user.uid,
                    email: email,
                    name: name
                });
                // userContext.docRef = docRef;
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode);
                console.log(errorMessage);
            });
    }


    const {register, setValue, handleSubmit, control, reset, formState: {errors}} = useForm({
        defaultValues: {
            nome: '',
            idade: '',
            email: '',
            uf: '',
            cidade: '',
            endereco: '',
            telefone: '',
            username: '',
            passwd: '',
            passwdConfirm: '',
        }
    });
    let imgShow;

    const onSubmit = data => {
        console.log(data);
    };

    // console.log('errors', errors);
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

    if (image) {
        imgShow = <Image source={{uri: image}} style={styles.img}/>
    } else {
        imgShow =
            <Pressable style={[styles.containerCenter, styles.imagePicker]} onPress={pickImage}>
                <Text>adicionar fotos</Text>
            </Pressable>
    }

    return (
        <ScrollView>
            <StatusBar style="auto" backgroundColor="#88c9bf"/>
            <View style={styles.container}>
                <View style={styles.notification}>
                    <Text style={{textAlign: "center"}}>As informações preenchidas serão divulgadas apenas para a pessoa
                        com a qual você realizar o
                        processo de adoção e/ou apadrinhamento, após a formalização do processo.</Text>
                </View>
                <View>
                    <Text style={styles.text}>
                        INFORMAÇÕES DE PESSOAIS
                    </Text>
                </View>
                <View style={styles.contentView}>
                    <Input onTextChange={setName} placeholder='Nome Completo'/>
                </View>
                <View style={styles.contentView}>
                    <Controller
                        control={control}
                        render={({field: {onChange, onBlur, value}}) => (
                            <TextInput
                                style={styles.input}
                                onBlur={onBlur}
                                onChangeText={value => onChange(value)}
                                value={value}
                                placeholderTextColor={'#bdbdbd'}
                                placeholder="Idade"
                                keyboardType={"numeric"}
                            />
                        )}
                        name="idade"
                        rules={{required: true}}
                    />
                </View>
                <View style={styles.contentView}>
                    <Controller
                        control={control}
                        render={({field: {onChange, onBlur, value}}) => (
                            <TextInput
                                style={styles.input}
                                onBlur={onBlur}
                                onChangeText={value => onChange(value)}
                                value={value}
                                placeholderTextColor={'#bdbdbd'}
                                placeholder="E-mail"
                                keyboardType={"email-address"}
                            />
                        )}
                        name="email"
                        rules={{required: true}}
                    />
                </View>
                <View style={styles.contentView}>
                    <Controller
                        control={control}
                        render={({field: {onChange, onBlur, value}}) => (
                            <TextInput
                                style={styles.input}
                                onBlur={onBlur}
                                onChangeText={value => onChange(value)}
                                value={value}
                                placeholderTextColor={'#bdbdbd'}
                                placeholder="Estado"
                            />
                        )}
                        name="uf"
                        rules={{required: true}}
                    />
                </View>
                <View style={styles.contentView}>
                    <Controller
                        control={control}
                        render={({field: {onChange, onBlur, value}}) => (
                            <TextInput
                                style={styles.input}
                                onBlur={onBlur}
                                onChangeText={value => onChange(value)}
                                value={value}
                                placeholderTextColor={'#bdbdbd'}
                                placeholder="Cidade"
                            />
                        )}
                        name="cidade"
                        rules={{required: true}}
                    />
                </View>
                <View style={styles.contentView}>
                    <Controller
                        control={control}
                        render={({field: {onChange, onBlur, value}}) => (
                            <TextInput
                                style={styles.input}
                                onBlur={onBlur}
                                onChangeText={value => onChange(value)}
                                value={value}
                                placeholderTextColor={'#bdbdbd'}
                                placeholder="Endereço"
                            />
                        )}
                        name="endereco"
                        rules={{required: true}}
                    />
                </View>
                <View style={styles.contentView}>
                    <Controller
                        control={control}
                        render={({field: {onChange, onBlur, value}}) => (
                            <TextInput
                                style={styles.input}
                                onBlur={onBlur}
                                onChangeText={value => onChange(value)}
                                value={value}
                                placeholderTextColor={'#bdbdbd'}
                                placeholder="Telefone"
                                keyboardType={"phone-pad"}
                            />
                        )}
                        name="telefone"
                        rules={{required: true}}
                    />
                </View>
                <View>
                    <Text style={styles.text}>
                        INFORMAÇÕES DE PERFIL
                    </Text>
                </View>
                <View style={styles.contentView}>
                    <Input onTextChange={setEmail} placeholder='E-Mail'/>
                </View>
                <View style={styles.contentView}>
                    <Input onTextChange={setPassword} placeholder='Senha' password={true}/>
                </View>

                <View style={styles.contentView}>
                    <Input onTextChange={setPasswordConfirmation} placeholder='Confirmação de senha' password={true}/>
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
                    <Pressable onPress={() => registerUser()}>
                        <Button color="green" texto="FAZER CADASTRO"/>
                    </Pressable>
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
    imgPerfil: {
        width: '100%',
        alignItems: "center",
        marginTop: 32
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
        width: '100%',
        alignItems: "center",
        marginTop: 32,
        marginBottom: 32
    },
    input: {
        fontSize: 14,
        height: 40,
        width: '100%',
        borderBottomWidth: 0.8,
        borderBottomColor: "#e6e7e8",
        padding: 10,
    },
    containerCenter: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    imagePicker: {
        width: 312,
        height: 128,
        backgroundColor: "#f1f2f2"
    }
});