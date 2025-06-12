import {
  Platform,
  StyleSheet,
  Animated as RNAnimated,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useRef } from "react";
import { NoticeHeight, screenHeight } from "@/utils/Scaling";
import {
  CollapsibleContainer,
  CollapsibleScrollView,
  CollapsibleHeaderContainer,
  withCollapsibleContext,
  useCollapsibleContext,
} from "@r0b0t3d/react-native-collapsible";
import NoticeAnimation from "@/components/dashboard/NoticeAnimation";
import Visuals from "@/components/dashboard/Visuals";
import Feather from "@expo/vector-icons/Feather";
import CustomText from "@/components/ui/CustomText";
import { Fonts } from "@/utils/Constants";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { RFValue } from "react-native-responsive-fontsize";
import AnimatedHeader from "@/components/dashboard/AnimatedHeader";
import Content from "@/components/dashboard/Content";
import StickySearchBar from "@/components/dashboard/StickySearchBar";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const NOTICE_HEIGHT = -(NoticeHeight + 12);

function ProductDashboard() {
  const noticePosition = useRef(new RNAnimated.Value(NOTICE_HEIGHT)).current;

  const { scrollY, expand } = useCollapsibleContext();
  const previousScrollY = useRef<number>(0);

  const backToTopStyle = useAnimatedStyle(() => {
    const isScrollingUp =
      scrollY.value < previousScrollY.current && scrollY.value > 100;
    const opacity = withTiming(isScrollingUp ? 1 : 0, { duration: 300 });
    const translateY = withTiming(isScrollingUp ? 0 : 10, { duration: 300 });

    previousScrollY.current = scrollY.value;
    return {
      opacity,
      transform: [{ translateY }],
    };
  });

  function slideUp() {
    RNAnimated.timing(noticePosition, {
      toValue: NOTICE_HEIGHT,
      duration: 800,
      useNativeDriver: false,
    }).start();
  }
  function slideDown() {
    RNAnimated.timing(noticePosition, {
      toValue: 0,
      duration: 800,
      useNativeDriver: false,
    }).start();
  }

  useEffect(()=>{
    slideDown()
    const timeoutId = setTimeout(()=>{
        slideUp()
        },3500)
    return ()=> clearTimeout(timeoutId)
  },[])

  const insets = useSafeAreaInsets()

  
  return (
    <NoticeAnimation noticePosition={noticePosition}>
      <>
        <Visuals />

        <Animated.View style={[styles.backToTopButton, backToTopStyle]}>
          <TouchableOpacity
            onPress={() => {
              scrollY.value = 0;
              expand();
            }}
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 6,
            }}
          >
            <Feather name="arrow-up" size={RFValue(13)} color="white" />
            <CustomText
              fontSize={RFValue(8)}
              style={{ color: "white" }}
              fontFamily={Fonts.SemiBold}
            >
              Back to top
            </CustomText>
          </TouchableOpacity>
        </Animated.View>
        <CollapsibleContainer style={[styles.panelContainer,{marginTop:insets.top || 20}]}>
        <CollapsibleHeaderContainer containerStyle={styles.transparent}>
        <AnimatedHeader 
            showNotice={()=>{
                slideDown()
                const timeoutId = setTimeout(()=>{
                    slideUp()
                },3500)
                return ()=> clearTimeout(timeoutId)
            }}
        />
        <StickySearchBar/>
        </CollapsibleHeaderContainer>
        
        <CollapsibleScrollView nestedScrollEnabled 
            style={styles.panelContainer}
            showsVerticalScrollIndicator={false}
        >

            <Content />
            {/* <View style={{backgroundColor:"#f8f8f8",padding:20}}>
                <CustomText
                fontSize={RFValue(32)}
                fontFamily={Fonts.Bold}
                style={{opacity:0.2}}
                >
                    Grocery Delivery App 🛒
                </CustomText>
                <CustomText
                    fontFamily={Fonts.Bold}
                    style={{marginTop:10,paddingBottom:100,opacity:0.2}}
                >
                    Developed By 🤍 Sujal Bhavsar
                </CustomText>
            </View> */}
        
        </CollapsibleScrollView>
        </CollapsibleContainer>
      </>
    </NoticeAnimation>
  );
}

const styles = StyleSheet.create({
  panelContainer: {
    flex: 1,
  },
  transparent: {
    backgroundColor: "transparent",
  },
  backToTopButton: {
    position: "absolute",
    alignSelf: "center",
    bottom: Platform.OS === "ios" ? screenHeight * 0.18 : 100,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "black",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    zIndex: 30000,
  },
});

export default withCollapsibleContext(ProductDashboard);
