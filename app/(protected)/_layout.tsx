
import React, { useEffect, useState } from 'react'
import { SplashScreen, Stack, useRouter } from 'expo-router'
import { useAuthStore } from "@/state/authStore";
import { tokenStorage } from "@/state/storage";
import { jwtDecode } from "jwt-decode";
import { Alert } from "react-native";
import { refetchUser } from "@/services/authService";
import { refresh_token } from '@/services/apiInterceptors';

interface DecodedToken{
    exp:number,
}

const ProtectedLayout = () => {
  const [isReady,setIsReady] = useState(false)
  const router = useRouter()

  const {user,setUser} = useAuthStore()
    useEffect(() => {
        
        const tokenCheck = async () => {
          const accessToken = tokenStorage.getString('accessToken') as string;
          const refreshToken = tokenStorage.getString('refreshToken') as string;
      
          if(!accessToken || !refreshToken) return router.replace('/CustomerLogin')
      
          const decodedAccessToken = jwtDecode<DecodedToken>(accessToken);
          const decodedRefreshToken = jwtDecode<DecodedToken>(refreshToken);
      
          const currentTime = Date.now() / 1000;
      
          if(decodedRefreshToken.exp < currentTime) {
            Alert.alert('Session expired. Please login again.')
            return router.replace('/CustomerLogin')
          }
          if(decodedAccessToken.exp < currentTime){
            try {
              refresh_token()
              await refetchUser(setUser)
            } catch (error) {
              console.log(error);
              Alert.alert('Error refreshing token. Please login again.')
              return router.replace('/CustomerLogin')
            }
          }
          if(user?.role === 'Customer'){
            router.replace('/ProductDashboard')
          }
          if(user?.role === 'Delivery'){
            router.replace('/DeliveryDashboard')
          }
          setIsReady(true)
          SplashScreen.hideAsync();
        }
        tokenCheck()
        
      },[])

      if(!isReady) return null

  return (
    <Stack>
        <Stack.Screen name='ProductDashboard' 
        options={{
            headerShown:false
            }}/>
        <Stack.Screen name='(delivery)' 
        options={{
            headerShown:false
            }}/>
    </Stack>
  )
}

export default ProtectedLayout