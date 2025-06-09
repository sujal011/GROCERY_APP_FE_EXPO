import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="CustomerLogin"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="DeliveryPartnerLogin"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
} 