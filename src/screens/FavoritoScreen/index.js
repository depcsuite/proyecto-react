import React, { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, Button, FlatList, Image, RefreshControl, Text, View } from 'react-native';
import { IconButton } from 'react-native-paper';
import { NO_IMAGE, REST_BASE_IMAGES } from '../../config/constants';
import { AuthContext } from '../../navigation/AuthProvider';
import { useFonts } from 'expo-font';

export default function FavoritoScreen({ navigation, route }) {

    const { auth, user, actions, data } = useContext(AuthContext);

    const { isLoggedIn } = user;

    const [loading, setLoading] = useState(true);
    const [refresh, setRefresh] = useState(true);
    const [dataFavoritos, setDataFavoritos] = useState([]);

    const [loaded] = useFonts({
        MontserratMedium: require('../../../assets/fonts/Montserrat-Medium.ttf')
    });

    useEffect(() => {
        (async () => {
            setLoading(true);
            const result = await actions.getFavoritos();
            setDataFavoritos(result);
            setLoading(false);
        })();
    }, [refresh]);

    function textTransform(text) {
        if (text.length >= 28) {
            return `${text.substring(0, 25)}...`;
        }
        return text;
    }

    const handleFavorito = async (item) => {
        const result = await actions.eliminarFavorito(item.id);
        if (result != null) {
            setRefresh(prevValue => !prevValue);
        }
    }

    const renderItem = ({ item }) => {
        return (
            <View style={{ flexDirection: 'row', backgroundColor: '#DDDDDD', marginHorizontal: 20, paddingVertical: 10, marginBottom: 15, paddingHorizontal: 20, borderRadius: 8, justifyContent: 'space-between' }}>
                <Image
                    source={{ uri: item.imagen_detalle != '' ? `${REST_BASE_IMAGES}${item.imagen_detalle}` : `${REST_BASE_IMAGES}${NO_IMAGE}` }}
                    style={{
                        width: 50,
                        height: 50,
                        borderRadius: 8
                    }}
                />
                <View style={{ flexDirection: 'column', alignSelf: 'center', backgroundColor: 'transparent' }}>
                    <Text style={{ fontSize: 16, lineHeight: 22, fontFamily: 'MontserratMedium' }}>{item.nombre}</Text>
                    <Text style={{ fontSize: 13, lineHeight: 17, fontFamily: data.fonts[0] }}>{textTransform(item.descr)}</Text>
                </View>
                <IconButton
                    icon={'heart'}
                    size={26}
                    color={'#000'}
                    onPress={async () => {
                        await handleFavorito(item);
                    }}
                />
            </View>
        );
    }

    const handleRefresh = () => {
        setRefresh(prevValue => !prevValue);
    }

    if (!isLoggedIn) {
        return (
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <Text>Iniciar sesión</Text>
                <Button title='Iniciar sesión' onPress={() => auth.logIn(true)} />
            </View>
        );
    } else {
        if (loading || !loaded) {
            return (
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <ActivityIndicator size={'large'} color={'#000'} />
                </View>
            );
        } else {
            return (
                <FlatList
                    data={dataFavoritos}
                    ListEmptyComponent={
                        <Text style={{ textAlign: 'center' }}>No se han encontrado favoritos.</Text>
                    }
                    horizontal={false}
                    keyExtractor={item => `${item.id}`}
                    renderItem={renderItem}
                    style={{
                        paddingTop: 20,
                        backgroundColor: 'white',
                    }}
                    refreshControl={<RefreshControl onRefresh={handleRefresh} refreshing={loading} />}
                />
            );
        }
    }
}