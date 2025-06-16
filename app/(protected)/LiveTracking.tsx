import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useAuthStore } from "@/state/authStore";
import { getOrderById } from "@/services/orderService";
import { useEffect } from "react";
import { Colors, Fonts } from "@/utils/Constants";
import LiveHeader from "@/components/map/LiveHeader";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { RFValue } from "react-native-responsive-fontsize";
import CustomText from "@/components/ui/CustomText";
import OrderSummary from "@/components/map/OrderSummary";

const LiveTracking = () => {
  const { currentOrder, setCurrentOrder } = useAuthStore();
  const fetchOrderDetails = async () => {
    const data = await getOrderById(currentOrder?.orderId);
    if (!data) {
      console.error("No order data found");
      return;
    }
    if (!data.order) {
      console.error("Order data is missing in the response");
      return;
    }
    if (data.order) setCurrentOrder(data.order);
  };
  useEffect(() => {
    fetchOrderDetails();
  }, []);
  let msg = "Packing your order";
  let time = "Arriving in 10 minutes";
  if (currentOrder?.status === "confirmed") {
    msg = "Arrving Soon";
    time = "Arriving in 8 minutes";
  } else if (currentOrder?.status === "arriving") {
    msg = "Order picked up";
    time = "Arriving in 6 minutes";
  } else if (currentOrder?.status === "delivered") {
    msg = "Order Delivered";
    time = "Faster than ever⚡";
  }
  return (
    <View style={styles.container}>
      <LiveHeader type="Customer" title={msg} secondTitle={time} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.flexRow}>
          <View style={styles.iconContainer}>
            <MaterialCommunityIcons
              name={currentOrder?.deliveryPartner ? "phone" : "shopping"}
              color={Colors.disabled}
              size={RFValue(16)}
            />
          </View>
          <View style={{ width: "82%" }}>
            <CustomText
              numberOfLines={1}
              variant="h7"
              fontFamily={Fonts.SemiBold}
            >
              {currentOrder?.deliverypartner?.name ||
                "We will soon assign delivery partner"}
            </CustomText>
            {currentOrder?.deliveryPartner && (
              <CustomText
                numberOfLines={1}
                variant="h7"
                fontFamily={Fonts.Medium}
              >
                {currentOrder?.deliverypartner?.phone}
              </CustomText>
            )}
            <CustomText variant="h9" fontFamily={Fonts.Medium}>
              {currentOrder?.deliveryPartner
                ? "For Delivery instructions you can contact Delivery Partner"
                : msg}
            </CustomText>
          </View>
        </View>

        <OrderSummary order={currentOrder}/>

        <View style={styles.flexRow}>
          <View style={styles.iconContainer}>
            <MaterialCommunityIcons
              name="cards-heart-outline"
              color={Colors.disabled}
              size={RFValue(16)}
            />
          </View>
          <View style={{ width: "82%" }}>
            <CustomText variant='h7' fontFamily={Fonts.SemiBold}>
              Do you like our app?
            </CustomText>
            <CustomText variant='h9' fontFamily={Fonts.Medium}>
              Rate us on Play Store and help us improve
            </CustomText>
          </View>
        </View>
        <CustomText
          fontFamily={Fonts.SemiBold}
          variant="h6"
          style={{ opacity: 0.6, marginTop: 20 }}
        >
          Mahavir Grocery Dellivery App
        </CustomText>
      </ScrollView>
    </View>
  );
};

export default LiveTracking;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.secondary,
  },
  scrollContent: {
    paddingBottom: 150,
    backgroundColor: Colors.backgroundSecondary,
    padding: 15,
  },
  flexRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    width: "100%",
    borderRadius: 15,
    marginTop: 15,
    paddingVertical: 10,
    backgroundColor: "#fff",
    padding: 10,
    borderBottomWidth: 0.7,
    borderColor: Colors.border,
  },
  iconContainer: {
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: 100,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
