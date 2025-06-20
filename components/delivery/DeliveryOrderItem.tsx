import { View, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { RFValue } from "react-native-responsive-fontsize";
import { Colors, Fonts } from "@/utils/Constants";
import CustomText from "../ui/CustomText";
import { formatISOToCustom } from "@/utils/DateUtils";
import { useRouter } from "expo-router";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

interface CartItem {
  _id: string | number;
  item: any;
  count: number;
}

interface Order {
  orderId: string;
  items: CartItem[];
  deliveryLocation: any;
  totalPrice: number;
  createdAt: string;
  status: "confirmed" | "completed";
}

function getStatusColor(status: string) {
  switch (status.toLowerCase()) {
    case "available":
      return "#28a745";
    case "confirmed":
      return "#007bff";
    case "delivered":
      return "#17a2b8";
    case "cancelled":
      return "#dc3545";
    default:
      return "#6c757d";
  }
}

const DeliveryOrderItem = ({ item, index }: { item: Order; index: number }) => {
    const router = useRouter();
  return (
    <View style={styles.container}>
      <View style={styles.flexRowBetween}>
        <CustomText fontSize={RFValue(8.5)} fontFamily={Fonts.Medium}>
          #{item.orderId}
        </CustomText>
        <View style={[styles.statusContainer]}>
            <CustomText
              fontSize={RFValue(8.5)}
                fontFamily={Fonts.SemiBold}
                style={[styles.statusText, { color: getStatusColor(item.status) }]}
              >
                {item.status}
            </CustomText>
        </View>
      </View>
      <View style={styles.itemsContainer}>
        {item.items.slice(0,2).map((i,idx)=>{
            return (
                <CustomText fontSize={RFValue(9)} numberOfLines={1} key={idx}>
                    {i.count}x {i.item.name}
                </CustomText>   
            )
        })}
      </View>
      <View style={[styles.flexRowBetween,styles.addressContainer]}>
        <View style={styles.addressTextContainer}>
          <CustomText fontSize={RFValue(9)} numberOfLines={1} >
            {item.deliveryLocation?.address || "----"}
          </CustomText>
          <CustomText  style={styles.dateText}>
            {formatISOToCustom(item?.createdAt)}
          </CustomText>
        </View>
       <TouchableOpacity
       style={styles.iconContainer}
       onPress={() => {
            router.navigate('/DeliveryMap')
       }}
       >
        <MaterialCommunityIcons name="arrow-right-circle" size={RFValue(25)} color={Colors.primary}/>

       </TouchableOpacity>

      </View>
    </View>
  );
};

export default DeliveryOrderItem;

const styles = StyleSheet.create({
  container: {
    borderWidth: 0.7,
    padding: 10,
    borderColor: Colors.border, // Replace with Colors.border if you have a Colors object
    borderRadius: 10,
    paddingVertical: 15,
    marginVertical: 10,
    backgroundColor: "white",
  },
  flexRowBetween: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  statusContainer: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  statusText: {
    textTransform: "capitalize",
    color: "white",
  },
  itemsContainer: {
    width: "50%",
    marginTop: 10,
  },
  addressContainer: {
    marginTop: 10,
  },
  addressTextContainer: {
    width: "70%",
  },
  dateText: {
    marginTop: 2,
    fontSize: RFValue(8),
  },
  iconContainer: {
    alignItems: "flex-end",
  },
});
