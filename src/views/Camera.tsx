
import {useIsFocused} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {useRef} from 'react';
import {
  Pressable,
  Text,
  View,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Camera, useCameraDevices} from 'react-native-vision-camera';


const CameraComponent = () => {
 
  //reference of the camera component
  const camera = useRef<Camera>(null);
  const devices = useCameraDevices();
  //while the camera is visible
  const isFocused = useIsFocused();
  //back camera
  const device: any = devices.back;
  
  useEffect(() => {
    givePermissions();
  }, []);

  const givePermissions = async () => {
    try {
      const newCameraPermission = await Camera.requestCameraPermission();
      const newMicrophonePermission =
        await Camera.requestMicrophonePermission();
      console.log(newCameraPermission, newMicrophonePermission);
      if (
        [newCameraPermission, newMicrophonePermission].includes('authorized')
      ) {
        console.log('permission granted');
      } else {
        console.log('permission denied');
      }
    } catch (error) {
      console.log(error);
    }
  };
  //take a photo
  const handleTakePhoto = async ():Promise<void>=> {
    try {
      if (!camera) return;
      const photo =  await camera?.current?.takePhoto({
        flash: 'on',
      })

      console.log('Url foto', photo?.path);
    } catch (error) {
      console.error('No se pudo tomar la foto', error);
    }
  };
  //recordVideo
  const recordVideo = async():Promise<void> => {
   if(!camera) return
   try {
   const video= await camera?.current?.startRecording({
      flash: 'on',
      onRecordingFinished: (video) => console.log(video),
      onRecordingError: (error) => console.error(error),
    })
    
    
   } catch (error) {
    console.error('Hubo un error al guardar el video', error);
   }
};
  const stopRecord=async()=>{
    if(!camera) return
    try {
       await  camera?.current?.stopRecording()
    } catch (error) {
      console.log(error)
    }
   
  }
  if (device == null) return <ActivityIndicator />;
  return (
    <View style={styled.viewCamera}>
      <Camera
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={isFocused}
        photo={true}
        video={true}
        ref={camera}
        enableZoomGesture={true}

      />
      <TouchableOpacity style={styled.btnTakePhoto} onPress={() => handleTakePhoto()}>
        <Text style={styled.btnTakePhotoText}>Take Photo</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styled.btnTakeRecordVideo} onPress={() => recordVideo()}>
        <Text style={styled.btnTakePhotoText}>Take Record</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styled.btnTakeRecordVideo} onPress={() => stopRecord()}>
        <Text style={styled.btnTakePhotoText}>Stop Record</Text>
      </TouchableOpacity>
    </View>
  );
};
const styled = StyleSheet.create({
  viewCamera: {
    flex: 1,
  },
  btnTakePhoto:{
    backgroundColor:'black',
    width:90,
    borderRadius:40,
    padding:10,
    marginTop:40
  },
  btnTakePhotoText:{
   color:'white',
   textAlign:'center'
  },
  btnTakeRecordVideo:{
    backgroundColor:'red',
    width:90,
    borderRadius:40,
    padding:10,
    marginTop:40
  }
});
export default CameraComponent;
