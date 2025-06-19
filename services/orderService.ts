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