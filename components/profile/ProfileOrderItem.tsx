import { View, Text, StyleSheet } from "react-native";
import React from "react";
import CustomText from "../ui/CustomText";
import { RFValue } from "react-native-responsive-fontsize";
import { Fonts } from "@/utils/Constants";
import { formatISOToCustom } from "@/utils/DateUtils";

interface CartItem {
  _id: string | number;
  item: any;
  count: number;
}

interface Order {
  orderId: string;
  items: CartItem[];
  totalPrice: number;
  createdAt: string;
  status: "confirmed" | "completed";
}

const ProfileOrderItem = ({ item, index }: any) => {
  return (
    <View style={[styles.container, { borderTopWidth: index === 0 ? 0.7 : 0 }]}>
      <View style={styles.flexRowBetween}>
        <CustomText
          fontSize={RFValue(8.5)}
          fontFamily={Fonts.Medium}
          style={{ textTransform: "capitalize" }}
        >
          #{item.orderId}
        </CustomText>
        <CustomText
          fontSize={RFValue(8.5)}
          fontFamily={Fonts.Medium}
          style={{ textTransform: "capitalize" }}
        >
          {item.status}
        </CustomText>
      </View>
      <View style={styles.flexRowBetween}>
        <View style={{ width: "50%" }}>
          {item?.items?.map((i, idx) => {
            return (
              <CustomText fontSize={RFValue(9)} numberOfLines={1} key={idx}>
                {i?.count}x {i?.item?.name}
              </CustomText>
            );
          })}
        </View>
        <View style={{ alignItems: "flex-end" }}>
            <CustomText
            fontSize={RFValue(9)}
            style={{marginTop:10}}
            fontFamily={Fonts.SemiBold}
            >
                ₹{item?.totalPrice}
            </CustomText>
            <CustomText fontSize={RFValue(7)}>
                {formatISOToCustom(item.createdAt)}
            </CustomText>
        </View>
      </View>
    </View>
  );
};

export default ProfileOrderItem;

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 0.7,
    paddingVertical: 15,
    opacity: 0.9,
  },
  flexRowBetween: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
});
