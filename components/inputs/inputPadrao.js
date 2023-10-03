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
        fontSize: 14,
        height: 40,
        width: '100%',
        borderBottomWidth: 0.8,
        borderBottomColor: "#e6e7e8",
        padding: 10,
    }
});
