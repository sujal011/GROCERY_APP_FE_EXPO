import { Image, StyleSheet, View } from "react-native";
import React from "react";
import { screenHeight } from "@/utils/Scaling";
import { Colors, Fonts } from "@/utils/Constants";
import CustomText from "../ui/CustomText";
import { RFValue } from "react-native-responsive-fontsize";
import { Iproduct } from "@/app/(protected)/ProductCategories";
import UniversalAdd from "../UniversalAdd";

const ProductItem = ({ item, index }: { item: Iproduct; index: number }) => {
  // const isSecondColumn = index % 2 !== 0;
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: item?.image }} style={styles.image} />
      </View>
      <View style={styles.content}>
        <View style={styles.flexRow}>
          <Image
            source={require("@/assets/icons/clock.png")}
            style={styles.clockIcon}
          />
          <CustomText fontSize={RFValue(6)} fontFamily={Fonts.Medium}>
            16 MINS
          </CustomText>
        </View>
        <CustomText
          fontFamily={Fonts.Medium}
          fontSize={RFValue(8)}
          numberOfLines={2}
          style={{ marginVertical: 2 }}
        >
          {item.name}
        </CustomText>
        <View style={styles.priceContainer}>
          <View>
            <CustomText
              fontFamily={Fonts.Medium}
              fontSize={RFValue(8)}
              style={{ opacity:1, }}
            >
              ₹{item?.price}
            </CustomText>
            <CustomText
              fontFamily={Fonts.Medium}
              fontSize={RFValue(8)}
              style={{ opacity:0.8,textDecorationLine:'line-through' }}
            >
              ₹{item?.discountPrice}
            </CustomText>
          </View>
        <UniversalAdd item={item} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "45%",
    borderRadius: 10,
    backgroundColor: "#fff",
    marginBottom: 10,
    overflow: "hidden",
    marginRight:10 
  },
  imageContainer: {
    height: screenHeight * 0.12,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
  },
  image: {
    height: "100%",
    width: "100%",
    // aspectRatio:1/1,
    resizeMode: "contain",
  },
  content: {
    flex: 1,
    paddingHorizontal: 10,
  },
  flexRow: {
    flexDirection: "row",
    padding: 2,
    borderRadius: 4,
    alignItems: "center",
    gap: 2,
    backgroundColor: Colors.backgroundSecondary,
    alignSelf: "flex-start",
  },
  clockIcon: {
    height: 15,
    width: 15,
  },
  priceContainer:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    paddingVertical:8,
    marginTop:'auto'
  }
});

export default ProductItem;
