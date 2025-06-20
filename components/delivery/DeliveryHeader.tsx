import { View,StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors, Fonts } from '@/utils/Constants'
import CustomText from '../ui/CustomText'
import { RFValue } from 'react-native-responsive-fontsize'
import { useRouter } from 'expo-router'
import { Storage, tokenStorage } from '@/state/storage'
import { useAuthStore } from '@/state/authStore'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const DeliveryHeader = ({name,email}:{name:string,email:string}) => {
    const router = useRouter();
    const {logout } = useAuthStore();
    const insets = useSafeAreaInsets();
  return (
    <View style={[styles.flexRow, {paddingTop: insets.top+5,paddingBottom:12}]}>
        <View style={styles.imgContainer}>
            <Image 
                source={require('@/assets/images/delivery_boy.png')}
                style={styles.img}
            />
        </View>
        <View style={styles.infoContainer}>
            <CustomText fontSize={RFValue(15)} fontFamily={Fonts.SemiBold}>
                Hello {name}!
            </CustomText>
            <CustomText fontSize={RFValue(9)} fontFamily={Fonts.Medium}>
                {email}
            </CustomText>
        </View>
        <TouchableOpacity
            onPress={()=>{
                router.replace('/CustomerLogin')
                logout()
                tokenStorage.clearAll()
                Storage.clearAll()
            }}
        >
            <MaterialCommunityIcons
                name='logout'
                size={30}
                color="black" />

        </TouchableOpacity>
    </View>
  )
}

export default DeliveryHeader

const styles = StyleSheet.create({
    flexRow: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        padding: 10,
    },
    imgContainer: {
        padding: 4,
        borderRadius: 100,
        height: 60,
        width: 60,
        overflow: 'hidden',
        backgroundColor: Colors.backgroundSecondary,
    },
    img: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
        bottom: -8,
    },
    infoContainer: {
        width: '70%',
    },
})