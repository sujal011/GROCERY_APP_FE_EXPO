import axios from "axios"
import { Alert, Platform } from "react-native";
import { GOOGLE_MAPS_API_KEY_ANDROID, GOOGLE_MAPS_API_KEY_IOS } from "./config";
import { updateUserLocation } from "./authService";

export async function reverseGeoCode(latitude: number, longitude: number,setUser: any) {
    const GOOGLE_MAPS_API_KEY = Platform.OS === 'ios' ? GOOGLE_MAPS_API_KEY_IOS : GOOGLE_MAPS_API_KEY_ANDROID;
    try{
        const response = await axios.get(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_MAPS_API_KEY}`
        )
        if(response.data.status == 'OK'){
            const address = response.data.results[0].formatted_address;
            updateUserLocation({
                livelocation:{
                    latitude,
                    longitude,
                },
                address,
            },setUser)
        }else{
            Alert.alert('Error fetching user location. Please try again.')
            console.error('Error fetching user location. Please try again.',response.data)
        }

    }catch(error){
        console.error(error)
    }


}