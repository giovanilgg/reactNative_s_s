import React from 'react'
import { Pressable, Text, View } from 'react-native'

const Camera = () => {
  const givePermissions=()=>{
    console.log('desde camara')
  }
  return (
    <View>

    <Pressable onPress={()=>givePermissions()}><Text>Usar camara</Text></Pressable>

    </View>
  )
}

export default Camera