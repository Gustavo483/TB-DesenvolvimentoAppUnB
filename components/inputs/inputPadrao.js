import {StyleSheet, SafeAreaView, TextInput, Text, View} from 'react-native';
import {useState} from "react";

export default function Input({onTextChange, placeholder, password = false}) {
    const [text, setText] = useState('');
    const handleTextChange = (inputText) => {
        setText(inputText);
        // Pass the input text back up to the parent
        onTextChange(inputText);
    };

    return (
        <View>
            <SafeAreaView>
                <TextInput
                    value={text}
                    secureTextEntry={password}
                    onChangeText={handleTextChange}
                    placeholderTextColor={'#bdbdbd'}
                    placeholder={placeholder}
                    style={styles.input}>
                </TextInput>
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
