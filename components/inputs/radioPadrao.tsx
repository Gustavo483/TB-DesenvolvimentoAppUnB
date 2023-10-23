import {StyleSheet} from 'react-native';
import React from "react";
import RadioButtonGroup, {RadioButtonItem} from "expo-radio-button";

export default function DefaultRadio({items}) {
    const [current, setCurrent] = React.useState("");
    return (
        <RadioButtonGroup
            containerStyle={styles.rowContainerLeft}
            selected={current}
            onSelected={(value) => setCurrent(value)}
            containerOptionStyle={{margin:5}}
            radioBackground="#ffd358">
            {items.map((option, index) => (
                <RadioButtonItem key={index.toString()} label={option} value={option.toLowerCase()} />
            ))}
        </RadioButtonGroup>
    );
}

const styles = StyleSheet.create({
    rowContainerLeft:{
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
});
