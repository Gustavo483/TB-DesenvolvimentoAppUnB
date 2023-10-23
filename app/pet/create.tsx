import {StatusBar} from 'expo-status-bar';
import {StyleSheet, View, Text, Pressable, ScrollView} from 'react-native';
import Input from "../../components/inputs/inputPadrao";
import DefaultCheckbox from "../../components/inputs/checkboxPadrao";
import DefaultRadio from "../../components/inputs/radioPadrao";
import React from "react";
import * as ImagePicker from "expo-image-picker";

export default function Create() {
    const [image, setImage] = React.useState(null);

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
                <View style={styles.container}>
                    <Text style={styles.headerSelectionText}>Tenho interesse em cadastrar animal para:</Text>
                    <View style={styles.rowContainer}>
                        <Pressable style={styles.standardButton}>
                            <Text style={styles.standardButtonText}>ADOÇÃO</Text>
                        </Pressable>
                        <Pressable style={[styles.standardButton, styles.inactiveButton]}>
                            <Text style={[styles.standardButtonText, styles.inactiveButtonText]}>APADRINHAR</Text>
                        </Pressable>
                        <Pressable style={[styles.standardButton, styles.inactiveButton]}>
                            <Text style={styles.standardButtonText}>AJUDA</Text>
                        </Pressable>
                    </View>
                    <View>
                        <Text style={styles.headerText}>Adoção</Text>

                        <Text style={styles.label}>NOME DO ANIMAL</Text>
                        <Input placeholder='Nome do animal' onTextChange={undefined}/>

                        <Text style={styles.label}>FOTOS DO ANIMAL</Text>
                        <Pressable style={[styles.containerCenter, styles.imagePicker]} onPress={pickImage}>
                            <Text>adicionar fotos</Text>
                        </Pressable>

                        <Text style={styles.label}>ESPÉCIE</Text>
                        <DefaultRadio items={["Cachorro", "Gato"]}></DefaultRadio>

                        <Text style={styles.label}>SEXO</Text>
                        <DefaultRadio items={["Macho", "Femea"]}></DefaultRadio>

                        <Text style={styles.label}>PORTE</Text>
                        <DefaultRadio items={["Pequeno", "Medio", "Grande"]}></DefaultRadio>

                        <Text style={styles.label}>IDADE</Text>
                        <DefaultRadio items={["Filhote", "Adulto", "Idoso"]}></DefaultRadio>

                        <Text style={styles.label}>TEMPERAMENTO</Text>
                        <View style={styles.section}>
                            <DefaultCheckbox name="Brincalhão"></DefaultCheckbox>
                            <DefaultCheckbox name="Tímido"></DefaultCheckbox>
                            <DefaultCheckbox name="Calmo"></DefaultCheckbox>
                        </View>
                        <View style={styles.section}>
                            <DefaultCheckbox name="Guarda"></DefaultCheckbox>
                            <DefaultCheckbox name="Amoroso"></DefaultCheckbox>
                            <DefaultCheckbox name="Preguiçoso"></DefaultCheckbox>
                        </View>

                        <Text style={styles.label}>SAÚDE</Text>
                        <View style={styles.section}>
                            <DefaultCheckbox name="Vacinado"></DefaultCheckbox>
                            <DefaultCheckbox name="Vermifugado"></DefaultCheckbox>
                        </View>
                        <View style={styles.section}>
                            <DefaultCheckbox name="Castrado"></DefaultCheckbox>
                            <DefaultCheckbox name="Doente"></DefaultCheckbox>
                        </View>
                        <Input placeholder='Doenças do animal' onTextChange={undefined}/>

                        <Text style={styles.label}>EXIGÊNCIAS PARA ADOÇÃO</Text>
                        <View style={styles.section}>
                            <DefaultCheckbox name="Termo de adoção"></DefaultCheckbox>
                        </View>
                        <View style={styles.section}>
                            <DefaultCheckbox name="Fotos da casa"></DefaultCheckbox>
                        </View>
                        <View style={styles.section}>
                            <DefaultCheckbox name="Visita prévia ao animal"></DefaultCheckbox>
                        </View>
                        <View style={styles.section}>
                            <DefaultCheckbox name="Acompanhamento após adoção"></DefaultCheckbox>
                        </View>
                        <View style={styles.section}>
                            <DefaultCheckbox name="1 mês" secondary="true"></DefaultCheckbox>
                        </View>
                        <View style={styles.section}>
                            <DefaultCheckbox name="3 meses" secondary="true"></DefaultCheckbox>
                        </View>
                        <View style={styles.section}>
                            <DefaultCheckbox name="6 meses" secondary="true"></DefaultCheckbox>
                        </View>

                        <Text style={styles.label}>SOBRE O ANIMAL</Text>
                        <Input placeholder='Compartilhe a história do animal' onTextChange={undefined}/>
                    </View>

                    <View style={styles.containerCenter}>
                        <Pressable style={[styles.standardButton, styles.submitButton]}>
                            <Text style={styles.standardButtonText}>COLOCAR PARA ADOÇÃO</Text>
                        </Pressable>
                    </View>
                </View>
            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    container:{
        paddingStart: 20,
        paddingEnd: 20
    },
    containerCenter: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    rowContainer:{
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerSelectionText:{
        marginTop: 16,
        marginBottom: 16,
        color: '#757575',
        fontSize: 14,
        fontFamily: 'Roboto_400Regular'
    },
    headerText:{
        marginTop: 16,
        marginBottom: 16,
        color: '#434343',
        fontSize: 16,
        fontFamily: 'Roboto_500Medium'
    },
    label:{
        color: '#f7a800',
        fontSize: 12,
        marginTop: 20,
        marginBottom: 16,
        fontFamily: 'Roboto_400Regular'
    },
    standardButton: {
        boxShadow: '0px 1px 4px #000000bf',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 2,
        elevation: 3,
        backgroundColor: '#ffd358',
        width: 100,
        height: 40
    },
    submitButton: {
        width: 232,
        height: 40,
        margin: 24
    },
    inactiveButton: {
        backgroundColor: '#f1f2f2'
    },
    standardButtonText: {
        letterSpacing: 0,
        fontSize: 12,
        fontWeight: '400',
        color: '#434343',
        fontFamily: 'Roboto_400Regular'
    },
    inactiveButtonText: {
        color: '#bdbdbd',
    },
    imagePicker: {
        width: 312,
        height: 128,
        backgroundColor: "#f1f2f2"
    }
});
