import { FlatList, StyleSheet } from 'react-native'
import React from 'react'
import { Colors } from '@/utils/Constants'
import ProductItem from './ProductItem'
import { Iproduct } from '@/app/(protected)/ProductCategories'

const ProductList = ({data}:{data:Iproduct[]}) => {
    const renderItem =({item,index}:any)=>{
return (
    <ProductItem item={item} index={index} />
)
    }
  return (
   <FlatList
        data={data}
        keyExtractor={item=>item._id} 
        renderItem={renderItem}
        style={styles.conntainer}
        contentContainerStyle={styles.content}
        numColumns={2}
   />
  )
}

export default ProductList

const styles = StyleSheet.create({
    conntainer:{
        flex:1,
        height:'100%',
        backgroundColor:Colors.backgroundSecondary
    },
    content:{
        paddingVertical:10,
        paddingBottom:100 
    }
})