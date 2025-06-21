import { Alert } from "react-native";
import axios from "axios";
import { tokenStorage } from "@/state/storage";
import { useAuthStore } from "@/state/authStore";
import { appAxios } from "./apiInterceptors";
import { BASE_URL } from "./config";

export async function customerLogin(phone:string){
    try{
        const response = await axios.post(`${BASE_URL}/customer/login`,{phone})
        
        const {accessToken,refreshToken,customer} = response.data

        tokenStorage.set('accessToken',accessToken)
        tokenStorage.set('refreshToken',refreshToken)
        const {setUser} = useAuthStore.getState()
        setUser(customer)

    }catch(error:any){
       throw new Error(error)
    }
}

export async function deliveryPartnerLogin(email:string,password:string){
    try{
        const response = await axios.post(`${BASE_URL}/delivery/login`,{email,password})
        
        const {accessToken,refreshToken,deliveryPartner} = response.data

        tokenStorage.set('accessToken',accessToken)
        tokenStorage.set('refreshToken',refreshToken)
        const {setUser} = useAuthStore.getState()
        setUser(deliveryPartner)

    }catch(error:any){
       throw new Error(error)
    }
}

export async function refetchUser(setUser:any){

    try {
        const response = await appAxios.get(`/user`)
        setUser(response.data.user)
    }catch(error:any){
        console.log('refetch user error',error)
        Alert.alert('Error fetching user data. Please try again.')
    }
}

export async function updateUserLocation(data:any,setUser:any){
    try {
        const response = await appAxios.patch(`${BASE_URL}/user`,data)
        setUser(response.data.user)
    } catch (error:any) {
        console.log('update user location error',error)
        Alert.alert('Error updating user location. Please try again.')
    }
}