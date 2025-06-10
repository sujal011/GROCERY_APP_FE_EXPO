import ProductSlider from "@/components/ProductSlider";
import CustomText from "@/components/ui/CustomText";
import { Colors, Fonts, lightColors } from "@/utils/Constants";
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Animated, Image, StyleSheet, View, ColorValue, KeyboardAvoidingView, Keyboard, Alert, TouchableOpacity } from "react-native";
import { GestureHandlerRootView, PanGestureHandler, PanGestureHandlerStateChangeEvent, State } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import CustomInput from "@/components/ui/CustomInput";
import useKeyboardOffsetHeight from "@/utils/useKeyboardOffsetHeight";
import CustomButton from "@/components/ui/CustomButton";
import { customerLogin } from "@/services/authService";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const bottomColors = [...lightColors].reverse() as [ColorValue, ColorValue, ...ColorValue[]];

export default function CustomerLogin() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [gestureSequence, setGestureSequence] = useState<string[]>([]);
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [loading,setLoading] = useState(false)
  const animatedValue = useRef(new Animated.Value(0)).current;

  const keyboardOffsetHeight = useKeyboardOffsetHeight();

  useEffect(() => {
    if(keyboardOffsetHeight=== 0){
      Animated.timing(animatedValue,{
        toValue:0,
        duration:200,
        useNativeDriver:true
      }).start()
    }else{
      Animated.timing(animatedValue,{
        toValue:-keyboardOffsetHeight*0.84,
        duration:200,
        useNativeDriver:true
      }).start()
    }
  },[keyboardOffsetHeight])

  const handleGesture = (event: PanGestureHandlerStateChangeEvent) => {
    if (event.nativeEvent.state === State.END) {
      const { translationX, translationY, } = event.nativeEvent;
      let direction = ''
      if (Math.abs(translationX) > Math.abs(translationY)) {
        direction = translationX > 0 ? 'right' : 'left';
      } else {
        direction = translationY > 0 ? 'down' : 'up';
      }
      const newSequence = [...gestureSequence, direction].slice(-6);
      setGestureSequence(newSequence);
      if (newSequence.length === 6) {
        if (newSequence.join(' ') === 'up up down down left right') {
          setGestureSequence([]);
          router.navigate('/DeliveryPartnerLogin')
        }
      }
    }
  }

  const handleLogin = async () => {
    Keyboard.dismiss()
    setLoading(true)
    try {
      await customerLogin(phoneNumber)
      router.replace('/ProductDashboard')
    }catch(error:any){
      Alert.alert("Login Failed",error.message)
    }finally{
      setLoading(false)
    }

  }
  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaView style={styles.container} edges={['top', 'bottom']}>

        <ProductSlider />
        <PanGestureHandler onHandlerStateChange={handleGesture}>
          <Animated.ScrollView
            bounces={false}
            style={{transform:[{translateY:animatedValue}]}}
            keyboardDismissMode='on-drag'
            keyboardShouldPersistTaps='handled'
            contentContainerStyle={styles.subContainer}>

            <LinearGradient colors={bottomColors} style={styles.gradient} />
              <View style={styles.content}>
                <Image source={require('@/assets/images/logo.jpeg')} style={styles.logo} />
                <CustomText variant="h2" fontFamily={Fonts.Bold} style={styles.text}>
                  Grocery Delivery App
                </CustomText>
                <CustomText variant="h5" fontFamily={Fonts.SemiBold} style={styles.text}>
                  Log in or Sign Up
                </CustomText>
                <CustomInput
                  inputMode="numeric"
                  placeholder="Enter your phone number"
                  onChangeText={(text) => setPhoneNumber(text.slice(0, 10))}
                  onClear={() => setPhoneNumber('')}
                  value={phoneNumber}
                  left={
                    <CustomText
                      variant="h6"
                      fontFamily={Fonts.SemiBold}
                      style={styles.phoneText}>
                      +91
                    </CustomText>
                  }
                />
                <CustomButton 
                  disabled={phoneNumber.length !== 10}
                  onPress={handleLogin}
                  loading={loading}
                  title="Continue"
                />
              </View>
          </Animated.ScrollView>
        </PanGestureHandler>
        <View style={[styles.footer, { paddingBottom: insets.bottom }]}>
          <CustomText fontSize={RFValue(6)}>
            By Continuing, you agree to our Terms of Service and Privacy Policy.
          </CustomText>
        </View>
        <TouchableOpacity style={styles.riderIcon} onPress={()=>router.navigate('/DeliveryPartnerLogin')}>
          <MaterialIcons name="delivery-dining" size={RFValue(35)} color="black" />
        </TouchableOpacity>
      </SafeAreaView >
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  subContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20
  },
  footer: {
    borderTopWidth: 1,
    borderColor: Colors.border,
    zIndex: 22,
    position: 'absolute',
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: "#f8f9fc",
    width: "100%",
  },
  gradient: {
    width: '100%',
    paddingTop: 60
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingBottom: 20
  },
  logo: {
    height: 50,
    width: 50,
    borderRadius: 20,
    marginBottom: 5
  },
  text: {
    opacity: 0.8,
    marginBottom: 10,
    marginTop: 2
  },
  phoneText: {
    marginLeft: 10,
  },
  riderIcon:{
    position:'absolute',
    height:65,
    width:65,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:35,
    marginTop:50,
    right: 20,
    backgroundColor:'#fff',
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 10,

    
  }

});