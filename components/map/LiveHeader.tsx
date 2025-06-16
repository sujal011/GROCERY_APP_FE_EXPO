import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import { useAuthStore } from "@/state/authStore";
import { SafeAreaView } from "react-native-safe-area-context";
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
  return (
    <SafeAreaView>
      <View style={styles.headerContainer}>
        <Pressable
          style={styles.backButton}
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
            size={RFValue(16)}
          />
        </Pressable>
        <CustomText 
        variant="h6"
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
    </SafeAreaView>
  );
};

export default LiveHeader;

const styles = StyleSheet.create({
  headerContainer: {
    justifyContent: "center",
    paddingVertical: 10,
    alignItems: "center",
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
