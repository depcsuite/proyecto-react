import React, { useEffect } from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import { Icon, Input } from 'react-native-elements';

export default function InputForm(props) {

    const errorVisible = props.errorVisible != undefined ? props.errorVisible : false;

    useEffect(() => { /* console.log(props.label); */ }, []);

    return (
        <View style={style.mainContainer}>
            <Input
                value={props.value}
                label={props.label}
                labelStyle={[{ fontSize: 14, color: 'white', }, props.style]}
                style={[props.style, { color: 'white' }]}
                onChangeText={text => props.handleChangeText(text)}
                secureTextEntry={props.secureTextEntry != undefined ? props.secureTextEntry : false}
                containerStyle={{
                    height: 70
                }}
                placeholderTextColor={'rgba(255,255,255,0.5)'}
                inputContainerStyle={style.inputContainerStyle}
                inputStyle={style.inputStyle}
                rightIcon={() => {
                    if (props.icon != undefined) {
                        return (
                            <Icon
                                type='material-community'
                                name={props.icon}
                                color='rgba(255,255,255,0.5)'
                                onPress={() => { props.changeTextVisibility != undefined ? props.changeTextVisibility() : null; }}
                            />
                        );
                    } else {
                        return <></>;
                    }
                }}
                rightIconContainerStyle={style.inputIconRight}
            />
            {errorVisible === true ? <Text style={[style.errorLabel, { textAlign: props.textAlign, paddingLeft: props.textAlign == 'left' ? 9 : 0 }, props.style]}>Este campo es obligatorio</Text> : <></>}
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
    },
    inputContainerStyle: {
        backgroundColor: 'rgba(0,0,0,0.4)',
        borderWidth: 1,
        borderBottomWidth: 1,
        borderColor: 'rgba(255,255,255,0.5)',
        borderRadius: 8,
        width: Dimensions.get('screen').width - 40,
        alignSelf: 'center'
    },
    inputStyle: {
        textAlignVertical: 'center',
        paddingStart: 15,
    },
    inputIconRight: {
        marginEnd: 0,
        width: 50
    },
});