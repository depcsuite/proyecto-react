import React from 'react';
import { Dimensions, FlatList, ImageBackground, Text, View, TouchableOpacity } from 'react-native';
import style from './styles';

export default function HomeScreen({ navigation }) {

    const image = { uri: "https://reactjs.org/logo-og.png" };

    const DATA = [
        {
            id: '1a',
            title: 'Promocion 1',
            aclaracion: 'Aclaración de la promoción 1'
        },
        {
            id: '2b',
            title: 'Promocion 2',
            aclaracion: 'Aclaración de la promoción 2'
        },
        {
            id: '3c',
            title: 'Promocion 3',
            aclaracion: 'Aclaración de la promoción 3'
        },
        {
            id: '4d',
            title: 'Promocion 4',
            aclaracion: 'Aclaración de la promoción 4'
        },
        {
            id: '5e',
            title: 'Promocion 5',
            aclaracion: 'Aclaración de la promoción 5'
        },
        {
            id: '6e',
            title: 'Promocion 6',
            aclaracion: 'Aclaración de la promoción 5'
        },
        {
            id: '7e',
            title: 'Promocion 7',
            aclaracion: 'Aclaración de la promoción 5'
        }
    ];

    const renderItem = ({ item }) => (
        <TouchableOpacity
            onPress={() => { navigation.navigate('DescuentoStackNavigator', { item: item }); }}
        >
            <ImageBackground
                source={image}
                resizeMode={'cover'}
                style={{
                    width: Dimensions.get('screen').width / 3,
                    height: Dimensions.get('screen').height / 7.5,
                    marginEnd: 20,
                    flex: 1,
                    justifyContent: 'flex-end'
                }}
            >
                <View
                    style={{ backgroundColor: 'red' }}
                >
                    <Text style={{ color: 'white', width: '100%' }}>{item.title}</Text>
                    <Text style={{ color: 'white', width: '100%' }}>{item.aclaracion}</Text>
                </View>
            </ImageBackground>
        </TouchableOpacity>
    )

    // const renderItem = ({ item }) => {
    //     return (
    //         <TouchableOpacity
    //             onPress={() => { navigation.navigate('DescuentoStackNavigator', { item: item }); }}
    //         >
    //             <ImageBackground
    //                 source={image}
    //                 resizeMode={'cover'}
    //                 style={{
    //                     width: Dimensions.get('screen').width / 3,
    //                     height: Dimensions.get('screen').height / 7.5,
    //                     marginEnd: 20,
    //                     flex: 1,
    //                     justifyContent: 'flex-end'
    //                 }}
    //             >
    //                 <View
    //                     style={{ backgroundColor: 'red' }}
    //                 >
    //                     <Text style={{ color: 'white', width: '100%' }}>{item.title}</Text>
    //                     <Text style={{ color: 'white', width: '100%' }}>{item.aclaracion}</Text>
    //                 </View>
    //             </ImageBackground>
    //         </TouchableOpacity>
    //     );
    // }

    return (
        <View style={style.container}>
            <Text>Promociones</Text>
            <FlatList
                data={DATA}
                renderItem={renderItem}
                horizontal={true}
                keyExtractor={item => item.id}
            />
        </View>
    );
}