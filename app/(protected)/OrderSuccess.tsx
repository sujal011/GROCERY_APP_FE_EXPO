import { View, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { useAuthStore } from '@/state/authStore'
import { screenWidth } from '@/utils/Scaling'
import { Colors, Fonts } from '@/utils/Constants'
import LottieView from 'lottie-react-native'
import CustomText from '@/components/ui/CustomText'
import { RFValue } from 'react-native-responsive-fontsize'
import { useRouter } from 'expo-router'

const OrderSuccess = () => {
    const {user} = useAuthStore()
    const router = useRouter()
    useEffect(()=>{
      const timoutId = setTimeout(()=>{
        // currentOrder && setCurrentOrder(null)
        // Clear the current order from the store
        router.replace('/LiveTracking')
      },2500)
      return ()=>clearTimeout(timoutId)
    },[])

  return (
    <View style={styles.container}>
      <LottieView 
      source={require(('@/assets/animations/confirm.json'))}
      autoPlay
      loop={false}
      duration={2000}
      speed={1}
      style={styles.lottieView}
      enableMergePathsAndroidForKitKatAndAbove
      hardwareAccelerationAndroid
      />
      <CustomText
      fontSize={RFValue(8)}
      fontFamily={Fonts.SemiBold}
      style={styles.orderPlaceText}
      >
        ORDER PLACED
      </CustomText>
      <View style={styles.deliveryContainer}>
        <CustomText
        fontSize={RFValue(12)}
        fontFamily={Fonts.SemiBold}
        style={styles.deliveryText}
        >
          Delivering to Home
        </CustomText>
        </View>
        <CustomText
        fontSize={RFValue(7.5)}
        fontFamily={Fonts.Medium}
        style={styles.addressText}
        >
          {user?.address || "No address provided"}
        </CustomText>
    </View>
  )
}

export default OrderSuccess

const styles = StyleSheet.create({
    container:{
        justifyContent:'center',
        alignItems:'center',
        flex:1,
    },
    lottieView:{
        width: screenWidth * 0.6,
        height: 150
    },
    orderPlaceText:{
      opacity: 0.4,
    },
    deliveryContainer:{
      borderBottomWidth: 2,
      paddingBottom:4,
      marginBottom:5,
      borderColor:Colors.secondary
    },
    deliveryText:{
      marginTop: 15,
      textAlign: 'center',
      borderColor: Colors.secondary,
    },
    addressText:{
      opacity:0.8,
      width:"80%",
      textAlign:'center',
      marginTop: 10,
    }
})