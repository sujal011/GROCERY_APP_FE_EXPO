import { View, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native'
import React from 'react'
import { Colors, Fonts } from '@/utils/Constants';
import CustomText from './CustomText';
import { screenWidth } from '@/utils/Scaling';
import { RFValue } from 'react-native-responsive-fontsize';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

interface ArrowButtonProps {
    title: string;
    onPress?: () => void;
    price?:number;
    loading?:boolean
}

const ArrowButton = ({title,loading,onPress,price}:ArrowButtonProps) => {
  return (
    <TouchableOpacity
    activeOpacity={0.7}
    disabled={loading}
    onPress={onPress}
    style={[styles.btn,
        {justifyContent: price!==0 ? 'space-between' : 'center'}
    ]}
    >
        {price !== 0 && price && (
            <View style={{paddingLeft:7}}>
                <CustomText
                fontSize={11}
                style={{color:"white"}}
                fontFamily={Fonts.Medium}
                >
                    ₹{price+34}.0
                </CustomText>
                <CustomText
                fontSize={8}
                style={{color:"white"}}
                fontFamily={Fonts.Medium}
                >
                    TOTAL
                </CustomText>
            </View>
        )}
        <View style={styles.flexRow}>
        <CustomText
        style={{color:"white"}}
        fontFamily={Fonts.Medium}
        fontSize={RFValue(9)}
        >
            {title}
        </CustomText>
        {
            loading?(
                <ActivityIndicator 
                    color="white"
                    style={{marginHorizontal:5}}
                    size="small"
                />
            ):(
                <MaterialIcons name='arrow-right' color="#fff"  size={RFValue(23)}/>
            )
        }
        </View>
    </TouchableOpacity>
  )
}

export default ArrowButton

const styles=StyleSheet.create({
    btn:{
        backgroundColor:Colors.secondary,
        padding:10,
        marginRight:screenWidth* 0.06,
        justifyContent:'space-between',
        alignItems:'center',
        flexDirection:'row',
        borderRadius:12,
    },
    flexRow:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
    }
})