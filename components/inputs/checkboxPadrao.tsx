import {StyleSheet, Text} from 'react-native';
import {Checkbox} from "expo-checkbox";
import React from "react";

type DefaultCheckboxProps = {
    name: string;
    secondary?: string;
}

export default function DefaultCheckbox({name, secondary}: DefaultCheckboxProps) {
    const [isChecked, setChecked] = React.useState(false);
    return (
        <><Checkbox
            style={[styles.checkbox, secondary==="true" ? styles.secondaryCheckbox : {} ]}
            value={isChecked}
            onValueChange={setChecked}
            color={isChecked ? '#ffd358' : undefined}/>
            <Text>{name}</Text>
        </>
    );
}

const styles = StyleSheet.create({
    checkbox: {
        margin: 8
    },
    secondaryCheckbox: {
        marginLeft: 60,
        color: "#bdbdbd"
    }
});
