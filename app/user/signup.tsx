import * as ImagePicker from "expo-image-picker";
import {Image, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {StatusBar} from "expo-status-bar";
import {useState} from "react";
import {setDoc, doc} from "firebase/firestore";
import {createUserWithEmailAndPassword} from "@firebase/auth";
import {Controller, useForm} from "react-hook-form";
import {auth, fs} from "../../config/firebaseConfig";
import {signup} from "../../styles/global";
import Button from "../../components/buttons/buttonsPadroes";

export default function Signup({ navigation }) {
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
                await setDoc(doc(fs, "users", user.uid), {
                    email: data.email,
                    nome : data.nome,
                    endereco : data.endereco,
                    cidade : data.cidade,
                    uf : data.uf,
                    idade : data.idade,
                    telefone : data.telefone
                });
                navigation.navigate('Login')

            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode);
                console.log(errorMessage);
            });

    }
    let imgShow;

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
        imgShow = <Image source={{uri: image}} style={signup.img}/>
    } else {
        imgShow =
            <Pressable style={[signup.containerCenter, signup.imagePicker]} onPress={pickImage}>
                <Text>adicionar fotos</Text>
            </Pressable>
    }

    return (
        <ScrollView>
            <StatusBar style="auto" backgroundColor="#88c9bf"/>
            <View style={signup.container}>
                <View style={signup.notification}>
                    <Text style={{textAlign: "center"}}>As informações preenchidas serão divulgadas apenas para a pessoa
                        com a qual você realizar o
                        processo de adoção e/ou apadrinhamento, após a formalização do processo.</Text>
                </View>
                <View>
                    <Text style={signup.text}>
                        INFORMAÇÕES DE PESSOAIS
                    </Text>
                </View>
                <View style={signup.contentView}>
                    <Controller
                        control={control}
                        rules={{
                            required: true,
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                style={signup.input}
                                placeholder="Nome Completo"
                                onBlur={onBlur}
                                placeholderTextColor={'#bdbdbd'}
                                onChangeText={onChange}
                                value={value}
                            />
                        )}
                        name="nome"
                    />
                    {errors.nome && <Text style={signup.colorError}>Este campo deve ser preenchido.</Text>}
                </View>

                <View style={signup.contentView}>
                    <Controller
                        control={control}
                        render={({field: {onChange, onBlur, value}}) => (
                            <TextInput
                                style={signup.input}
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
                    {errors.idade && <Text style={signup.colorError}>Este campo deve ser preenchido.</Text>}
                </View>
                <View style={signup.contentView}>
                    <Controller
                        control={control}
                        render={({field: {onChange, onBlur, value}}) => (
                            <TextInput
                                style={signup.input}
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
                    {errors.uf && <Text style={signup.colorError}>Este campo deve ser preenchido.</Text>}
                </View>
                <View style={signup.contentView}>
                    <Controller
                        control={control}
                        render={({field: {onChange, onBlur, value}}) => (
                            <TextInput
                                style={signup.input}
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
                    {errors.cidade && <Text style={signup.colorError}>Este campo deve ser preenchido.</Text>}
                </View>
                <View style={signup.contentView}>
                    <Controller
                        control={control}
                        render={({field: {onChange, onBlur, value}}) => (
                            <TextInput
                                style={signup.input}
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
                    {errors.endereco && <Text style={signup.colorError}>Este campo deve ser preenchido.</Text>}
                </View>
                <View style={signup.contentView}>
                    <Controller
                        control={control}
                        render={({field: {onChange, onBlur, value}}) => (
                            <TextInput
                                style={signup.input}
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
                    {errors.telefone && <Text style={signup.colorError}>Este campo deve ser preenchido.</Text>}
                </View>
                <View>
                    <Text style={signup.text}>
                        INFORMAÇÕES DE PERFIL
                    </Text>
                </View>
                <View style={signup.contentView}>
                    <Controller
                        control={control}
                        render={({field: {onChange, onBlur, value}}) => (
                            <TextInput
                                style={signup.input}
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
                    {errors.email && <Text style={signup.colorError}>Este campo deve ser preenchido.</Text>}
                </View>
                <View style={signup.contentView}>
                    <Controller
                        control={control}
                        render={({field: {onChange, onBlur, value}}) => (
                            <TextInput
                                style={signup.input}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                placeholderTextColor={'#bdbdbd'}
                                placeholder="Senha"
                                keyboardType={"visible-password"}
                                secureTextEntry={true}
                            />
                        )}
                        name="password"
                        rules={{required: true}}
                    />
                    {errors.password && <Text style={signup.colorError}>Este campo deve ser preenchido</Text>}
                </View>
                <View style={signup.contentView}>
                    <Controller
                        control={control}
                        render={({field: {onChange, onBlur, value}}) => (
                            <TextInput
                                style={signup.input}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                placeholderTextColor={'#bdbdbd'}
                                placeholder="Confirmação de Senha"
                                keyboardType={"visible-password"}
                                secureTextEntry={true}
                            />
                        )}
                        name="passwdConfirm"
                        rules={{required: true}}
                    />
                    {errors.passwdConfirm && <Text style={signup.colorError}>Este campo deve ser preenchido.</Text>}
                </View>
                <View>
                    <Text style={signup.text}>
                        FOTO DE PERFIL
                    </Text>
                </View>
                <View style={signup.imgPerfil}>
                    <TouchableOpacity onPress={pickImage}>
                        {imgShow}
                    </TouchableOpacity>
                </View>
                <View style={signup.buttonEntrar}>
                    <Pressable onPress={handleSubmit(onSubmit)}>
                        <Button color="green" texto="FAZER CADASTRO"/>
                    </Pressable>
                </View>
            </View>
        </ScrollView>
    )
}