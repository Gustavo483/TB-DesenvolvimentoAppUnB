import {useState} from "react";
import {StatusBar} from 'expo-status-bar';
import {View, Text, Pressable, ScrollView, TextInput, StyleSheet, TouchableOpacity, Image} from 'react-native';
import * as ImagePicker from "expo-image-picker";
import DefaultCheckbox from "../../components/inputs/checkboxPadrao";
import {Controller, useForm} from "react-hook-form";
import {addDoc, collection} from "firebase/firestore";
import {auth, fs, st} from "../../config/firebaseConfig";
import {pet, signup} from "../../styles/global";
import RadioButtonGroup, {RadioButtonItem} from "expo-radio-button";
import {ref, uploadBytes} from "@firebase/storage";

export default function Create({navigation}) {
    const [image, setImage] = useState(null);

    const { control, handleSubmit, setValue, formState: { errors } } = useForm({
        defaultValues: {
            nome: '',
            especie: '',
            sexo: '',
            porte: '',
            idade: '',
            temperamento: '',
            saude: '',
            descricaoDoencas: '',
            exigencias: '',
            descricao: '',
            tempoAcompanhamentoAposAdocao: '',
            idDono: '',
            foto: ''
        }});

    const onSubmit = async data => {
        const docRef = await addDoc(collection(fs, "pets"), {
            nome: data.nome,
            especie: data.especie,
            sexo: data.sexo,
            porte: data.porte,
            idade: data.idade,
            temperamento: data.temperamento,
            saude: data.saude,
            descricaoDoencas: data.descricaoDoencas,
            exigencias: data.exigencias,
            tempoAcompanhamentoAposAdocao: data.tempoAcompanhamentoAposAdocao,
            descricao: data.descricao,
            idDono: auth.currentUser.uid
        });

        const blob = await fetch(data.foto).then(r => r.blob());
        const storageRef = ref(st, 'pets/'+docRef.id+'.jpeg');
        uploadBytes(storageRef, blob).then((snapshot) => {
            console.log('Uploaded a blob or file!');
        });
        navigation.navigate('Pets')
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
            setValue("foto", result.assets[0].uri);
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
        <>
            <StatusBar style="auto" backgroundColor="#88c9bf"/>
            <ScrollView>
                <View style={pet.container}>
                    {/*<Text style={pet.headerSelectionText}>Tenho interesse em cadastrar animal para:</Text>*/}
                    {/*<View style={pet.rowContainer}>*/}
                    {/*    <Pressable style={pet.standardButton}>*/}
                    {/*        <Text style={pet.standardButtonText}>ADOÇÃO</Text>*/}
                    {/*    </Pressable>*/}
                    {/*    <Pressable style={[pet.standardButton, pet.inactiveButton]}>*/}
                    {/*        <Text style={[pet.standardButtonText, pet.inactiveButtonText]}>APADRINHAR</Text>*/}
                    {/*    </Pressable>*/}
                    {/*    <Pressable style={[pet.standardButton, pet.inactiveButton]}>*/}
                    {/*        <Text style={pet.standardButtonText}>AJUDA</Text>*/}
                    {/*    </Pressable>*/}
                    {/*</View>*/}
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
                        <View style={signup.imgPerfil}>
                            <Controller
                                control={control}
                                render={({ field: { onChange, value } }) => (
                                    <TouchableOpacity onPress={pickImage}>
                                        {imgShow}
                                    </TouchableOpacity>
                                )}
                                name="foto"
                                defaultValue=""
                            />
                        </View>

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

