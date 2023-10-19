import {Image, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {StatusBar} from "expo-status-bar";
import * as ImagePicker from "expo-image-picker";
import React, {useState} from "react";
import {Controller, useForm} from "react-hook-form";
import Button from "../../components/buttons/buttonsPadroes";
import { auth, fs } from "../../firebaseConfig";
import { createUserWithEmailAndPassword } from "@firebase/auth";
import { collection, addDoc } from "firebase/firestore";

export default function CreateUser({ navigation }) {
    const [image, setImage] = useState(null);

    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            nome: '',
            passwdConfirm :'',
            password :'',
            telefone :'',
            endereco :'',
            cidade :'',
            uf :'',
            email :'',
            idade :''
        }
    });
    const onSubmit = data => {
        console.log(data)
        createUserWithEmailAndPassword(auth, data.email, data.password)
            .then(async (userCredential) => {
                const user = userCredential.user;
                const docRef = await addDoc(collection(fs, "users"), {
                    uid: user.uid,
                    email: data.email,
                    nome : data.nome,
                    endereco : data.endereco,
                    cidade : data.cidade,
                    uf : data.uf,
                    idade : data.idade,
                    telefone : data.telefone
                });
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode);
                console.log(errorMessage);
            });

    }
    let imgShow;



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
                    <Controller
                        control={control}
                        rules={{
                            required: true,
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                style={styles.input}
                                placeholder="Nome Completo"
                                onBlur={onBlur}
                                placeholderTextColor={'#bdbdbd'}
                                onChangeText={onChange}
                                value={value}
                            />
                        )}
                        name="nome"
                    />
                    {errors.nome && <Text style={styles.colorError}>Este campo deve ser preenchido.</Text>}
                </View>

                <View style={styles.contentView}>
                    <Controller
                        control={control}
                        render={({field: {onChange, onBlur, value}}) => (
                            <TextInput
                                style={styles.input}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                placeholderTextColor={'#bdbdbd'}
                                placeholder="Idade"
                                keyboardType={"numeric"}
                            />
                        )}
                        name="idade"
                        rules={{required: true}}
                    />
                    {errors.idade && <Text style={styles.colorError}>Este campo deve ser preenchido.</Text>}
                </View>
                <View style={styles.contentView}>
                    <Controller
                        control={control}
                        render={({field: {onChange, onBlur, value}}) => (
                            <TextInput
                                style={styles.input}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                placeholderTextColor={'#bdbdbd'}
                                placeholder="E-mail"
                                keyboardType={"email-address"}
                            />
                        )}
                        name="email"
                        rules={{required: true}}
                    />
                    {errors.email && <Text style={styles.colorError}>Este campo deve ser preenchido.</Text>}
                </View>
                <View style={styles.contentView}>
                    <Controller
                        control={control}
                        render={({field: {onChange, onBlur, value}}) => (
                            <TextInput
                                style={styles.input}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                placeholderTextColor={'#bdbdbd'}
                                placeholder="Estado"
                            />
                        )}
                        name="uf"
                        rules={{required: true}}
                    />
                    {errors.uf && <Text style={styles.colorError}>Este campo deve ser preenchido.</Text>}
                </View>
                <View style={styles.contentView}>
                    <Controller
                        control={control}
                        render={({field: {onChange, onBlur, value}}) => (
                            <TextInput
                                style={styles.input}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                placeholderTextColor={'#bdbdbd'}
                                placeholder="Cidade"
                            />
                        )}
                        name="cidade"
                        rules={{required: true}}
                    />
                    {errors.cidade && <Text style={styles.colorError}>Este campo deve ser preenchido.</Text>}
                </View>
                <View style={styles.contentView}>
                    <Controller
                        control={control}
                        render={({field: {onChange, onBlur, value}}) => (
                            <TextInput
                                style={styles.input}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                placeholderTextColor={'#bdbdbd'}
                                placeholder="Endereço"
                            />
                        )}
                        name="endereco"
                        rules={{required: true}}
                    />
                    {errors.endereco && <Text style={styles.colorError}>Este campo deve ser preenchido.</Text>}
                </View>
                <View style={styles.contentView}>
                    <Controller
                        control={control}
                        render={({field: {onChange, onBlur, value}}) => (
                            <TextInput
                                style={styles.input}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                placeholderTextColor={'#bdbdbd'}
                                placeholder="Telefone"
                                keyboardType={"phone-pad"}
                            />
                        )}
                        name="telefone"
                        rules={{required: true}}
                    />
                    {errors.telefone && <Text style={styles.colorError}>Este campo deve ser preenchido.</Text>}
                </View>
                <View>
                    <Text style={styles.text}>
                        INFORMAÇÕES DE PERFIL
                    </Text>
                </View>
                <View style={styles.contentView}>
                    <Controller
                        control={control}
                        render={({field: {onChange, onBlur, value}}) => (
                            <TextInput
                                style={styles.input}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                placeholderTextColor={'#bdbdbd'}
                                placeholder="E-mail"
                                keyboardType={"email-address"}
                            />
                        )}
                        name="email"
                        rules={{required: true}}
                    />
                    {errors.email && <Text style={styles.colorError}>Este campo deve ser preenchido.</Text>}
                </View>
                <View style={styles.contentView}>
                    <Controller
                        control={control}
                        render={({field: {onChange, onBlur, value}}) => (
                            <TextInput
                                style={styles.input}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                placeholderTextColor={'#bdbdbd'}
                                placeholder="Senha"
                                keyboardType={"visible-password"}
                            />
                        )}
                        name="password"
                        rules={{required: true}}
                    />
                    {errors.password && <Text style={styles.colorError}>Este campo deve ser preenchido</Text>}
                </View>
                <View style={styles.contentView}>
                    <Controller
                        control={control}
                        render={({field: {onChange, onBlur, value}}) => (
                            <TextInput
                                style={styles.input}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                placeholderTextColor={'#bdbdbd'}
                                placeholder="Confirmação de Senha"
                                keyboardType={"visible-password"}
                            />
                        )}
                        name="passwdConfirm"
                        rules={{required: true}}
                    />
                    {errors.passwdConfirm && <Text style={styles.colorError}>Este campo deve ser preenchido.</Text>}
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
                    <Pressable onPress={handleSubmit(onSubmit)}>
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
    colorError: {
        color: '#8A0303'
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