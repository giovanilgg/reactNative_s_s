import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
//maps
import MapView, {Marker, Polyline} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import {API_KEY} from '@env';
//locations
import {handlePermissionRequest} from '../utilities/permisos';
//images
const profileImage= require('../../assets/img/persona.png')


const Maps = () => {

  const [initialLocation, setInicialLocation] = useState<{
    latitude: number;
    longitude: number;
  }>({latitude: 20.4144477, longitude: -97.952619});
  const [destinationLocation, setDestintationLocation] = useState<{
    latitude: number;
    longitude: number;
  }>({latitude: 29.4092523, longitude: -98.9609438});

  //Permission from the ubication and get lattitude,longitud
  useEffect(() => {
    const getData = async () => {
      const data = (await handlePermissionRequest()) || {
        latitude: 19.4144477,
        longitude: -98.952619,
      };
      setInicialLocation(data);
    };
    getData();
  }, []);

  return (
    <View>
      <MapView
        style={styled.map}
        initialRegion={{
          latitude: initialLocation?.latitude,
          longitude: initialLocation?.longitude,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}>
        <Marker
          image={profileImage}
          draggable
          coordinate={initialLocation}
          onDragEnd={ubication =>
            setInicialLocation(ubication.nativeEvent.coordinate)
          }
        />
        <Marker
          draggable
          coordinate={destinationLocation}
          onDragEnd={ubication =>
            setDestintationLocation(ubication.nativeEvent.coordinate)
          }
        />
        <Polyline
          coordinates={[initialLocation, destinationLocation]}
          strokeColor="violet"
          strokeWidth={1}
        />
        <MapViewDirections
          origin={initialLocation}
          destination={destinationLocation}
          apikey={API_KEY}
          strokeColor='blue'
          strokeWidth={7}
        />
      </MapView>
    </View>
  );
};
const styled = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%',
  },
});

export default Maps;
