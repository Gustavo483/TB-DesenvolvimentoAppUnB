import React, {ReactNode, useState} from "react";
import {StatusBar} from 'expo-status-bar';
import {View, Text, Pressable, ScrollView, TextInput, TouchableOpacity, StyleSheet} from 'react-native';
import * as ImagePicker from "expo-image-picker";
import Input from "../../components/inputs/inputPadrao";
import DefaultCheckbox from "../../components/inputs/checkboxPadrao";
import DefaultRadio from "../../components/inputs/radioPadrao";
import {Controller, useForm} from "react-hook-form";
import {addDoc, collection} from "firebase/firestore";
import {fs} from "../../config/firebaseConfig";
import {pet, signup} from "../../styles/global";
import RadioButtonGroup, {RadioButtonItem} from "expo-radio-button";
import {Checkbox} from "expo-checkbox";

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
            descricaoDoencas:'',
            exigencias :'',
            descricao :'',
            tempoAcompanhamentoAposAdocao: '',
        }});

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
            descricaoDoencas : data.descricaoDoencas,
            exigencias :data.exigencias,
            tempoAcompanhamentoAposAdocao :data.tempoAcompanhamentoAposAdocao,
            descricao :data.descricao
        });
        navigation.navigate('Home')
    }

    const [current, setCurrent] = React.useState("");
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
                        <Controller
                            name="especie"
                            control={control}
                            defaultValue=""
                            render={({ field: { onChange, value } }) => (
                                <RadioButtonGroup
                                    containerStyle={styles.rowContainerLeft}
                                    selected={value}
                                    onSelected={(selectedValue) => onChange(selectedValue)}
                                    containerOptionStyle={{margin:5}}
                                    radioBackground="#ffd358"
                                >
                                    {['gato', 'cachorro'].map((option, index) => (
                                        <RadioButtonItem   key={index.toString()} label={option} value={option.toLowerCase()} />
                                    ))}
                                </RadioButtonGroup>
                            )}
                        />

                        <Text style={pet.label}>SEXO</Text>
                        <Controller
                            name="sexo"
                            control={control}
                            defaultValue=""
                            render={({ field: { onChange, value } }) => (
                                <RadioButtonGroup
                                    containerStyle={styles.rowContainerLeft}
                                    selected={value}
                                    onSelected={(selectedValue) => onChange(selectedValue)}
                                    containerOptionStyle={{margin:5}}
                                    radioBackground="#ffd358"
                                >
                                    {["Macho", "Femea"].map((option, index) => (
                                        <RadioButtonItem   key={index.toString()} label={option} value={option.toLowerCase()} />
                                    ))}
                                </RadioButtonGroup>
                            )}
                        />

                        <Text style={pet.label}>PORTE</Text>
                        <Controller
                            name="porte"
                            control={control}
                            defaultValue=""
                            render={({ field: { onChange, value } }) => (
                                <RadioButtonGroup
                                    containerStyle={styles.rowContainerLeft}
                                    selected={value}
                                    onSelected={(selectedValue) => onChange(selectedValue)}
                                    containerOptionStyle={{margin:5}}
                                    radioBackground="#ffd358"
                                >
                                    {["Pequeno", "Medio", "Grande"].map((option, index) => (
                                        <RadioButtonItem   key={index.toString()} label={option} value={option.toLowerCase()} />
                                    ))}
                                </RadioButtonGroup>
                            )}
                        />

                        <Text style={pet.label}>IDADE</Text>
                        <Controller
                            name="idade"
                            control={control}
                            defaultValue=""
                            render={({ field: { onChange, value } }) => (
                                <RadioButtonGroup
                                    containerStyle={styles.rowContainerLeft}
                                    selected={value}
                                    onSelected={(selectedValue) => onChange(selectedValue)}
                                    containerOptionStyle={{margin:5}}
                                    radioBackground="#ffd358"
                                >
                                    {["Filhote", "Adulto", "Idoso"].map((option, index) => (
                                        <RadioButtonItem   key={index.toString()} label={option} value={option.toLowerCase()} />
                                    ))}
                                </RadioButtonGroup>
                            )}
                        />

                        <Text style={pet.label}>TEMPERAMENTO</Text>
                        <View style={pet.section}>
                            <DefaultCheckbox name="temperamento.Brincalhão" secondary="false" control={control} label="Brincalhão" />
                            <DefaultCheckbox name="temperamento.Tímido" secondary="false" control={control} label="Tímido" />
                            <DefaultCheckbox name="temperamento.Calmo" secondary="false" control={control} label="Calmo" />
                        </View>

                        <View style={pet.section}>
                            <DefaultCheckbox name="temperamento.Guarda" secondary="false" control={control} label="Guarda" />
                            <DefaultCheckbox name="temperamento.Amoroso" secondary="false" control={control} label="Amoroso" />
                            <DefaultCheckbox name="temperamento.Preguiçoso" secondary="false" control={control} label="Preguiçoso" />
                        </View>

                        <Text style={pet.label}>SAÚDE</Text>
                        <View style={pet.section}>
                            <DefaultCheckbox name="saude.Vacinado" secondary="false" control={control} label="Vacinado" />
                            <DefaultCheckbox name="saude.Vermifugado" secondary="false" control={control} label="Vermifugado" />
                        </View>
                        <View style={pet.section}>
                            <DefaultCheckbox name="saude.Castrado" secondary="false" control={control} label="Castrado" />
                            <DefaultCheckbox name="saude.Doente" secondary="false" control={control} label="Doente" />
                        </View>

                        <Controller
                            control={control}
                            rules={{
                                required: true,
                            }}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    style={pet.input}
                                    placeholder="descrição Doenças"
                                    onBlur={onBlur}
                                    placeholderTextColor={'#bdbdbd'}
                                    onChangeText={onChange}
                                    value={value}
                                />
                            )}
                            name="descricaoDoencas"
                        />
                        {errors.descricaoDoencas && <Text style={signup.colorError}>Este campo deve ser preenchido.</Text>}

                        <Text style={pet.label}>EXIGÊNCIAS PARA ADOÇÃO</Text>
                        <View style={pet.section}>
                            <DefaultCheckbox name="exigencias.Termo de adoção" control={control} secondary="false" label="Termo de adoção" />
                        </View>
                        <View style={pet.section}>
                            <DefaultCheckbox name="exigencias.Fotos da casa" control={control} secondary="false" label="Fotos da casa" />
                        </View>
                        <View style={pet.section}>
                            <DefaultCheckbox name="exigencias.Visita prévia ao animal" control={control} secondary="false" label="Visita prévia ao animal" />
                        </View>
                        <View style={pet.section}>
                            <DefaultCheckbox name="exigencias.Acompanhamento após adoção" control={control} secondary="false"  label="Acompanhamento após adoção" />
                        </View>
                        <View style={pet.section}>
                            <DefaultCheckbox name="tempoAcompanhamentoAposAdocao.1 mês" secondary="true" control={control} label="1 mês" />
                        </View>
                        <View style={pet.section}>
                            <DefaultCheckbox name="tempoAcompanhamentoAposAdocao.3 meses" secondary="true" control={control} label="3 meses" />
                        </View>
                        <View style={pet.section}>
                            <DefaultCheckbox name="tempoAcompanhamentoAposAdocao.6 meses" secondary="true" control={control} label="6 meses" />
                        </View>

                        <Text style={pet.label}>SOBRE O ANIMAL</Text>
                        <Controller
                            control={control}
                            rules={{
                                required: true,
                            }}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    style={pet.input}
                                    placeholder="Compartilhe a história do animal"
                                    onBlur={onBlur}
                                    placeholderTextColor={'#bdbdbd'}
                                    onChangeText={onChange}
                                    value={value}
                                />
                            )}
                            name="descricao"
                        />
                        {errors.descricao && <Text style={signup.colorError}>Este campo deve ser preenchido.</Text>}

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
const styles = StyleSheet.create({
    rowContainerLeft:{
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
});

