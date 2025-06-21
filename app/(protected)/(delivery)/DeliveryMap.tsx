import { View, StyleSheet, ScrollView, Alert } from "react-native";
import { useAuthStore } from "@/state/authStore";
import { confirmOrder, getOrderById, sendLiveOrderUpdates } from "@/services/orderService";
import { use, useEffect, useState } from "react";
import { Colors, Fonts } from "@/utils/Constants";
import LiveHeader from "@/components/liveTracking/LiveHeader";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { RFValue } from "react-native-responsive-fontsize";
import CustomText from "@/components/ui/CustomText";
import OrderSummary from "@/components/liveTracking/OrderSummary";
import DeliveryDetails from "@/components/liveTracking/DeliveryDetails";
import LiveMap from "@/components/map/LiveMap";
import { useLocalSearchParams, useRouter } from "expo-router";
import * as Location from "expo-location";
import { hocStyles } from "@/utils/Styles";
import CustomButton from "@/components/ui/CustomButton";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { screenHeight } from "@/utils/Scaling";

const Deliverymap = () => {
  const user = useAuthStore((state) => state.user);
  const [orderData, setOrderData] = useState<any>(null);
  const [myLocation, setMyLocation] = useState<any>(null);
  const insets = useSafeAreaInsets()
  const router = useRouter();

  let orderDetails = useLocalSearchParams<{
      orderId: string;
      items: string;
      deliveryLocation: string;
      totalPrice: string;
      createdAt: string;
      status: "confirmed" | "completed";
  }>();

  orderDetails = {
    ...orderDetails,
    items: JSON.parse(orderDetails.items),
    deliveryLocation: JSON.parse(orderDetails.deliveryLocation),
  }

  const { setCurrentOrder } = useAuthStore();
  const fetchOrderDetails = async () => {
    const data = await getOrderById(orderDetails?.orderId );
    if (!data) {
      console.error("No order data found on delivery map");
      return;
    }else{
      setOrderData(data);
    }
  };
  useEffect(() => {
    fetchOrderDetails();
  }, []);

  useEffect(()=>{

    const locationWatchFunction = async ()=>{
      await Location.watchPositionAsync(
      {
        accuracy: Location.LocationAccuracy.Highest,
        distanceInterval: 10, // Update every 10 meters
        timeInterval: 5000, // Update every 5 seconds
      },(position) => {
        const { latitude, longitude } = position.coords;
        setMyLocation({
          latitude,
          longitude,
        });
      },
      (error) => {
        console.error("Error watching location:", error);
        // Handle location error here, e.g., show an alert or log the error
      }
    )
  }
    locationWatchFunction();
     // Clear the watch when component unmounts
  },[])

  const acceptOrder = async()=>{
    const data = await confirmOrder(
      orderData?.orderId,
      myLocation,
    )
    if(data){
      setCurrentOrder(data);
      Alert.alert("Order Accepted, Grab your package");
    }else{
      Alert.alert("Error accepting order", "Please try again later");
    }
    fetchOrderDetails()
  }
  const orderPickedUp = async()=>{
    const data = await sendLiveOrderUpdates(
      orderData?.orderId,
      myLocation,
      "arriving"
    )
    if(data){
      setCurrentOrder(data);
      Alert.alert("Let's deliver it as soon as possible");
    }else{
      Alert.alert("Error picking up order", "Please try again later");
    }
    fetchOrderDetails()
  }
  const orderDelivered = async()=>{
    const data = await sendLiveOrderUpdates(
      orderData?.orderId,
      myLocation,
      "delivered"
    )
    if(data){
      setCurrentOrder(data);
      Alert.alert("Let's deliver it as soon as possible");
    }else{
      Alert.alert("Error picking up order", "Please try again later");
    }
    fetchOrderDetails()
  }

  let msg = "Start this order";
  if (orderData?.deliveryPartner?._id === user?._id &&
    orderData?.status === "confirmed") 
    {
    msg = "Grab your order";
  } else if (orderData?.deliveryPartner?._id === user?._id &&
    orderData?.status === "arriving") 
    {
    msg = "Complete your order";
  } else if (orderData?.deliveryPartner?._id === user?._id &&
    orderData?.status === "delivered") 
    {
    msg = "Your Milestone is completed";
  }else if (orderData?.deliveryPartner?._id === user?._id &&
    orderData?.status !== "available")
    {
    msg = "You missed it!";
  }

  useEffect(() => {
    async function sendLiveUpdates(){
      if(
        orderData?.deliveryPartner?._id === user?._id &&
        orderData?.status !== "delivered" &&
        orderData?.status !== "cancelled"
      ){
        await sendLiveOrderUpdates(
          orderData?.orderId,
          myLocation,
          orderData?.status
        )
        fetchOrderDetails()
      }
    }
    sendLiveUpdates();
  },[myLocation])

  return (
    <View style={styles.container}>
      <LiveHeader type="Delivery" title={msg} secondTitle="Delivery in 10 minutes" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <LiveMap 
          deliveryPersonLocation={orderData?.deliveryPersonLocation || myLocation}
          deliveryLocation={orderData?.deliveryLocation || null}
          pickupLocation={orderData?.pickupLocation || null}
          hasAccepted={orderData?.deliverypartner?._id === user?._id && orderData?.status === 'confirmed'}
          hasPickedUp={orderData?.status === 'arriving'}
        />

        <DeliveryDetails details={orderData?.customer}/>
        <OrderSummary order={orderData}/>

        <View style={styles.flexRow}>
          <View style={styles.iconContainer}>
            <MaterialCommunityIcons
              name="cards-heart-outline"
              color={Colors.disabled}
              size={RFValue(16)}
            />
          </View>
          <View style={{ width: "82%" }}>
            <CustomText fontSize={RFValue(10)} fontFamily={Fonts.SemiBold}>
              Do you like our app?
            </CustomText>
            <CustomText fontSize={RFValue(9)} fontFamily={Fonts.Medium}>
              Rate us on Play Store and help us improve
            </CustomText>
          </View>
        </View>
        <CustomText
          fontFamily={Fonts.SemiBold}
          variant="h6"
          style={{ opacity: 0.6, marginTop: 20 }}
        >
          Mahavir Grocery Delivery App
        </CustomText>
      </ScrollView>
      {
        orderData?.status !== 'delivered' && orderData?.status !== 'cancelled' &&
        <View style={[hocStyles.cartContainer,styles.btnContainer]}>
          <View style={{marginBottom: insets.bottom -screenHeight * 0.02}}>
          {
            orderData?.status === 'available' &&(
              <CustomButton 
                disabled={false}
                title="Accept Order"
                onPress={acceptOrder}
                loading={false}
              />
            )
          }

          {
            orderData?.status === 'arriving' && 
            orderData?.deliveryPartner?._id === user?._id && (
              <CustomButton 
                disabled={false}
                title="Delivered"
                onPress={orderDelivered}
                loading={false}
              />
            )
          }

          {
            orderData?.status === 'confirmed' && 
            orderData?.deliveryPartner?._id === user?._id && (
              <CustomButton 
                disabled={false}
                title="Order Picked Up"
                onPress={orderPickedUp}
                loading={false}
              />
            )
          }
          </View>
        </View>
      }
    </View>
  );
};

export default Deliverymap;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
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
  btnContainer: {
    padding:10
  },
});
