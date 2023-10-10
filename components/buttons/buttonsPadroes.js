import {StyleSheet, View, Text} from 'react-native';
import {Entypo} from '@expo/vector-icons';
export default function Button({texto, color, svg = null}) {
    let estiloDeFundo = styles.backgroundPadrao;
    if (color === 'blue') {
        estiloDeFundo = styles.backgroundblue;
    } else if (color === 'orange') {
        estiloDeFundo = styles.backgroundOrange;
    }
    return (
        <View style={[estiloDeFundo, styles.button]}>
            {svg ? (<Entypo style={styles.espacamentoIcon} name={svg} size={24} color="white"/>) : ''}
            <Text style={styles.colorText}>{texto}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    button: {
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        width: 232,
        height: 40,
        borderRadius: 5,
        elevation: 5,
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.3,
        shadowRadius: 3,
        color: 'white'
    },
    espacamentoIcon: {
        marginEnd: 10
    },
    colorText: {
        color: 'white'
    },
    backgroundPadrao: {
        backgroundColor: '#88c9bf',
    },
    backgroundblue: {
        backgroundColor: '#194f7c',
    },
    backgroundOrange: {
        backgroundColor: '#f15f5c',
    }
});
