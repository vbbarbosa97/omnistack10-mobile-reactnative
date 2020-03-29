import styled from 'styled-components/native';

import MapView from 'react-native-maps';

export const ViewMap = styled(MapView)`
    flex: 1;
`;

export const DevImage = styled.Image`
    width: 54px;
    height: 54px;
    border-radius: 4px;
    border-width: 4px;
    border-color: #fff;
`;

export const DevInfo = styled.View`
    width: 260px;
`;

export const DevName = styled.Text`
    font-weight: bold;
    font-size: 16px;
`;

export const DevBio = styled.Text`
    color: #666;
    margin-top: 5px;
`;

export const DevTechs = styled.Text`
    margin-top: 5px;
`;

export const SearchDev = styled.View`
    position: absolute;
    top: 20px;
    left: 20px;
    right: 20px;
    z-index: 5;
    flex-direction: row;
`;

export const SearchInput = styled.TextInput`
    flex: 1px;
    height: 50px;
    background-color: #FFF;
    color: #333;
    border-radius: 25px;
    font-size: 16px;
    padding: 0 20px;
    elevation: 2;

`;

export const SearchButton = styled.TouchableOpacity`
    width: 50px;
    height: 50px;
    border-radius: 25px;
    background-color: #8d4eff;
    justify-content: center;
    align-items: center;
    margin-left: 15px;
`;