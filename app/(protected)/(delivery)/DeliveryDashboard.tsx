import { ActivityIndicator, Alert, FlatList, RefreshControl, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "@/utils/Constants";
import { useAuthStore } from "@/state/authStore";
import DeliveryHeader from "@/components/delivery/DeliveryHeader";
import TabBar from "@/components/delivery/TabBar";
import { reverseGeoCode } from "@/services/mapService";
import * as Location from "expo-location";
import { fetchDeliveryPartnerOrders } from "@/services/orderService";
import DeliveryOrderItem from "@/components/delivery/DeliveryOrderItem";
import CustomText from "@/components/ui/CustomText";

const DeliveryDashboard = () => {
  const { user, setUser } = useAuthStore();
  const [selectedTab, setSelectedTab] = useState<"available" | "delivered">(
    "available"
  );
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    async function getCurrentLocation() {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      reverseGeoCode(
        location.coords.latitude,
        location.coords.longitude,
        setUser
      );
    }
    getCurrentLocation();
  }, []);

  const fetchData = async () => {
      setData([]);
      setRefreshing(true);
      try{

        const data =  await fetchDeliveryPartnerOrders(selectedTab, user?._id, user?.branch);
        setData(data);
      } catch (error) {
        console.error("Error fetching delivery partner orders:", error);
      }finally{
        setRefreshing(false);
      }
    }
  useEffect(() => {
    fetchData();
  }, [selectedTab]);

  const renderOrderItem = ({item,index}:{ item:any, index:number }) => {
    return (
      <DeliveryOrderItem index={index} item={item}/>
    )
  }

  return (
    <View style={styles.container}>
      <DeliveryHeader name={user?.name} email={user?.email} />
      {/* <ScrollView>
        <Text>{JSON.stringify(user)}</Text>
      </ScrollView> */}
      <View style={styles.subContainer}>
        <TabBar selectedTab={selectedTab} onTabChange={setSelectedTab} />
        <FlatList 
        data={data}
        renderItem={renderOrderItem}
        refreshControl={
          <RefreshControl refreshing={refreshing}
          onRefresh={async () => await fetchData()}
          />
        }
        ListEmptyComponent={()=>{
          if(loading){
            return (
              <View>
                <ActivityIndicator size="small" color={Colors.secondary} />
              </View>
            )
          }
          return (
            <View style={styles.center}>
              <CustomText>
                No Orders found yet!
              </CustomText>
            </View>
          )
        }}
        />
      </View>
    </View>
  );
};

export default DeliveryDashboard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    flex: 1,
  },
  subContainer: {
    backgroundColor: Colors.backgroundSecondary,
    flex: 1,
    padding: 6,
  },
  flatlistContainer: {
    padding: 2,
  },
  center: {
    flex: 1,
    marginTop: 60,
    justifyContent: "center",
    alignItems: "center",
  },
});
