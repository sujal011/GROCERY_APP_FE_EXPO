import { View, StyleSheet, Image } from 'react-native'
import React from 'react'
import { Colors, Fonts } from '@/utils/Constants'
import CustomText from '@/components/ui/CustomText'
import { RFValue } from 'react-native-responsive-fontsize'
import UniversalAdd from '@/components/UniversalAdd'

const OrderItem = ({item}:{item:any}) => {

  return (
    <View style={styles.flexRow} >
        <View style={styles.imgContainer}>
            <Image source={{uri:item?.item?.image}} style={styles.img} />

        </View>
        <View style={{width:'55%'}} >
            <CustomText numberOfLines={2} fontSize={RFValue(9)} fontFamily={Fonts.Medium}>
                {item.item.name}
            </CustomText>
            <CustomText fontSize={RFValue(9)} >
                {item.item.quantity}
            </CustomText>
        </View>
        <View style={{width:'20%' , alignItems:'flex-end'}}>
            <UniversalAdd item={item.item} />
            <CustomText fontSize={RFValue(8)} fontFamily={Fonts.Medium} 
                style={{alignSelf:'flex-end',marginTop:4}}
            >
            ₹{item.count * item.item.price}
            </CustomText>
        </View>
      
    </View>
  )
}

export default OrderItem

const styles = StyleSheet.create({
    img:{
        width:40,
        height:40
    },
    imgContainer:{
        backgroundColor:Colors.backgroundSecondary,
        padding:10,
        borderRadius:15,
        width:'17%'
    },
    flexRow:{
        alignItems:'center',
        flexDirection:'row',
        gap:12,
        paddingHorizontal:10,
        paddingVertical:12,
        borderTopWidth:0.6,
        borderTopColor:Colors.border
    }
})