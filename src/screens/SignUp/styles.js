import { StyleSheet } from "react-native";

const style = StyleSheet.create({
    personContainer: {
        paddingVertical: 50,
        backgroundColor: '#EDEDED'
    },
    person: {
        backgroundColor: 'white',
        padding: 27,
        borderRadius: 200,
        alignSelf: 'center',
        borderColor: '#B2B1B9',
        borderWidth: 2
    },
    mainContainer: {
        marginBottom: 50,
        backgroundColor: '#EDEDED',
        paddingHorizontal: 20
    },
    containerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    inputRow: {
        width: '49%'
    }
});

export default style;