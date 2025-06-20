import { ActivityIndicator, Alert, StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomHeader from '@/components/ui/CustomHeader'
import { Colors } from '@/utils/Constants'
import Sidebar from '@/components/Products/Sidebar'
import { getAllCategories, getProductsByCategories } from '@/services/productService'
import ProductList from '@/components/Products/ProductList'
import { withCart } from '@/components/cart/WithCart'

export interface Icategory{
  _id:string;
  name:string;
  image?:string
}

export interface Iproduct{
  _id:string;
  name:string;
  price:number;
  image?:string;
  discountPrice:number;
  quantity:string
  category: Icategory;
  description?:string
}

const ProductCategories = () => {

  const [categories,setCategories] =useState<Icategory[]>([])
  const [selectedCategory,setSelectedCategory] =useState<any>(null)
  const [products,setProducts] =useState<Iproduct[]>([])
  const [categoriesLoading,setCategoriesLoading] =useState<boolean>(false)
  const [productsLoading,setProductsLoading] =useState<boolean>(false)

  useEffect(()=>{
    const fetchCategories = async()=>{
      setCategoriesLoading(true)
      try {
        const data = await getAllCategories();
        setCategories(data)
        if(data && data?.length>0){
          setSelectedCategory(data[0])
        }
        
        
      } catch (error: any) {
        Alert.alert('Error fetching Categories', error)
        console.log('Error fetching Categories', error)
      } finally{
        setCategoriesLoading(false)
      }
    }

    fetchCategories()
  },[])

  useEffect(()=>{
    const fetchProducts = async(categoryId:string)=>{
      setProductsLoading(true)
      try {
        const data = await getProductsByCategories(categoryId);
        setProducts(data)
      } catch (error: any) {
        Alert.alert('Error fetching Products', error)
        console.log('Error fetching Products', error)
      } finally{
        setProductsLoading(false)
      }
    }

    if(selectedCategory?._id){
      fetchProducts(selectedCategory?._id)
    }
  },[selectedCategory])


  return (
    <View style={styles.mainContainer}>
      <CustomHeader title={selectedCategory?.name || 'Categories'} search/>
      <View style={styles.subContainer}>
        {
          categoriesLoading ?
          <ActivityIndicator size='small' color={Colors.border} style={{width:'24%'}}/>
          :
          <Sidebar 
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryPress={(category:any)=>setSelectedCategory(category)}
          />
        }

        {productsLoading ? (
          <ActivityIndicator
              size="large"
              color={Colors.border}
              style={styles.center}
          />
        ) :(
          <ProductList data={products}/>
        )
      
      }

      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  mainContainer:{
    flex:1,
    margin:0,
    padding:0,
    width:'100%',
    height:'100%'
  },
  subContainer:{
    flex:1,
    flexDirection:"row",
    alignItems:"center",
    height:"100%",
    width:'100%',
  },
  center:{
    flex:1,
    justifyContent:"center",
    alignItems:"center"
  }
})

export default withCart(ProductCategories)