import { appAxios } from "./apiInterceptors";
import { BRANCH_ID } from "./config";

export const createOrder = async (items:any,totalPrice:number) => {
    try {
        const response = await appAxios.post('/order', {
            items: items,
            branch:BRANCH_ID, 
            totalPrice: totalPrice
        })
    
        return response.data;
    } catch (error) {
        console.error('Error creating order:', error);
        throw error; // Propagate the error for further handling
    }
}

export const getOrderById = async(id:string)=>{
    try{
        const response = await appAxios.get(`/order/${id}`);
        return response.data;
    }catch(error){
        console.error('Error fetching order by ID:', error);
        throw error; // Propagate the error for further handling
    }
}

export const fetchCustomerOrders = async(userId:string)=>{
    try{
        const response = await appAxios.get(`/order?customerId=${userId}`);
        return response.data;
    }catch(error){
        console.error('Error fetching your order: ', error);
        throw error; // Propagate the error for further handling
    }
}

export const fetchDeliveryPartnerOrders = async(
    status:string,
    userId:string,
    branchId:string
)=>{
    let uri = 
    status === 'available'
        ? `/order?status=${status}&branchId=${branchId}`
        : `/order?branchId=${branchId}&deliveryPartnerId=${userId}&status=delivered`;

    try {
        const response = await appAxios.get(uri);
        return response.data;
    } catch (error) {
        console.error('Error fetching delivery partner orders:', error);
        throw error; // Propagate the error for further handling
    }
}

export const sendLiveOrderUpdates = async(id:string,location:any,status:string) =>{
    try {
        const response = await appAxios.patch(`/order/${id}/status`, {
            deliveryPersonLocation: location,
            status:status
        });
        return response.data;
    } catch (error) {
        console.error('Error sending live order updates:', error);
        throw error; // Propagate the error for further handling
    }
}

export const confirmOrder = async(id:string,location:any) =>{
    try {
        const response = await appAxios.post(`/order/${id}/confirm`, {
            deliveryPersonLocation: location,
        });
        return response.data;
    } catch (error) {
        console.error('Error confirming order, Try Again:', error);
        throw error; // Propagate the error for further handling
    }
}