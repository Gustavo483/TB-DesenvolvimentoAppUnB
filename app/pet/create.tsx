import {useState} from "react";
import {StatusBar} from 'expo-status-bar';
import {View, Text, Pressable, ScrollView, TextInput} from 'react-native';
import * as ImagePicker from "expo-image-picker";
import Input from "../../components/inputs/inputPadrao";
import DefaultCheckbox from "../../components/inputs/checkboxPadrao";
import DefaultRadio from "../../components/inputs/radioPadrao";
import {Controller, useForm} from "react-hook-form";
import {addDoc, collection} from "firebase/firestore";
import {fs} from "../../config/firebaseConfig";
import {pet, signup} from "../../styles/global";

export default function Create({navigation}) {
    const [image, setImage] = useState(null);

    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            nome: '',
            especie :'',
            sexo :'',
            porte :'',
            idade :'',
            temperamento :'',
            saude :'',
            doencas :'',
            exigencias :'',
            descricao :''
        }
    });

    const onSubmit = async data => {
        console.log(data)
        const docRef = await addDoc(collection(fs, "pets"), {
            nome: data.nome,
            especie :data.especie,
            sexo :data.sexo,
            porte :data.porte,
            idade :data.idade,
            temperamento :data.temperamento,
            saude :data.saude,
            doencas :data.doencas,
            exigencias :data.exigencias,
            descricao :data.descricao
        });
        navigation.navigate('Home')
    }

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    return (
        <>
            <StatusBar style="auto" backgroundColor="#88c9bf"/>
            <ScrollView>
                <View style={pet.container}>
                    <Text style={pet.headerSelectionText}>Tenho interesse em cadastrar animal para:</Text>
                    <View style={pet.rowContainer}>
                        <Pressable style={pet.standardButton}>
                            <Text style={pet.standardButtonText}>ADOÇÃO</Text>
                        </Pressable>
                        <Pressable style={[pet.standardButton, pet.inactiveButton]}>
                            <Text style={[pet.standardButtonText, pet.inactiveButtonText]}>APADRINHAR</Text>
                        </Pressable>
                        <Pressable style={[pet.standardButton, pet.inactiveButton]}>
                            <Text style={pet.standardButtonText}>AJUDA</Text>
                        </Pressable>
                    </View>
                    <View>
                        <Text style={pet.headerText}>Adoção</Text>

                        <Text style={pet.label}>NOME DO ANIMAL</Text>
                        <View>
                            <Controller
                                control={control}
                                rules={{
                                    required: true,
                                }}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <TextInput
                                        style={pet.input}
                                        placeholder="Nome do animal"
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

                        <Text style={pet.label}>FOTOS DO ANIMAL</Text>
                        <Pressable style={[pet.containerCenter, pet.imagePicker]} onPress={pickImage}>
                            <Text>adicionar fotos</Text>
                        </Pressable>

                        <Text style={pet.label}>ESPÉCIE</Text>
                        <DefaultRadio items={["Cachorro", "Gato"]}></DefaultRadio>

                        <Text style={pet.label}>SEXO</Text>
                        <DefaultRadio items={["Macho", "Femea"]}></DefaultRadio>

                        <Text style={pet.label}>PORTE</Text>
                        <DefaultRadio items={["Pequeno", "Medio", "Grande"]}></DefaultRadio>

                        <Text style={pet.label}>IDADE</Text>
                        <DefaultRadio items={["Filhote", "Adulto", "Idoso"]}></DefaultRadio>

                        <Text style={pet.label}>TEMPERAMENTO</Text>
                        <View style={pet.section}>
                            <DefaultCheckbox name="Brincalhão"></DefaultCheckbox>
                            <DefaultCheckbox name="Tímido"></DefaultCheckbox>
                            <DefaultCheckbox name="Calmo"></DefaultCheckbox>
                        </View>
                        <View style={pet.section}>
                            <DefaultCheckbox name="Guarda"></DefaultCheckbox>
                            <DefaultCheckbox name="Amoroso"></DefaultCheckbox>
                            <DefaultCheckbox name="Preguiçoso"></DefaultCheckbox>
                        </View>

                        <Text style={pet.label}>SAÚDE</Text>
                        <View style={pet.section}>
                            <DefaultCheckbox name="Vacinado"></DefaultCheckbox>
                            <DefaultCheckbox name="Vermifugado"></DefaultCheckbox>
                        </View>
                        <View style={pet.section}>
                            <DefaultCheckbox name="Castrado"></DefaultCheckbox>
                            <DefaultCheckbox name="Doente"></DefaultCheckbox>
                        </View>
                        <Input placeholder='Doenças do animal' onTextChange={undefined}/>

                        <Text style={pet.label}>EXIGÊNCIAS PARA ADOÇÃO</Text>
                        <View style={pet.section}>
                            <DefaultCheckbox name="Termo de adoção"></DefaultCheckbox>
                        </View>
                        <View style={pet.section}>
                            <DefaultCheckbox name="Fotos da casa"></DefaultCheckbox>
                        </View>
                        <View style={pet.section}>
                            <DefaultCheckbox name="Visita prévia ao animal"></DefaultCheckbox>
                        </View>
                        <View style={pet.section}>
                            <DefaultCheckbox name="Acompanhamento após adoção"></DefaultCheckbox>
                        </View>
                        <View style={pet.section}>
                            <DefaultCheckbox name="1 mês" secondary="true"></DefaultCheckbox>
                        </View>
                        <View style={pet.section}>
                            <DefaultCheckbox name="3 meses" secondary="true"></DefaultCheckbox>
                        </View>
                        <View style={pet.section}>
                            <DefaultCheckbox name="6 meses" secondary="true"></DefaultCheckbox>
                        </View>

                        <Text style={pet.label}>SOBRE O ANIMAL</Text>
                        <Input placeholder='Compartilhe a história do animal' onTextChange={undefined}/>
                    </View>

                    <View style={pet.containerCenter}>
                        <Pressable style={[pet.standardButton, pet.submitButton]} onPress={handleSubmit(onSubmit)}>
                            <Text style={pet.standardButtonText}>COLOCAR PARA ADOÇÃO</Text>
                        </Pressable>
                    </View>
                </View>
            </ScrollView>
        </>
    );
}
