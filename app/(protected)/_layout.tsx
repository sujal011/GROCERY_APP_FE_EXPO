import { Stack } from 'expo-router'
import React from 'react'

const ProtectedLayout = () => {

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