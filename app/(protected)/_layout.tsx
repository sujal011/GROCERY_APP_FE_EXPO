import { Stack } from 'expo-router'

const ProtectedLayout = () => {

  return (
    <Stack>
        <Stack.Screen name='ProductDashboard' 
        options={{
            headerShown:false
            }}/>
        <Stack.Screen name='ProductCategories' 
        options={{
          headerShown:false
        }}/>
        <Stack.Screen name='OrderPage' 
        options={{
            headerShown:false
            }}/>
        <Stack.Screen name='OrderSuccess' 
        options={{
            headerShown:false
            }}/>
        <Stack.Screen name='LiveTracking' 
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