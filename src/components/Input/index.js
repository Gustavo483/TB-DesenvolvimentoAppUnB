import {StyleSheet, SafeAreaView, TextInput, Text, View} from 'react-native';

export default function Input({placeholder}) {
    return (
        <View>
            <SafeAreaView>
                <TextInput
                    placeholderTextColor={'#bdbdbd'}
                    placeholder={placeholder}
                    style={styles.input}></TextInput>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    input: {
        fontFamily: "Roboto Regular",
        fontSize: 14,
        height: 40,
        borderBottomWidth: 0.8,
        borderBottomColor: "#e6e7e8",
        padding: 10,
        marginStart: 20,
        marginEnd: 20
    }
});
