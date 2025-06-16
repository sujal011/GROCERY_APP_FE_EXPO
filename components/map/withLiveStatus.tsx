import { getOrderById } from "@/services/orderService";
import { useAuthStore } from "@/state/authStore";
import { Colors, Fonts } from "@/utils/Constants";
import { useRouter, useSegments } from "expo-router";
import { FC, useEffect } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { io } from "socket.io-client";
import { WEBSOCKET_URl } from "@/services/config";
import { hocStyles } from "@/utils/Styles";
import CustomText from "../ui/CustomText";
import { RFValue } from "react-native-responsive-fontsize";

const withLiveStatus = <P extends object>(WrappedComponnet: React.ComponentType<P>):FC<P> => {

    const WithLiveStatusComponent : FC<P> = (props)=>{
        const {currentOrder,setCurrentOrder} = useAuthStore()
        const router = useRouter()
        const routeName = useSegments()[1] //'ProductDashboard'; // Get the current route name
           useEffect(()=>{
            const fetchOrderDetails = async () => {
                if (!currentOrder?.orderId) {
                    return;
                }
                try {
                    const data = await getOrderById(currentOrder.orderId);
                    if (data) {
                        setCurrentOrder(data);
                    }
                } catch (error) {
                    console.error('Error fetching order details:', error);
                }
            };

            if(currentOrder?.orderId){
                const socketInstance = io(WEBSOCKET_URl,{
                    transports: ['websocket'],
                    reconnection: true,
                    reconnectionAttempts: 5,
                    reconnectionDelay: 1000,
                })
                socketInstance.emit('joinRoom',currentOrder.orderId);
                socketInstance.on('liveTrackingUpdates',(updatedOrder)=>{
                    fetchOrderDetails();
                    console.log("Received live tracking update 🔴");
                    
                })
                socketInstance.on("orderConfiremed", (confirmOrder) => {
                    fetchOrderDetails();
                    console.log("ORDER CONFIRMATIPN LIVE update 🔴");

                });
                return () => {
                    socketInstance.off('liveTrackingUpdates');
                    socketInstance.off("orderConfiremed");
                    socketInstance.disconnect();
                }
            }
        },[currentOrder])

        const firstItemName = currentOrder?.items?.[0]?.item?.name || 'Item';
        const remainingItemsCount = currentOrder?.items?.length || 0;
        const itemsText = firstItemName + (remainingItemsCount - 1 > 0 ? ` and ${remainingItemsCount}+ items` : '');

        return(
            <View style={styles.container}>
                <WrappedComponnet {...props} />
                {currentOrder && routeName === 'ProductDashboard' && (
                    <View style={[hocStyles.cartContainer,{flexDirection:"row",alignItems:'center'}]}>
                        <View style={styles.flexRow}>
                            <View style={styles.img}>
                                <Image
                                source={require('@/assets/icons/bucket.png')}
                                style={{width: 25, height: 25}}
                                />
                            </View>
                            <View style={{width:'68%'}}>
                                <CustomText fontSize={RFValue(10)} fontFamily={Fonts.SemiBold}>
                                    Order is {currentOrder.status || 'Pending'}
                                </CustomText>
                                <CustomText fontSize={RFValue(8)} fontFamily={Fonts.Medium}>
                                    {itemsText}
                                </CustomText>
                            </View>
                        </View>
                        <TouchableOpacity
                        onPress={()=>router.navigate('/LiveTracking')}
                        style={styles.btn}
                        >
                            <CustomText style={{color:Colors.secondary}}
                            fontFamily={Fonts.Medium} fontSize={RFValue(9)}>
                                View 
                            </CustomText>
                        </TouchableOpacity>
                    </View>
                ) }
                
            </View>
        )
    }
    return WithLiveStatusComponent;
}

export default withLiveStatus;

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    flexRow:{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        borderRadius: 15,
        marginBottom:15,
        paddingVertical:10,
        padding: 10,
    },
    img:{
        backgroundColor:Colors.backgroundSecondary,
        borderRadius:100,
        padding:10,
        justifyContent:'center',
        alignItems:'center',
    },
    btn:{
        paddingHorizontal:10,
        paddingVertical:2,
        borderWidth:0.7,
        borderColor:Colors.secondary ,
        borderRadius: 5,
    }
})