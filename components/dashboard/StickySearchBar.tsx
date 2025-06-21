import { Colors } from '@/utils/Constants'
import { StickyView, useCollapsibleContext } from '@r0b0t3d/react-native-collapsible'
import { StyleSheet } from 'react-native'
import Animated, { interpolate, useAnimatedStyle } from 'react-native-reanimated'
import SearchBar from './SearchBar'

export default function StickySearchBar({ onPress }: { onPress?: () => void }) {
    const {scrollY} = useCollapsibleContext()
    const animatedShaow = useAnimatedStyle(()=>{
        const opacity = interpolate(scrollY.value,[0,140],[0,1])
        return {opacity}
    })
    const backgroundColorChanges= useAnimatedStyle(()=>{
        const opacity = interpolate(scrollY.value,[1,80],[0,1])
        return {backgroundColor:`rgba(255,255,255${opacity})`}
    })

  return (
    <StickyView style={[backgroundColorChanges,{backgroundColor:'transparent'}]}>
      <SearchBar onPress={onPress} />
      <Animated.View style={[styles.shadow,animatedShaow]} />
    </StickyView>
  )
}

const styles = StyleSheet.create({
    shadow:{
        height:15,
        width:'100%',
    }
})