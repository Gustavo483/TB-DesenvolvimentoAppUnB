import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function Menu({nome}) {
    return (
        <View>
            <View style={styles.containerMenu}>
                <View style={styles.flexContainerMenu}>
                    <Text>
                        <Icon name="menu" size={24} color="#434343"/>
                    </Text>
                    <Text style={styles.NamePage}>
                        {nome}
                    </Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    NamePage: {
        fontSize: 20,
        color: '#434343',
        marginStart: 25
    },
    flexContainerMenu: {
        flex: 1,
        alignItems: 'center',
        flexDirection: "row"
    },
    containerMenu: {
        backgroundColor: '#cfe9e5',
        height: 56,
        paddingStart: 16,
    }
});
