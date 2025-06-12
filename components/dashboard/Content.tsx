import { adData, categories } from '@/utils/dummyData'
import { StyleSheet, Text, View } from 'react-native'
import AdCarousal from './AdCarousal'
import { Fonts } from '@/utils/Constants'
import CustomText from '../ui/CustomText'
import CategoryContainer from './CategoryContainer'

export default function Content() {
  return (
    <View style={styles.container}>
      <AdCarousal adData={adData} />
      <CustomText variant='h5' fontFamily={Fonts.SemiBold}>
          Grocery & Kitchen
      </CustomText>
      <CategoryContainer data={categories} />
      <CustomText variant='h5' fontFamily={Fonts.SemiBold}>
          Best Sellers
      </CustomText>
      <CategoryContainer data={categories} />
      <CustomText variant='h5' fontFamily={Fonts.SemiBold}>
          Snacks & Drinks
      </CustomText>
      <CategoryContainer data={categories} />
      <CustomText variant='h5' fontFamily={Fonts.SemiBold}>
         Home & Lifetyle
      </CustomText>
      <CategoryContainer data={categories} />
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    paddingHorizontal:20
  }
})