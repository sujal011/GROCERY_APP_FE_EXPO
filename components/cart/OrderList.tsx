import { View, StyleSheet, Image } from "react-native";
import React from "react";
import { useCartStore } from "@/state/cartStore";
import { Colors, Fonts } from "@/utils/Constants";
import CustomText from "../ui/CustomText";
import { RFValue } from "react-native-responsive-fontsize";
import OrderItem from "./OrderItem";

const OrderList = () => {
  const carItems = useCartStore((state) => state.cart);
  const totalItems = carItems?.reduce((acc, cart) => acc + cart?.count, 0);
  return (
    <View style={styles.container}>
      <View style={styles.flexRow}>
        <View style={styles.imageContainer}>
          <Image
            source={require("@/assets/icons/clock.png")}
            style={styles.img}
          />
        </View>
        <View>
          <CustomText fontSize={RFValue(10)} fontFamily={Fonts.SemiBold}>
            Delivery in 12 minutes
          </CustomText>
          <CustomText 
          fontSize={RFValue(10)}
          fontFamily={Fonts.SemiBold}
          style={{opacity:0.5}}
          >
            Shipment of {totalItems || 0} item
          </CustomText>
        </View>
      </View>
      {
        carItems?.map((item)=>{
            return <OrderItem key={item._id} item={item}/>
        })
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 15,
    marginBottom: 15,
  },
  flexRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: 12,
    paddingHorizontal: 10,
    paddingVertical: 12,
  },
  imageContainer: {
    backgroundColor: Colors.backgroundSecondary,
    padding: 10,
    borderRadius: 15,
  },
  img: {
    width: 30,
    height: 30,
  },
});

export default OrderList;
