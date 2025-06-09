import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Link href="/(auth)/CustomerLogin" asChild>
        <Text>Customer Login</Text>
      </Link>
      <Link href="/(auth)/DeliveryPartnerLogin" asChild>
        <Text>Delivery Partner Login</Text>
      </Link>
    </View>
  );
}
