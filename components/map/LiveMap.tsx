import { View, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { screenHeight } from '@/utils/Scaling'
import { Colors } from '@/utils/Constants'
import { useMapRefStore } from '@/state/mapStore'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { RFValue } from 'react-native-responsive-fontsize'
import { handleFitToPath } from './mapUtils'
import MapViewComponent from './MapViewComponent'

export interface LiveMapProps{
    deliveryPersonLocation: any,
    pickupLocation: any,
    deliveryLocation: any,
    hasPickedUp: boolean,
    hasAccepted: boolean,
}

const LiveMap = ({deliveryLocation,deliveryPersonLocation,hasAccepted,hasPickedUp,pickupLocation}:LiveMapProps) => {
    const {mapRef,setMapRef} = useMapRefStore()

    useEffect(()=>{
        if(mapRef){
            handleFitToPath(
                mapRef,
                deliveryLocation,
                pickupLocation,
                hasPickedUp,
                hasAccepted,
                deliveryPersonLocation
            )
        }
    },[
        mapRef,
        deliveryLocation,
        deliveryPersonLocation,
        hasAccepted,
        hasPickedUp,
        pickupLocation
    ])

  return (
    <View style={styles.container}>
        <MapViewComponent 
        mapRef={mapRef}
        setMapRef={setMapRef}
        hasAccepted={hasAccepted}
        deliveryLocation={deliveryLocation}
        deliveryPersonLocation={deliveryPersonLocation}
        pickupLocation={pickupLocation}
        hasPickedUp={hasPickedUp}
        />
        <TouchableOpacity
        style={styles.fitButton}
        onPress={()=>{
            handleFitToPath(
                mapRef,
                deliveryLocation,
                pickupLocation,
                hasPickedUp,
                hasAccepted,
                deliveryPersonLocation
            )
        }}
        >
            <MaterialCommunityIcons name='target' size={RFValue(13)} color={Colors.text}/>
        </TouchableOpacity>

    </View>
  )
}

export default LiveMap

const styles = StyleSheet.create({
    container:{
        height:screenHeight * 0.35,
        width:'100%',
        borderRadius:15,
        backgroundColor:"#fff",
        overflow:'hidden',
        borderWidth:1,
        borderColor:Colors.border,
        position:'relative'
    },
    fitButton:{
        position:'absolute',
        bottom:10,
        right:10,
        padding:5,
        backgroundColor:'#fff',
        borderWidth:0.8,
        borderColor:Colors.border,
        shadowOffset:{width:1,height:2},
        shadowOpacity:0.2,
        shadowColor:"black",
        shadowRadius:10,
        elevation:5,
        borderRadius:35,
    }
})