import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Colors, Fonts } from "@/utils/Constants";
import CustomText from "../ui/CustomText";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { RFValue } from "react-native-responsive-fontsize";

interface ReportItemProps {
  iconName: string;
  underline?: boolean;
  title: string;
  price: number;
}

const extraPrices = [{
    iconName: "pedal-bike",
    title: "Delivery charge",
    price: 29,
    }, {
    iconName: "shopping-bag",
    title: "Handling charge",
    price: 2,
    }, {
    iconName: "cloudy-snowing",
    title: "Surge charge",
    price: 3,
}]

const grandTotalPrice = 34; // This is the fixed amount added to the total item price

const ReportItem = ({ iconName, underline, title, price }: ReportItemProps) => {
  return (
    <View style={[styles.flexRowBetween, { marginBottom: 10 }]}>
      <View style={styles.flexRow}>
        <MaterialIcons
          name={iconName}
          style={{ opacity: 0.7 }}
          size={RFValue(14)}
          color={Colors.text}
        />
        <CustomText
          fontSize={RFValue(10)}
          style={{
            textDecorationLine: underline ? "underline" : "none",
            textDecorationStyle: "dashed",
            marginBottom:3
          }}
        >
          {title}
        </CustomText>
      </View>
      <CustomText fontSize={RFValue(10.5)}>₹{price}</CustomText>
    </View>
  );
};

const BillDetails = ({ totalItemPrice }: { totalItemPrice: number }) => {
  return (
    <View style={styles.container}>
      <CustomText
        style={styles.text}
        fontFamily={Fonts.SemiBold}
        fontSize={RFValue(12)}
      >
        Bill Details
      </CustomText>
      <View style={styles.billContainer}>
        <ReportItem
          iconName="article"
          title="Items total"
          price={totalItemPrice}
        />
        
        {
            extraPrices.map((item, index) => (
                <ReportItem 
                key={index}
                iconName={item.iconName} 
                title={item.title} 
                price={item.price}  
                />
            ))
        }
      </View>
      <View style={[styles.flexRowBetween, { marginBottom: 15 }]}>
        <CustomText 
        fontSize={RFValue(10)}
        style={styles.text}
        fontFamily={Fonts.SemiBold}
        >
            Grand Total
        </CustomText>
        <CustomText 
        fontSize={RFValue(10)}
        style={styles.text} 
        fontFamily={Fonts.SemiBold}
        >
            ₹{totalItemPrice+grandTotalPrice}
        </CustomText>
      </View>
    </View>
  );
};

export default BillDetails;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 15,
    marginVertical: 15,
  },
  text: {
    marginHorizontal: 10,
    marginTop: 15,
  },
  billContainer: {
    padding: 10,
    paddingBottom: 0,
    borderBottomColor: Colors.border,
    borderBottomWidth: 0.7,
  },
  flexRowBetween: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  flexRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
});
