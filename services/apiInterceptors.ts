import axios from "axios";
import { Alert } from "react-native";
import { tokenStorage } from "@/state/storage";
import { useRouter } from "expo-router";
import { BASE_URL } from "./config";

export async function refresh_token(){
    const router = useRouter();
    try {
        const refreshToken = tokenStorage.getString('refreshToken')
        const response = await axios.post(`${BASE_URL}/refresh-token`,{refreshToken})

        const {newAccessToken,newRefreshToken} = response.data

        tokenStorage.set('accessToken',newAccessToken)
        tokenStorage.set('refreshToken',newRefreshToken)

        return newAccessToken
        
    } catch (error) {
        tokenStorage.clearAll()
        console.log('refresh token error',error)
        Alert.alert('Session expired. Please login again.')
        router.replace('/CustomerLogin')
        

    }
}

export const appAxios = axios.create({
  baseURL: BASE_URL
});

appAxios.interceptors.request.use( async config => {
    const accessToken = tokenStorage.getString('accessToken')
    if(accessToken){
        config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config
})

appAxios.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      try {
        const newAccessToken = await refresh_token();
        
        if (newAccessToken) {
          error.config.headers.Authorization = `Bearer ${newAccessToken}`;
          return axios(error.config);
        }
      } catch (error) {
        console.log("Error refreshing token:", error);
      }
    }
    if(error.response && error.response.status != 401){
        console.log('error',error.response.data.message);
        
        Alert.alert('Error',error.response.data.message || 'Something went wrong')
    }
    return Promise.reject(error);
});
