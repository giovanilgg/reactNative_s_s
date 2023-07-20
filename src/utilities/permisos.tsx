import {request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import Geolocation from 'react-native-geolocation-service';

function getLocation(): Promise<{latitude: number; longitude: number}> {
  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        resolve({latitude, longitude});
      },
      error => {
        reject(error);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  });
}

export const handlePermissionRequest = async () => {
  try {
    const result = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);

    if (result === RESULTS.GRANTED) {
      console.log('Permiso  concedido');
    try {
        const respuesta= await getLocation()
        return respuesta
      
    } catch (error) {
         console.log(error)
    }



    } else {
      console.log('Permiso denegado');
    }
  } catch (error) {
    console.log('Error al solicitar el permiso de ubicación:', error);
  }
};
