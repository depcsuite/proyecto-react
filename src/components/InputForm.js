import React, { useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Icon, Input } from 'react-native-elements';

export default function InputForm(props) {

    const errorVisible = props.errorVisible != undefined ? props.errorVisible : false;

    useEffect(() => { /* console.log(props.label); */ }, []);

    return (
        <View style={style.mainContainer}>
            <Input
                value={props.value}
                label={props.label}
                onChangeText={text => props.handleChangeText(text)}
                secureTextEntry={props.secureTextEntry != undefined ? props.secureTextEntry : false}
                containerStyle={{
                    height: 70
                }}
                rightIcon={() => {
                    if (props.icon != undefined) {
                        return (
                            <Icon
                                type='material-community'
                                name={props.icon}
                                color='black'
                                onPress={() => { props.changeTextVisibility != undefined ? props.changeTextVisibility() : null; }}
                            />
                        );
                    } else {
                        return <></>;
                    }
                }}
            />
            {errorVisible === true ? <Text style={[style.errorLabel, { textAlign: props.textAlign, paddingLeft: props.textAlign == 'left' ? 9 : 0 }]}>Este campo es obligatorio</Text> : <></>}
        </View>
    );
}

const style = StyleSheet.create({
    mainContainer: {
        marginVertical: 13
    },
    errorLabel: {
        marginTop: 3,
        color: 'red'
    }
});