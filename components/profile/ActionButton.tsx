import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons'
import { Colors, Fonts } from '@/utils/Constants'
import { RFValue } from 'react-native-responsive-fontsize'
import CustomText from '../ui/CustomText'

interface ActionButtonProps{
    icon:string;
    label:string;
    onPress?:()=>void;
}


const ActionButton = ({icon,label,onPress}:ActionButtonProps) => {
  return (
    <TouchableOpacity style={styles.btn}>
        <View style={styles.iconContainer}>
            <Ionicons name={icon} color={Colors.text} size={RFValue(12)} />
        </View>
        <CustomText fontSize={7} fontFamily={Fonts.Medium}>
            {label}
        </CustomText>
    </TouchableOpacity>
  )
}

export default ActionButton

const styles = StyleSheet.create({
    btn: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginVertical: 10,
    },
    iconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8,
        borderRadius: 100,
        backgroundColor: Colors.backgroundSecondary,
    },
});