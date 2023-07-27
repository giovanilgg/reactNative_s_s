import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {accelerometer} from 'react-native-sensors';
import {map} from 'rxjs/operators';

const Sensores = () => {
  
  const [positionStatus, setPositionStatus] = useState('Unknown');
  useEffect(() => {
  
    const subscription = accelerometer
      .pipe( //creamos un pipe para modificar la salida 
        map(({x, y}) => {
          // Determinar si la posición es vertical o horizontal
          return Math.abs(x) > Math.abs(y) ? 'Horizontal' : 'Vertical';
        }),
      )
      .subscribe(status => {
        //asignamos la posicion al state
        setPositionStatus(status);
      });

    //quitamos el subscription 
     return () => subscription.unsubscribe();
  }, []);

  return (
    <View>
      <Text style={styled.title}>Orientación del Telefono:{ positionStatus}</Text>
     
     
    </View>
  );
};
const styled = StyleSheet.create({
  title: {
    textAlign: 'center',
    marginTop: 30,
    fontWeight: 'bold',
  }
});
export default Sensores;
