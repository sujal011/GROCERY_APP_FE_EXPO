import { Alert, Platform, StyleSheet, Text, Animated as RNAnimated, TouchableOpacity, View, SafeAreaView } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { NoticeHeight, screenHeight } from '@/utils/Scaling'
import { 
    CollapsibleContainer,
    CollapsibleScrollView,
    CollapsibleHeaderContainer,
    withCollapsibleContext,
    useCollapsibleContext
 } from '@r0b0t3d/react-native-collapsible'
import * as Location from 'expo-location'
import { useAuthStore } from '@/state/authStore'
import { reverseGeoCode } from '@/services/mapService'
import NoticeAnimation from '@/components/dashboard/NoticeAnimation'
import Visuals from '@/components/dashboard/Visuals'
import Feather from '@expo/vector-icons/Feather';
import CustomText from '@/components/ui/CustomText'
import { Fonts } from '@/utils/Constants'
import Animated, { useAnimatedStyle, withTiming, } from 'react-native-reanimated'
import { RFValue } from 'react-native-responsive-fontsize'

const NOTICE_HEIGHT = - (NoticeHeight + 12)

function ProductDashboard() {
    const {user,setUser} = useAuthStore()
    const noticePosition = useRef(new RNAnimated.Value(NOTICE_HEIGHT)).current

    const {scrollY, expand } = useCollapsibleContext()
    const previousScrollY = useRef<number>(0)

    const backToTopStyle = useAnimatedStyle(() => {
        const isScrollingUp = scrollY.value < previousScrollY.current && scrollY.value > 100
        const opacity = withTiming(isScrollingUp ? 1 : 0, {duration:300})
        const translateY = withTiming(isScrollingUp ? 0 : 10, {duration:300})

        previousScrollY.current = scrollY.value
        return {
            opacity,
            transform:[{translateY}]
        }
    })

    function slideUp(){
        RNAnimated.timing(noticePosition,{
            toValue:NOTICE_HEIGHT,
            duration:800,
            useNativeDriver:false
        }).start()
    }
    function slideDown(){
        RNAnimated.timing(noticePosition,{
            toValue:0,
            duration:800,
            useNativeDriver:false
        }).start()
    }
    
    useEffect(() => {
        async function getCurrentLocation() {
          
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            Alert.alert('Permission to access location was denied');
            return;
          }
    
          let location = await Location.getCurrentPositionAsync({});
        reverseGeoCode(location.coords.latitude,location.coords.longitude,setUser)
        }
        getCurrentLocation();
      }, []);
    return(
        <NoticeAnimation noticePosition={noticePosition}>
            <>
            <Visuals />
            <SafeAreaView />

            <Animated.View style={[styles.backToTopButton,backToTopStyle]}>
                <TouchableOpacity
                    onPress={()=>{
                        scrollY.value = 0;
                        expand()
                    }}
                    style={{
                        flexDirection:'row',
                        alignItems:'center',
                        gap:6,
                    }}
                >
                    <Feather name='arrow-up' size={RFValue(12)} color='white'/>
                    <CustomText
                        variant='h9'
                        style={{color:'white'}}
                        fontFamily={Fonts.SemiBold}
                    >
                        Back to top
                    </CustomText>
                </TouchableOpacity>

            </Animated.View>
            </>
        </NoticeAnimation>
    )
}


const styles = StyleSheet.create({
    panelContainer:{
        flex:1,
    },
    transparent:{
        backgroundColor:'transparent',
    },
    backToTopButton:{
        position:'absolute',
        alignSelf:'center',
        top: Platform.OS === 'ios' ? screenHeight * 0.18 : 100,
        flexDirection:'row',
        alignItems:'center',
        gap:4,
        backgroundColor:'black',
        borderRadius:20,
        paddingHorizontal:10,
        paddingVertical:5,
        zIndex:1000
    }
})

export default withCollapsibleContext(ProductDashboard)