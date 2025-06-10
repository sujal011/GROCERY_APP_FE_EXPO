import { deliveryPartnerLogin } from "@/services/authService";
import { screenHeight } from "@/utils/Scaling";
import { router } from "expo-router";
import { useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import LottieView from 'lottie-react-native'
import CustomText from "@/components/ui/CustomText";
import CustomButton from "@/components/ui/CustomButton";
import { Fonts } from "@/utils/Constants";
import CustomInput from "@/components/ui/CustomInput";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { RFValue } from "react-native-responsive-fontsize";

export default function DeliveryPartnerLogin() {
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [loading,setLoading] = useState(false)
  const [success,setSuccess] = useState('')
  const [showPassword,setShowPassword] = useState(false)

  const handleLogin = async () => {
    setLoading(true)
    try{
      await deliveryPartnerLogin(email,password)
      router.replace('/DeliveryDashboard')
    }catch(error:any){
      Alert.alert("Login Failed",error.message)
    }finally{
      setLoading(false)
    }
  }

  return (
    <SafeAreaView style={{}}>
      <ScrollView keyboardShouldPersistTaps='handled' keyboardDismissMode='on-drag'>
        <View style={styles.container}>
          <View style={styles.lottieContainer}>
            <LottieView  
            autoPlay 
            loop 
            style={styles.lottie} 
            source={require('@/assets/animations/delivery_man.json')}
            hardwareAccelerationAndroid
            />
          </View>
          <CustomText variant="h3" fontFamily={Fonts.Bold} >
            Delivery Partner Portal
          </CustomText>
          <CustomText variant="h6" fontFamily={Fonts.Bold} style={styles.text} >
            Faster than FLash
          </CustomText>
          <CustomInput
            inputMode="email"
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            left={
              <MaterialIcons name="email" size={RFValue(18)} color="#F8890E" style={{marginLeft:10}}/>
            }
          />
          <CustomInput 
            value={password}
            onChangeText={setPassword}
            placeholder="Password"
            left={
              <MaterialIcons name="lock" size={RFValue(18)} color="#F8890E" style={{marginLeft:10}}/>
            }
            secureTextEntry
          />

          <CustomButton 
            disabled={loading || email.length === 0 || password.length< 6}
            title="Login"
            onPress={handleLogin}
            loading={loading}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    padding:20,
    alignItems:'center',
  },
  lottie:{
    height:'100%',
    width:'100%',
  },
  lottieContainer:{
    height: screenHeight * 0.12,
    width:'100%',
  },
  text:{
    marginTop:2,
    marginBottom:25,
    opacity:0.8,
  }
})