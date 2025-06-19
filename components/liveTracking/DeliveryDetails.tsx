import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Colors, Fonts } from '@/utils/Constants'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { RFValue } from 'react-native-responsive-fontsize'
import CustomText from '../ui/CustomText'

const DeliveryDetails = ({details}:{details:any}) => {
  return (
    <View style={styles.container}>
      <View style={styles.flexRow}>
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons name='bike-fast' color={Colors.disabled} size={RFValue(18)} />
        </View>
        <View>
          <CustomText fontSize={RFValue(10)} fontFamily={Fonts.SemiBold}>
            Your delivery details
          </CustomText>
          <CustomText fontSize={RFValue(7.5)} fontFamily={Fonts.Medium}>
            Details of your current order
          </CustomText>
        </View>

      </View>
      <View style={styles.flexRow2}>
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons name='map-marker-outline' color={Colors.disabled} size={RFValue(18)} />
        </View>
        <View style={{width:'80%'}}>
          <CustomText fontSize={RFValue(9)} fontFamily={Fonts.Medium}>
            Delivery at Home
          </CustomText>
          <CustomText fontSize={RFValue(8)} fontFamily={Fonts.Regular} numberOfLines={2}>
            {details?.address || '-----'}
          </CustomText>
        </View>
      </View>
      <View style={styles.flexRow2}>
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons name='phone-outline' color={Colors.disabled} size={RFValue(18)} />
        </View> 
        <View style={{width:'80%'}}>
          <CustomText fontSize={RFValue(9)} fontFamily={Fonts.Medium}>
            {details?.name || '--'} {details?.phone || 'XXXXXXXX'}
          </CustomText>
          <CustomText fontSize={RFValue(8)} numberOfLines={2} fontFamily={Fonts.Medium}>
            Receiver&apos;s contact no.
          </CustomText>
        </View>

      </View>
    </View>
  )
}

export default DeliveryDetails

const styles = StyleSheet.create({
  container:{
    width:"100%",
    borderRadius:15,
    marginVertical:15,
    paddingVertical:10,
    backgroundColor:'#fff'
  },
  flexRow:{
    flexDirection:'row',
    alignItems:'center',
    gap:10,
    borderBottomWidth:0.7,
    borderColor:Colors.border,
    padding:7
  },
  flexRow2:{
    flexDirection:'row',
    alignItems:'center',
    gap:10,
    padding:10
  },
  iconContainer:{
    backgroundColor:Colors.backgroundSecondary,
    borderRadius:100,
    padding:10,
    justifyContent:"center",
    alignItems:'center'
  }
})