import { useCollapsibleContext } from '@r0b0t3d/react-native-collapsible'
import Animated, { interpolate, useAnimatedStyle } from 'react-native-reanimated'
import Header from './Header'

export default function AnimatedHeader({showNotice}:{showNotice:()=> void}) {
    const {scrollY} = useCollapsibleContext()

    const headerAnimatedStyle = useAnimatedStyle(()=>{
        const opacity = interpolate(
            scrollY.value,
            [0,120],
            [1,0]
        ) 
        return {opacity}
    })
  return (
    <Animated.View style={headerAnimatedStyle}>
      <Header showNotice={showNotice}/>
    </Animated.View>
  )
}
