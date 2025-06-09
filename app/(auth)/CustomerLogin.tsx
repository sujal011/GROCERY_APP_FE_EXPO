import ProductSlider from "@/components/ProductSlider";
import CustomText from "@/components/ui/CustomText";
import { Colors } from "@/utils/Constants";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Animated, StyleSheet, View } from "react-native";
import { GestureHandlerRootView, PanGestureHandler, PanGestureHandlerStateChangeEvent, State } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CustomerLogin() {
  const router = useRouter();
  const [gestureSequence,setGestureSequence] = useState<string[]>([]);
  const handleGesture = (event:PanGestureHandlerStateChangeEvent) => {
   if(event.nativeEvent.state === State.END){
    const {translationX,translationY,} = event.nativeEvent;
    let direction =''
    if(Math.abs(translationX) > Math.abs(translationY)){
      direction = translationX > 0 ? 'right' : 'left';
    }else{
      direction = translationY > 0 ? 'down' : 'up';
    }
    const newSequence = [...gestureSequence,direction].slice(-6);
    setGestureSequence(newSequence);
    if(newSequence.length === 6){
      if(newSequence.join(' ') === 'up up down down left right'){
        setGestureSequence([]);
        router.navigate('/DeliveryPartnerLogin')
      }
    }
   }
  }
  return (
    <GestureHandlerRootView style={styles.container}>
    <SafeAreaView style={styles.container}>
      <ProductSlider />
      <PanGestureHandler onHandlerStateChange={handleGesture}>
        <Animated.ScrollView 
        bounces={false}
        keyboardDismissMode='on-drag'
        keyboardShouldPersistTaps='handled'
        contentContainerStyle={styles.subContainer}>

        </Animated.ScrollView>
      </PanGestureHandler>
      <View style={styles.footer}>
        <CustomText fontSize={RFValue(6)}>
          By Continuing, you agree to our Terms of Service and Privacy Policy.
        </CustomText>
      </View>
    </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  subContainer:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    marginBottom:20
  },
  footer: {
    borderTopWidth:1,
    borderColor:Colors.border,
    paddingBottom:10,
    zIndex:22,
    position:'absolute',
    bottom:0,
    justifyContent:'center',
    alignItems:'center',
    padding: 10,
    backgroundColor: "#f8f9fc",
    width:"100%",
  }
  
});