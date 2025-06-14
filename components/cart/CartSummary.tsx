import { View, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { screenHeight, screenWidth } from '@/utils/Scaling';
import { Colors, Fonts } from '@/utils/Constants';
import CustomText from '../ui/CustomText';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { RFValue } from 'react-native-responsive-fontsize';
import { useRouter } from 'expo-router';

interface CartSummmaryProps{
  cartCount:number;
  cartImage:string
}

const CartSummary = ({cartCount,cartImage}:CartSummmaryProps) => {
  const router = useRouter()
  return (
    <View style={styles.container} >
      <View style={styles.flexRowGap}>
        <Image 
          source={
            cartImage === null 
            ? require('@/assets/icons/bucket.png')
            :{
              uri:cartImage
            }
          }
          style={styles.image}
        />
        <CustomText 
        fontSize={RFValue(10)}
        fontFamily={Fonts.SemiBold}
        >
          {cartCount} ITEM{cartCount>1?'S':''}
        </CustomText>
        <CustomText>
          <MaterialIcons 
            name='arrow-drop-up'
            color={Colors.secondary}
            size={RFValue(23)}
          />
        </CustomText>
      </View>

      <TouchableOpacity 
      style={styles.btn}
      activeOpacity={0.7}
      onPress={()=> router.push('/OrderPage')}
      >
        <CustomText
        style={styles.btnText}
        fontFamily={Fonts.Medium}
        fontSize={RFValue(11)}
        >
          Next
        </CustomText>
        <CustomText>
          <MaterialIcons name='arrow-right' color="#fff" size={RFValue(24)} />
        </CustomText>
      </TouchableOpacity>

    </View>
  )
}

export default CartSummary

const styles= StyleSheet.create({
  container:{
    justifyContent:'space-between',
    alignItems:'center',
    flexDirection:'row',
    paddingHorizontal:screenWidth * 0.05,
    paddingBottom: screenHeight * 0.04,
    paddingTop:screenHeight * 0.014
  },
  flexRowGap:{
    alignItems:'center',
    flexDirection:'row',
    gap:screenWidth * 0.03
  },
  image:{
    width:screenWidth * 0.1,
    height: screenWidth * 0.1,
    borderRadius:screenWidth * 0.025,
    borderColor: Colors.border,
    borderWidth:1
  },
  btn:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    borderRadius:screenWidth * 0.025,
    backgroundColor:Colors.secondary,
    padding:screenWidth*0.025,
    paddingHorizontal:screenWidth*0.08,
    gap:5
  },
  btnText:{
    color:'#fff'
  }
})