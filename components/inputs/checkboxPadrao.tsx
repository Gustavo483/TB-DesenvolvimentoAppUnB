import React from "react";
import {View, Text, StyleSheet} from "react-native";
import {Checkbox} from "expo-checkbox";
import { Controller } from 'react-hook-form';

export default function DefaultCheckbox({ name, control, label,secondary }) {
    return (
        <Controller
            name={name}
            control={control}
            defaultValue={false}
            render={({ field: { onChange, value } }) => (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Checkbox
                        style={[styles.checkbox, secondary==="true" ? styles.secondaryCheckbox : {} ]}
                        value={value}
                        onValueChange={newValue => onChange(newValue)}
                        color={'#ffd358'}
                    />
                    <Text>{label}</Text>
                </View>
            )}
        />
    );
};
const styles = StyleSheet.create({
    checkbox: {
        margin: 8
    },
    secondaryCheckbox: {
        marginLeft: 60,
        color: "#bdbdbd"
    }
});
