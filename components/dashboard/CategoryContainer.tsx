import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import ScalePress from '../ui/ScalePress'
import { useRouter } from 'expo-router'
import CustomText from '../ui/CustomText'
import { Fonts } from '@/utils/Constants'
import { RFValue } from 'react-native-responsive-fontsize'

const CategoryContainer = ({data}:{data:any}) => {
    const router = useRouter()

    const renderItems=(items:any[])=>{
        return (
            <>
            {items?.map((item,index)=>{
                return (
                    <ScalePress key={index} style={styles.item} onPress={()=>router.navigate("/ProductCategories")}>

                        <View style={styles.imageContainer}>
                            <Image source={item?.image} style={styles.image} />

                        </View>
                        <CustomText style={styles.text} fontSize={RFValue(8)} fontFamily={Fonts.Medium} >
                                <Text>{item?.name}</Text>
                        </CustomText>

                    </ScalePress>
                )
                })
            }
            </>
        )
    }

  return (
    <View style={styles.container}>
        <View style={styles.row}>
            {renderItems(data?.slice(0,4))}
        </View>
        <View style={styles.row}>
            {renderItems(data?.slice(4))}
        </View>
      
    </View>
  )
}

export default CategoryContainer

const styles = StyleSheet.create({
    container: {
        marginVertical: 15,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 25,
    },
    text: {
        textAlign: 'center',
    },
    item: {
        width: '22%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageContainer: {
        width: '100%',
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        padding: 6,
        backgroundColor: "#E5F3F3",
        marginBottom: 8,
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
});
