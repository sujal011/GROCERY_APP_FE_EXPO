import { Colors, Fonts } from '@/utils/Constants';
import { FC } from 'react';
import { StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native'
import CustomText from './CustomText';

interface CustomButtonProps {
  title:string;
  disabled?:boolean;
  loading?:boolean;
  onPress:()=>void;
}

const CustomButton:FC<CustomButtonProps> = ({title,onPress,loading,disabled,...props}:CustomButtonProps) => {
  return (
    <TouchableOpacity 
    onPress={onPress} 
    disabled={disabled}
    style={[styles.btn,{
        backgroundColor:disabled ? Colors.disabled : Colors.primary
    }]} 
    >
      {
        loading ? <ActivityIndicator size="small" color="#fff" /> : 
        <CustomText style={styles.text} variant="h6" fontFamily={Fonts.SemiBold}>
            {title}
        </CustomText>
      }
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  btn:{
    justifyContent:'center',
    alignItems:'center',
    borderRadius:10,
    padding:15,
    marginBottom:15,
    width:'100%',
  },
  text:{
    color:"#fff"
  }
})

export default CustomButton