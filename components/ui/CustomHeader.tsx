import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Colors, Fonts } from '@/utils/Constants'
import Ionicons from "@expo/vector-icons/Ionicons"
import { RFValue } from 'react-native-responsive-fontsize'
import { useRouter } from 'expo-router'
import CustomText from './CustomText'
import Feather from '@expo/vector-icons/Feather'
const CustomHeader = ({title,search}:{title:string,search?:boolean}) => {
  const router = useRouter()
  return (
    <SafeAreaView>
     <View style={styles.flexRow}>
      <Pressable onPress={()=> router.back()}>
      <Ionicons name='chevron-back' color={Colors.text} size={RFValue(16)}/>
      </Pressable>
      <CustomText
        style={styles.text}
        variant='h5'
        fontFamily={Fonts.SemiBold}
      >
        {title}
      </CustomText>
      <View>
        {
          search && (
            <Feather name="search" size={RFValue(16)} color={Colors.text} />
          )
        }
      </View>
      </View>
    </SafeAreaView>
  )
}

export default CustomHeader

const styles = StyleSheet.create({
  flexRow:{
    justifyContent:'space-between',
    padding:10,
    height:60,
    flexDirection:'row',
    alignItems:'center',
    backgroundColor:'white',
    borderBottomWidth: 0.6,
    borderColor:Colors.border
  },
  text:{
    textAlign:'center'
  }
})