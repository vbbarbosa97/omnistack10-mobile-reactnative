import React, {useState,useEffect} from 'react';
import { requestPermissionsAsync, getCurrentPositionAsync} from 'expo-location';
import {Marker, Callout} from 'react-native-maps';
import {MaterialIcons} from '@expo/vector-icons';

import api from '../../services/api';
import {connect, disconnect, subscribeToNewDevs} from '../../services/socket';

import {
    ViewMap,
    DevImage,
    DevInfo,
    DevName,
    DevBio,
    DevTechs,
    SearchDev,
    SearchInput,
    SearchButton,
} from './styles';

export default function Main({ navigation }){
    const [devs, setDevs] = useState([]);
    const [currentRegion, setCurrentRegion] = useState(null);
    const [techs, setTechs] = useState('');

    useEffect(() => {
        async function loadInitialPosition(){
            const {granted} = await requestPermissionsAsync();
            
            if(granted){
                const {coords} = await getCurrentPositionAsync({
                    enableHighAccuracy: true,
                });

                const {latitude, longitude} = coords;

                setCurrentRegion({
                    latitude,
                    longitude,
                    latitudeDelta: 0.04,
                    longitudeDelta: 0.04,
                });
            }
        }

        loadInitialPosition(); 
    }, []);

    //ouve o estado de devs e chama a funcao que tras o dev no raio de 10km pelo socket
    useEffect(() => {
        subscribeToNewDevs( dev => setDevs([...devs, dev]) );
    },[devs]);

    function setupWebsocket(){
        disconnect();
        
        const {latitude, longitude} = currentRegion;

        connect(
            latitude,
            longitude,
            techs
        );
    }

    async function loadDevs(){
        const {latitude, longitude} = currentRegion;

        const response = await api.get('/search', {
            params: {
                latitude,
                longitude,
                techs
            }
        });

        setDevs(response.data); 
        setupWebsocket();
    }


    function handleRegionChanged(region){
        setCurrentRegion(region);
    }

    if(!currentRegion){
        return null;
    }

    return (
        <>
            <ViewMap 
                onRegionChangeComplete={handleRegionChanged}
                initialRegion={currentRegion} 
            >
                {
                    devs.map(dev => (
                        <Marker 
                            key={dev._id}
                            coordinate={{
                                longitude: dev.location.coordinates[0],
                                latitude: dev.location.coordinates[1] 
                            }} 
                        >
                            <DevImage source={{ uri: dev.avatar_url }} />
                            <Callout onPress={() => {
                                navigation.navigate('Profile',{github_username: dev.github_username } )
                            }}>
                                <DevInfo>
                                    <DevName>{dev.name} </DevName>
                                    <DevBio>{dev.bio}</DevBio>
                                    <DevTechs>{dev.techs.join(', ')}</DevTechs>
                                </DevInfo>
                            </Callout>
                        </Marker>
                    ))
                }

            </ViewMap>

            <SearchDev>
                <SearchInput 
                    placeholder="Buscar devs por techs..."
                    placeholderTextColor= "#999"
                    autoCapitalize= "words"
                    autoCorrect={false}
                    value={techs}
                    onChangeText={setTechs}
                />
                <SearchButton onPress={loadDevs}>
                    <MaterialIcons name="my-location" size={20} color="#FFF" />
                </SearchButton>
            </SearchDev>
        </>
     
    );
}
