import { Alert, Platform, StyleSheet, TouchableOpacity, View } from 'react-native'
import CustomText from '../ui/CustomText'
import { Fonts } from '@/utils/Constants'
import { RFValue } from 'react-native-responsive-fontsize'
import Octicons from '@expo/vector-icons/Octicons';
import { useAuthStore } from '@/state/authStore';
import { useRouter } from 'expo-router';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { screenHeight } from '@/utils/Scaling';
import { useEffect } from 'react';
import * as Location from "expo-location"
import { reverseGeoCode } from '@/services/mapService';

export default function Header({showNotice}:{showNotice:()=>void}) {
    const {user,setUser} = useAuthStore();
    const router = useRouter()

    useEffect(() => {
    async function getCurrentLocation() {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      reverseGeoCode(
        location.coords.latitude,
        location.coords.longitude,
        setUser
      );
    }
    getCurrentLocation();
  }, []);
  return (
    <View style={styles.subContainer}>
        <TouchableOpacity activeOpacity={0.8} >
            <CustomText
                fontFamily={Fonts.Bold} 
                fontSize={RFValue(10)}
                style={styles.text}
            >
                Delivery In
            </CustomText> 
            <View style={styles.flexRow}>
                <CustomText fontFamily={Fonts.SemiBold} fontSize={RFValue(15)} style={styles.text}>
                        15 minutes
                </CustomText>
                <TouchableOpacity style={styles.noticeButton} onPress={showNotice}>
                    <CustomText
                        fontSize={RFValue(8)}
                        fontFamily={Fonts.SemiBold}
                        style={{color:'#384886'}}
                    >
                        🌧️ Rain
                    </CustomText>

                </TouchableOpacity>
            </View>            <View style={[styles.flexRow, {marginTop: 2}]}>
                <CustomText 
                 fontSize={(RFValue(9))}
                 numberOfLines={1} 
                 fontFamily={Fonts.Medium}
                 style={styles.text}
                 >
                    {user?.address || 'Knowhere. Somewhere'}
                </CustomText>
                <Octicons 
                name="triangle-down" 
                size={RFValue(20)} 
                color="#fff" 
                style={{bottom:-1, marginLeft: 4}}
                />

            </View>

        </TouchableOpacity>
        <TouchableOpacity onPress={()=>router.push("/Profile")}>

            <MaterialCommunityIcons name="account-circle-outline" size={RFValue(36)} color="#fff" />
        </TouchableOpacity>
     </View>
  )
}

const styles = StyleSheet.create({
    text:{
        color:'#FFF'
    },
    text2:{
        color:'#fff',
        width: '90%',
        textAlign: 'center'
    },    
    flexRow:{
        justifyContent:'flex-start',
        alignItems:'center',
        flexDirection:'row',
        gap:2,
        width:'auto',
    },
    subContainer:{
        flexDirection:'row',
        alignItems:'flex-start',
        paddingHorizontal: 10,
        paddingTop: 12,
        justifyContent:'space-between',
    },
    flexRowGap:{
        flexDirection:'row',
        alignItems:'center',
        gap:5
    },
    noticeButton:{
        backgroundColor:'#E8EAf5',
        borderRadius:100,
        paddingHorizontal:8,
        paddingVertical:2,
        marginLeft: 4
    }
})