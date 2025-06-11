import { ColorValue, Image, StyleSheet } from 'react-native'
import React from 'react'
import { screenHeight, screenWidth } from '@/utils/Scaling'
import { useCollapsibleContext } from '@r0b0t3d/react-native-collapsible'
import Animated, { interpolate, useAnimatedStyle } from 'react-native-reanimated'
import { LinearGradient } from 'expo-linear-gradient'
import { darkWeatherColors } from '@/utils/Constants'
import LottieView from 'lottie-react-native'

const darkWeatherColorsTyped = [...darkWeatherColors] as [ColorValue, ColorValue, ...ColorValue[]];
const Visuals = () => {

    const {scrollY} = useCollapsibleContext()
    const headerAnimatedStyle = useAnimatedStyle(() => {
        const opacity = interpolate(scrollY.value,[0,120],[1,0])
        return {opacity}
    })

  return (
    <Animated.View style={[styles.container,headerAnimatedStyle]}>
      <LinearGradient colors={darkWeatherColorsTyped} style={styles.gradient}/>
      <Image source={require('@/assets/images/cloud.png')} style={styles.cloud}/>
      <LottieView 
        autoPlay
        enableMergePathsAndroidForKitKatAndAbove
        loop
        source={require('@/assets/animations/raining.json')}
        style={styles.lottie}
      />
    </Animated.View>
  )
}

export default Visuals

const styles = StyleSheet.create({
    container: {
        position: 'absolute'
    },
    lottie: {
        width: '100%',
        height: 150,
        position: 'absolute',
        transform: [{ scaleX: -1 }]
    },
    gradient: {
        width: '100%',
        height: screenHeight * 0.4,
        position: 'absolute'
    },
    cloud: {
        width: screenWidth,
        resizeMode: 'stretch',
        height: 100
    }
});