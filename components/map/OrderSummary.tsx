import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Colors } from '@/utils/Constants';

const OrderSummary = ({order}:{order:any}) => {
    const totalPrice = order?.items?.reduce(
        (total:number,cartItem:any)=>{
            return total + cartItem.item.price * cartItem.count
        }, 0
    ) || 0;
  return (
    <View style={styles.container}>
        <View style={styles.flexRow}>
            <View style={styles.iconContainer}>
                
            </View>
        </View>
    </View>
  )
}

export default OrderSummary

const styles = StyleSheet.create({
    img:{
        width:40,
        height:40
    },
    imgContainer:{
        backgroundColor:Colors.backgroundSecondary,
        padding:10,
        borderRadius:15,
        width:'17%'
    },
    container:{
        width:'100%',
        borderRadius:15,
        marginVertical:15,
        paddingVertical:10,
        backgroundColor:'#fff'
    },
    iconContainer:{
        backgroundColor:Colors.backgroundSecondary,
        borderRadius:100,
        padding:10,
        justifyContent:'center',
        alignItems:'center'
    },
    flexRow:{
        flexDirection:'row',
        alignItems:'center',
        gap:10,
        padding:10,
        borderBottomWidth:0.7,
        borderColor:Colors.border,
    }
})