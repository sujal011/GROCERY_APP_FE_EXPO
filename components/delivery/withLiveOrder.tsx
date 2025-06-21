import { useAuthStore } from "@/state/authStore";
import { Colors, Fonts } from "@/utils/Constants";
import React, { FC, useEffect, useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import * as Location from "expo-location";
import { sendLiveOrderUpdates } from "@/services/orderService";
import { hocStyles } from "@/utils/Styles";
import CustomText from "../ui/CustomText";
import { Link } from "expo-router";
import { RFValue } from "react-native-responsive-fontsize";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { screenHeight } from "@/utils/Scaling";

const withLiveOrder = <P extends object>(
  WrappedComponnet: React.ComponentType<P>
): FC<P> => {
  const withLiveOrder = (props) => {
    const { currentOrder, user } = useAuthStore();
    const [myLocation, setMyLocation] = useState<any>(null);
    const insets = useSafeAreaInsets();

    useEffect(() => {
      const locationWatchFunction = async () => {
        await Location.watchPositionAsync(
          {
            accuracy: Location.LocationAccuracy.Highest,
            distanceInterval: 200, // Update every 200 meters
            timeInterval: 10000, // Update every 10 seconds
          },
          (position) => {
            const { latitude, longitude } = position.coords;
            console.log(
              "LIVE TRACKING 🔴",
              " LAT:",
              new Date().toLocaleTimeString(),
              latitude.toFixed(3),
              " LONG: ",
              longitude.toFixed(3)
            );
            setMyLocation({
              latitude,
              longitude,
            });
          },
          (error) => {
            console.error("Error watching location:", error);
            // Handle location error here, e.g., show an alert or log the error
          }
        );
      };
      if (currentOrder) {
        locationWatchFunction();
      }
    }, [currentOrder]);

    useEffect(() => {
      async function sendLiveUpdates() {
        if (
          currentOrder?.deliveryPartner?._id === user?._id &&
          currentOrder?.status !== "delivered" &&
          currentOrder?.status !== "cancelled"
        ) {
          sendLiveOrderUpdates(
            currentOrder?._id,
            myLocation,
            currentOrder?.status
          );
        }
      }
      if (myLocation && currentOrder) {
        sendLiveUpdates();
      }
    }, [myLocation]);

    return (
      <View style={styles.container}>
        <WrappedComponnet {...props} />
        {currentOrder && (
          <View
            style={[
              hocStyles.cartContainer,
              {
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 10,
                paddingBottom: insets.bottom - screenHeight * 0.02,
              },
            ]}
          >
            <View style={styles.flexRow}>
              <View style={styles.img}>
                <Image
                  source={require("@/assets/icons/bucket.png")}
                  style={{ width: 30, height: 30 }}
                />
              </View>
              <View style={{ width: "60%" }}>
                <CustomText fontSize={RFValue(10)} fontFamily={Fonts.SemiBold}>
                  #{currentOrder?.orderId}
                </CustomText>
                <CustomText
                  fontSize={RFValue(8.5)}
                  numberOfLines={2}
                  fontFamily={Fonts.Medium}
                >
                  #{currentOrder?.deliveryLocation?.address}{" "}
                </CustomText>
              </View>
              <Link
                href={{
                  pathname: "/DeliveryMap",
                  params: {
                    orderId: currentOrder.orderId,
                    items: JSON.stringify(currentOrder.items),
                    createdAt: currentOrder.createdAt,
                    status: currentOrder.status,
                    deliveryLocation: JSON.stringify(
                      currentOrder.deliveryLocation
                    ),
                    totalPrice: currentOrder.totalPrice,
                  },
                }}
              >
                <View style={styles.btn}>
                  <CustomText
                    fontSize={RFValue(8.5)}
                    fontFamily={Fonts.Medium}
                    style={{ color: Colors.secondary, paddingVertical: 5 }}
                  >
                    Continue
                  </CustomText>
                </View>
              </Link>
            </View>
          </View>
        )}
      </View>
    );
  };
  return withLiveOrder;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flexRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderRadius: 15,
    marginBottom: 15,
    paddingVertical: 10,
    padding: 10,
  },
  img: {
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: 100,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  btn: {
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderWidth: 0.7,
    borderColor: Colors.secondary,
    borderRadius: 5,
  },
});

export default withLiveOrder;
