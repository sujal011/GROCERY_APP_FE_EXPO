import {
  View,
  StyleSheet,
  Image,
  Platform,
  TouchableOpacity,
  Alert,
  ScrollView
} from "react-native";
import React, { useState } from "react";
import { Colors, Fonts } from "@/utils/Constants";
import CustomHeader from "@/components/ui/CustomHeader";
import OrderList from "@/components/cart/OrderList";
import CustomText from "@/components/ui/CustomText";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { RFValue } from "react-native-responsive-fontsize";
import BillDetails from "@/components/cart/BillDetails";
import { useCartStore } from "@/state/cartStore";
import { useAuthStore } from "@/state/authStore";
import { hocStyles } from "@/utils/Styles";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ArrowButton from "@/components/ui/ArrowButton";
import { createOrder } from "@/services/orderService";
import { useRouter } from "expo-router";

const OrderPage = () => {
  const insets = useSafeAreaInsets();
  const router = useRouter()
  const { getTotalPrice,cart,clearCart } = useCartStore();
  const { user, setCurrentOrder, currentOrder } = useAuthStore();
  const totalItemPrice = getTotalPrice();
  const [loading, setLoading] = useState(false);

  const handlerPlaceOrder = async () => {
    if(currentOrder !== null) {
        Alert.alert("Let your first order to be delivered first", "You can only place one order at a time.");
        return;
    }
    const formattedData = cart.map((item)=>({
        id: item._id,
        item:item._id,
        count:item.count,
    }))
    if(formattedData.length === 0) {
        Alert.alert("No items in cart", "Please add items to your cart before placing an order.");
        return
    }
    setLoading(true);
        try {
      const data = await createOrder(formattedData, totalItemPrice);

      if (data.order) {
        setCurrentOrder(data.order);
        clearCart()
        router.navigate('/OrderSuccess',{...data})
      } else {
        Alert.alert("Order Failed", "There was an issue placing your order. Please try again.");
      }
    } catch (error) {
        Alert.alert("Error", "There was an error placing your order. Please try again later.");
      console.error("Error placing order:", error);
    } finally {
      setLoading(false);
    }
  };

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
            <CustomText fontSize={RFValue(9)} fontFamily={Fonts.SemiBold}>
              Cancellation Policy
            </CustomText>
            <CustomText
              fontSize={RFValue(6.7)}
              style={styles.cancelText}
              fontFamily={Fonts.SemiBold}
              numberOfLines={3}
            >
              Orders cannOt be once packed for delivery, In case of unexpected
              delays, refund will be initiated within 24 hours, if applicable
            </CustomText>
          </View>
        </View>
      </ScrollView>
      <View style={[hocStyles.cartContainer, { paddingBottom: insets.bottom }]}>
        <View style={styles.absoluteContainer}>
          <View style={styles.addressContainer}>
            <View style={styles.flexRow}>
              <Image
                source={require("@/assets/icons/home.png")}
                style={{ width: 20, height: 20 }}
              />
              <View style={{ width: "75%" }}>
                <CustomText fontSize={RFValue(9)} fontFamily={Fonts.Medium}>
                  Delivering to Home
                </CustomText>
                <CustomText
                  fontSize={RFValue(7)}
                  style={{ opacity: 0.6 }}
                  numberOfLines={2}
                >
                  {user?.address}
                </CustomText>
              </View>
            </View>
            <TouchableOpacity>
              <CustomText
                fontSize={RFValue(9)}
                style={{ color: Colors.secondary }}
                fontFamily={Fonts.Medium}
              >
                Change
              </CustomText>
            </TouchableOpacity>
          </View>
          <View style={styles.paymentGateway}>
            <View style={{width:"30%"}}>
                <CustomText
                fontFamily={Fonts.Regular}
                fontSize={RFValue(7)}
                >
                    💵 PAY USING
                </CustomText>
                <CustomText
                    fontFamily={Fonts.Regular}
                    fontSize={RFValue(8)}
                    style={{marginTop:2}}
                >
                    Cash on Delivery
                </CustomText>
            </View>
        <View style={{width:"70%"}}>
            <ArrowButton 
            loading={loading}
            price={totalItemPrice}
            title="Place Order"
            onPress={handlerPlaceOrder}
            />
        </View>
          </View>
        </View>
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
    paddingTop:10,
    paddingLeft:5
  },
  addressContainer: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingBottom: 10,
    borderBottomWidth: 0.7,
    borderColor: Colors.border,
  },
  absoluteContainer: {
    marginVertical: 15,
    marginBottom: Platform.OS === "ios" ? 30 : 10,
  },
}
)

export default OrderPage