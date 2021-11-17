import { Dimensions, StyleSheet } from 'react-native';

const style = StyleSheet.create({
    container: {
        justifyContent: 'center',
    },
    inputIconRight: {
        marginEnd: 0,
        width: 50
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
    btnLogin: {
        backgroundColor: '#E4222C',
        alignSelf: 'center',
        paddingVertical: 10,
        width: Dimensions.get('screen').width - 40,
        borderRadius: 8
    },
    btnLoginText: {
        color: 'white',
        alignSelf: 'center',
        fontSize: 18
    },
    containerRegistro: {
        flexDirection: 'row',
        alignSelf: 'center',
        marginTop: 20
    },
    textRegistro: {
        color: 'white',
        fontSize: 14,
    }
});

export default style;