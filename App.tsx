import 'react-native-gesture-handler';
import React from 'react';
//Componets from ReactNative
import {Text, View} from 'react-native';
//Vector icons
import Icon from 'react-native-vector-icons/FontAwesome';
//Views from the aplication
import Profile from './src/views/Profile';
import Information from './src/views/Information';
import Maps from './src/views/Maps';
import CameraComponent from './src/views/Camera';
//Libraries from ReactNavigation
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Sensores from './src/views/Sensores';

function App(): JSX.Element {
  // Create the BottomTabNavigator for the bottom tabs
  const BottomTabNavigator = createBottomTabNavigator();
  //Views for a BottomTab
  const BottomTabNavigatorScreen = () => (
    <BottomTabNavigator.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: () => {
          let iconName: any;
          if (route.name === 'Mapas') {
            iconName = 'close';
          } else if (route.name === 'Camara') {
            iconName = 'camera';
          }else if(route.name=='Sensores'){
            iconName='adjust'
          }

          // Devuelve el icono correspondiente
          return <Icon name={iconName} size={30} color={'green'} />;
        },
      }
    
      )
      
    
    }
      
      initialRouteName="Mapas"
      
      >
      <BottomTabNavigator.Screen name="Mapas" component={Maps} />
      <BottomTabNavigator.Screen name="Camara" component={CameraComponent} />
      <BottomTabNavigator.Screen name="Sensores" component={Sensores} />
    </BottomTabNavigator.Navigator>
  );

  //Create the Drawer navigation
  const Drawer = createDrawerNavigator();
  // Views for a drawer Navigation
  const DrawerNavigatorScreen = () => (
    <Drawer.Navigator initialRouteName="Inicio">
      <Drawer.Screen name="Inicio" component={BottomTabNavigatorScreen} />
      <Drawer.Screen name="Perfil" component={Profile} />
      <Drawer.Screen name="Informacion" component={Information} />
    </Drawer.Navigator>
  );

  return (
    <NavigationContainer>
      <DrawerNavigatorScreen />
    </NavigationContainer>
  );
}

export default App;
