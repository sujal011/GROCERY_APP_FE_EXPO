import axios from "axios"
import { Alert } from "react-native";
import { updateUserLocation } from "./authService";
import { GO_MAPS_API_KEY } from "./config";

export async function reverseGeoCode(latitude: number, longitude: number,setUser: any) {
    try{
        const response = await axios.get(
            `https://maps.gomaps.pro/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GO_MAPS_API_KEY}`
        )
        if(response.data.status === 'OK'){
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