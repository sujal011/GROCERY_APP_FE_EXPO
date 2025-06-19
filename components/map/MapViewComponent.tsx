import React from 'react'
import { LiveMapProps } from './LiveMap'
import MapView,{Polyline} from 'react-native-maps'
import MapViewDirections from "react-native-maps-directions"
import { customMapStyle } from '@/utils/CustomMap'
import Markers from './Markers'
import {getPoints} from "@/utils/getPoints"
import { Colors } from '@/utils/Constants'
import { GOOGLE_MAPS_API_KEY_ANDROID, GOOGLE_MAPS_API_KEY_IOS } from '@/services/config'
import { Platform } from 'react-native'

interface MapViewComponentProps extends LiveMapProps{
    mapRef:any,
    setMapRef:any,
    camera?:any
}

const MapViewComponent = ({deliveryLocation,pickupLocation,deliveryPersonLocation,hasAccepted,hasPickedUp,mapRef,setMapRef,camera}:MapViewComponentProps) => {

  return (
    <MapView
    ref={setMapRef}
    style={{flex:1}}
    provider='google'
    camera={camera}
    customMapStyle={customMapStyle}
    showsUserLocation={true}
    userLocationCalloutEnabled={true}
    userLocationPriority='high'
    showsTraffic={false}
    pitchEnabled={false}
    followsUserLocation={true}
    showsCompass={true}
    showsBuildings={false}
    showsIndoors={false}
    showsScale={false}
    showsIndoorLevelPicker={false}
    >

        {
            deliveryPersonLocation && (hasPickedUp||hasAccepted) &&(
                <MapViewDirections 
                origin={deliveryPersonLocation}
                destination={hasAccepted?pickupLocation:deliveryLocation}
                precision='high'
                apikey={Platform.OS ==="android" ? GOOGLE_MAPS_API_KEY_ANDROID:GOOGLE_MAPS_API_KEY_IOS}
                strokeColor='#2871F2'
                strokeWidth={5}
                onError={err=>{
                    console.error(err)
                }}
                />
            )
        }
        <Markers 
        deliveryLocation={deliveryLocation}
        deliveryPersonLocation={deliveryPersonLocation}
        pickupLocation={pickupLocation}
        />

        {!hasPickedUp && deliveryLocation && pickupLocation && (
            <Polyline 
            coordinates={getPoints([pickupLocation,deliveryLocation])}
            strokeColor={Colors.text}
            strokeWidth={2}
            geodesic={true}
            lineDashPattern={[12,10]}
            />
        )}
    </MapView>
  )
}

export default MapViewComponent