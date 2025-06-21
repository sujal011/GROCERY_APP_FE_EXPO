import { FlatList, StyleSheet } from 'react-native'
import React from 'react'
import { Colors } from '@/utils/Constants'
import ProductItem from './ProductItem'
import { Iproduct } from '@/app/(protected)/ProductCategories'

const ProductList = ({data,width="76%"}:{data:Iproduct[],width?:string,height?:string}) => {
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
        style={[styles.container,{width:width}]}
        contentContainerStyle={[styles.content]}
        numColumns={2}
   />
  )
}

export default ProductList

const styles = StyleSheet.create({
    container:{
        flex:1,
        height:'100%',
        backgroundColor:Colors.backgroundSecondary
    },
    content:{
        marginVertical:10,
        marginHorizontal:10,
        paddingBottom:100
    }
})