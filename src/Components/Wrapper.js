import { ImageBackground, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import BG from '../assets/images/bg.jpg'
import { deviceHeight, deviceWidth } from '../constants/Scalling'
const Wrapper = ({children,style}) => {
  return (
    <ImageBackground source={BG} resizeMode='cover' style>
      <SafeAreaView style={[styles.safeArea,{...style}]}>
      {children}
      </SafeAreaView>
    </ImageBackground>
  )
}

export default Wrapper

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    safeArea:{
        width:deviceWidth,
        height:deviceHeight
    }
})