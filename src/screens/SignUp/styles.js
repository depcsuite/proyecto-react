import { Dimensions, StyleSheet } from "react-native";

const style = StyleSheet.create({
    personContainer: {
        paddingTop: 0,
        paddingBottom: 30,
        backgroundColor: 'rgba(0,0,0,0.4)'
    },
    person: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 200,
        alignSelf: 'center',
    },
    mainContainer: {
        paddingBottom: 50,
        backgroundColor: 'rgba(0,0,0,0.4)',
        paddingHorizontal: 20
    },
    containerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    inputRow: {
        width: '49%'
    },
    btnRegistrarse: {
        backgroundColor: '#E4222C',
        alignSelf: 'center',
        paddingVertical: 10,
        width: Dimensions.get('screen').width - 40,
        borderRadius: 8
    },
    btnRegistroText: {
        color: 'white',
        alignSelf: 'center',
        fontSize: 18
    },
});

export default style;