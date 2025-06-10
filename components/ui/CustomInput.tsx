import { View, Text, StyleSheet, TouchableOpacity, TextInput, TextInputProps } from 'react-native'
import AntDesign from '@expo/vector-icons/AntDesign';
import { RFValue } from 'react-native-responsive-fontsize';
import { FC } from 'react';
import { Colors, Fonts } from '@/utils/Constants';

interface InputProps {
    left: React.ReactNode;
    right?: boolean;
    onClear?: () => void;
}


const CustomInput: FC<InputProps & TextInputProps> = ({left, right, onClear, value, ...props}) => {
  return (
    <View style={styles.flexRow}>
      {left}
      <TextInput 
        {...props} 
        value={value}
        style={styles.inputContainer} 
        placeholderTextColor="#ccc"
      />
      <View style={styles.icon}>
        {value && value.length > 0 && right && (
          <TouchableOpacity onPress={onClear}>
            <AntDesign name="closecircle" size={RFValue(16)} color="#ccc" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    inputContainer: {
        width:'70%',
        fontFamily:Fonts.SemiBold,
        fontSize:RFValue(14),
        paddingVertical: 10,
        paddingBottom:10,
        height:'100%',
        color:Colors.text,
        bottom:-1
    },
    icon: {
      width:'5%',
      justifyContent:'center',
      alignItems:'center',
      marginRight:10,
    },
    text:{
        width:'10%',
        marginLeft:10
    },
    flexRow:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        borderRadius:10,
        borderWidth:0.5,
        width:'100%',
        marginVertical:10,
        backgroundColor:"#fff",
        shadowOffset:{width:1,height:1},
        shadowOpacity:0.6,
        shadowRadius:2,
        shadowColor:Colors.border,
        borderColor:Colors.border,
    }
  })

export default CustomInput