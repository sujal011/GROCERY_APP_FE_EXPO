import { View, StyleSheet, Image} from "react-native";
import React from "react";
import { Colors, Fonts } from "@/utils/Constants";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { RFValue } from "react-native-responsive-fontsize";
import CustomText from "../ui/CustomText";
import BillDetails from "../cart/BillDetails";
import { screenWidth } from "@/utils/Scaling";

const OrderItem = ({ item }: { item: any }) => {
  return (
    <View style={[styles.flexRow,{justifyContent:"space-between"}]}>
      <View style={styles.imgContainer}>
        <Image source={{ uri: item?.item?.image }} style={styles.img} />
      </View>
      <View style={{marginLeft:-screenWidth*0.15}}>
        <CustomText numberOfLines={2} fontSize={RFValue(9)} fontFamily={Fonts.Medium}>
          {item.item.name}
        </CustomText>
        <CustomText fontSize={RFValue(9)}>{item.item.quantity}</CustomText>
      </View>
      <View style={{width:'20%',alignItems:'flex-end',marginRight:5}}>
        <CustomText
        fontSize={RFValue(9)}
        fontFamily={Fonts.Medium}
        style={{alignSelf:'flex-end', marginTop:4}}
        >
            ₹{item.count * item.item.price}
        </CustomText>
        <CustomText
        fontSize={RFValue(9)}
        fontFamily={Fonts.Medium}
        style={{alignSelf:'flex-end', marginTop:4}}
        >
            {item.count}x
        </CustomText>
      </View>
    </View>
  );
};

const OrderSummary = ({ order }: { order: any }) => {
  const totalPrice =
    order?.items?.reduce((total: number, cartItem: any) => {
      return total + cartItem.item.price * cartItem.count;
    }, 0) || 0;
  return (
    <View style={styles.container}>
      <View style={styles.flexRow}>
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons
            name="shopping-outline"
            color={Colors.disabled}
            size={RFValue(16)}
          />
        </View>
        <View>
          <CustomText fontSize={RFValue(10.5)} fontFamily={Fonts.SemiBold}>
            Order Summary
          </CustomText>
          <CustomText fontSize={RFValue(8)} fontFamily={Fonts.Medium}>
            Order ID - #{order?.orderId}
          </CustomText>
        </View>
      </View>
      {order?.items?.map((item:any,index:number)=>(
        <OrderItem item={item} key={index}/>
      ))}
      <BillDetails totalItemPrice={totalPrice} />
    </View>
  );
};

export default OrderSummary;

const styles = StyleSheet.create({
  img: {
    width: 40,
    height: 40,
  },
  imgContainer: {
    backgroundColor: Colors.backgroundSecondary,
    padding: 10,
    borderRadius: 15,
    width: "17%",
  },
  container: {
    width: "100%",
    borderRadius: 15,
    marginVertical: 15,
    paddingVertical: 10,
    backgroundColor: "#fff",
  },
  iconContainer: {
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: 100,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  flexRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    padding: 10,
    borderBottomWidth: 0.7,
    borderColor: Colors.border,
  },
});
