
import React from 'react'
import { Stack } from 'expo-router'

const ProtectedLayout = () => {
  return (
    <Stack>
        <Stack.Screen name='DeliveryDashboard' 
        options={{
            headerShown:false
            }}/>
        <Stack.Screen name='DeliveryMap' 
        options={{
            headerShown:false
            }}/>
    </Stack>
  )
}

export default ProtectedLayout