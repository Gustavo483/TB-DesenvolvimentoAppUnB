import {StyleSheet} from "react-native";
import {StackNavigationOptions} from "@react-navigation/stack";

export const navigation: StackNavigationOptions = {
    headerStyle: {
        backgroundColor: '#CFE9E5'
    },
    headerTitleStyle: {
        fontFamily: 'Roboto_500Medium',
    }
};

export const global = StyleSheet.create({
    container:{
        marginStart: 20,
        marginEnd: 20
    },
    buttonEntrar: {
        alignItems: 'center',
        marginTop: 52
    },
    buttonFacebook: {
        alignItems: 'center',
        marginTop: 72
    },
    buttonGoogle: {
        alignItems: 'center',
        marginTop: 8
    },
    espacamentoInput: {
        marginTop: 20
    },
    espacamentoMenu: {
        marginBottom: 64
    }
});

export const signup = StyleSheet.create({
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

export const pet = StyleSheet.create({
    input: {
        fontSize: 14,
        height: 40,
        width: '100%',
        borderBottomWidth: 0.8,
        borderBottomColor: "#e6e7e8",
        padding: 10,
    },
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