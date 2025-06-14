import { View, StyleSheet, Image } from "react-native";
import React from "react";
import { Colors, Fonts } from "@/utils/Constants";
import CustomHeader from "@/components/ui/CustomHeader";
import { ScrollView } from "react-native-gesture-handler";
import OrderList from "@/components/cart/OrderList";
import CustomText from "@/components/ui/CustomText";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { RFValue } from "react-native-responsive-fontsize";
import BillDetails from "@/components/cart/BillDetails";
import { useCartStore } from "@/state/cartStore";
import { useAuthStore } from "@/state/authStore";

const OrderPage = () => {
  const { getTotalPrice } = useCartStore();
  const { user, setCurrentOrder, currentOrder } = useAuthStore();
  const totalItemPrice = getTotalPrice();
  return (
    <View style={styles.container}>
      <CustomHeader title="Checkout" />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <OrderList />
        <View style={styles.flexRowBetween}>
          <View style={styles.flexRow}>
            <Image
              source={require("@/assets/icons/coupon.png")}
              style={{ width: 25, height: 25 }}
            />
            <CustomText fontSize={RFValue(11)} fontFamily={Fonts.SemiBold}>
              Use Coupons
            </CustomText>
          </View>
          <MaterialIcons
            name="chevron-right"
            size={RFValue(18)}
            color={Colors.text}
          />
        </View>

        <BillDetails totalItemPrice={totalItemPrice} />
        <View style={styles.flexRowBetween}>
          <View>
            <CustomText
            fontSize={RFValue(9)}
            fontFamily={Fonts.SemiBold}
            >
                Cancellation Policy
            </CustomText>
            <CustomText
              fontSize={RFValue(6.7)}
              style={styles.cancelText}
              fontFamily={Fonts.SemiBold}
              numberOfLines={3}
            >
                Orders cannit be once packed for delivery, In case of
                unexpected delays, refund will be initiated within 24 hours, if applicable
            </CustomText>
          </View>
        </View>
      </ScrollView>
      <View>
        
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        position: "relative",
    },
    scrollContainer: {
        backgroundColor: Colors.backgroundSecondary,
        padding: 10,
        paddingBottom: 250,
        position: "absolute",
    },
    flexRowBetween: {
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 10,
        flexDirection: "row",
        borderRadius: 15,
    },
    flexRow: {
        alignItems: "center",
        flexDirection: "row",
        gap: 10,
    },
    cancelText: {
        opacity: 0.6,
        marginTop: 5,
    },
    paymentGateway: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },
});

export default OrderPage;
