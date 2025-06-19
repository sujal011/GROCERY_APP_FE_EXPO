import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import { useAuthStore } from "@/state/authStore";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { RFValue } from "react-native-responsive-fontsize";
import CustomText from "../ui/CustomText";
import { Fonts } from "@/utils/Constants";

interface LiveHeaderProps {
  type: "Customer" | "Delivery";
  title: string;
  secondTitle?: string;
}

const LiveHeader = ({ title, type, secondTitle }: LiveHeaderProps) => {
  const isCustomer = type === "Customer";
  const { currentOrder, setCurrentOrder } = useAuthStore();
  const router = useRouter();
  const insets = useSafeAreaInsets()

  return (
      <View style={[styles.headerContainer,{paddingTop:insets.top+6}]}>
        <Pressable
          style={[styles.backButton,{marginTop:insets.top}]}
          onPress={() => {
            if (isCustomer) {
              router.navigate("/ProductDashboard");
              if (currentOrder?.status === "delivered") {
                setCurrentOrder(null);
              }
              return;
            }
            router.navigate("/DeliveryDashboard");
          }}
        >
          <Ionicons
            name="chevron-back"
            color={isCustomer ? "#fff" : "#000"}
            size={RFValue(18)}
          />
        </Pressable>
        <CustomText 
        fontSize={RFValue(10)}
        fontFamily={Fonts.Medium}
        style={isCustomer?styles.titleTextWhite : styles.titleTextBlack}
        >
            {title}
        </CustomText>
        <CustomText 
        variant="h4"
        fontFamily={Fonts.SemiBold}
        style={isCustomer?styles.titleTextWhite : styles.titleTextBlack}
        >
            {secondTitle}
        </CustomText>
      </View>
  );
};

export default LiveHeader;

const styles = StyleSheet.create({
  headerContainer: {
    justifyContent: "center",
    paddingVertical: 10,
    alignItems: "center",
    paddingBottom:12
  },
  backButton: {
    position: "absolute",
    left: 20,
  },
  titleTextBlack: {
    color: "black",
  },
  titleTextWhite: {
    color: "white",
  },
});
