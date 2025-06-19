import { FlatList, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useAuthStore } from '@/state/authStore'
import { useCartStore } from '@/state/cartStore'
import { fetchCustomerOrders } from '@/services/orderService'
import CustomHeader from '@/components/ui/CustomHeader'
import ProfileOrderItem from '@/components/profile/ProfileOrderItem'
import CustomText from '@/components/ui/CustomText'
import { RFValue } from 'react-native-responsive-fontsize'
import { Fonts } from '@/utils/Constants'
import WalletSection from '@/components/profile/WalletSection'
import ActionButton from '@/components/profile/ActionButton'
import { Storage, tokenStorage } from '@/state/storage'
import { useRouter } from 'expo-router'

const renderOrders = ({item,index}:any)=>{
  return (
    <ProfileOrderItem item={item} index={index} />
  )
}


const Profile = () => {
const [orders, setOrders] = useState([])
const { logout, user } = useAuthStore()
const { clearCart } = useCartStore()
const router = useRouter()

const fetchOrders = async () => {
  const data = await fetchCustomerOrders(user?._id)
  setOrders(data)
}

const renderHeader = ()=>{
  return (
  <View>
    <CustomText fontSize={RFValue(15)} fontFamily={Fonts.SemiBold} >
      Your account
    </CustomText>
    <CustomText fontSize={RFValue(10)} fontFamily={Fonts.Medium} >
     {user?.phone}
    </CustomText>
    <WalletSection />

    <CustomText fontSize={RFValue(9)}  style={styles.informativeText} >
      YOUR INFORMATION
    </CustomText>
    <ActionButton icon='book-outline' label='Address book' />
    <ActionButton icon='information-circle-outline' label='About us' />
    <ActionButton icon='log-out-outline' label='Log out' onPress={()=>{
      clearCart();
      logout();
      tokenStorage.clearAll()
      Storage.clearAll()
      router.replace('/CustomerLogin')
    }}/>
    <CustomText fontSize={RFValue(9)}  style={styles.pastText} >
      PAST ORDERS
    </CustomText>

  </View>
  )
}


useEffect(() => {
  fetchOrders()
}, [])
  return (
    <View style={styles.container}>
      <CustomHeader title='Profile'/>
      <FlatList 
      data={orders}
      ListHeaderComponent={renderHeader}
      renderItem={renderOrders}
      keyExtractor={(item:any)=>item?.orderId}
      contentContainerStyle={styles.scrollViewContent}
      />
    </View>
  )
}

export default Profile

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollViewContent: {
    padding: 10,
    paddingTop: 20,
    paddingBottom: 100,
  },
  informativeText: {
    opacity: 0.7,
    marginBottom: 20,
  },
  pastText: {
    marginVertical: 20,
    opacity: 0.7,
  },
};