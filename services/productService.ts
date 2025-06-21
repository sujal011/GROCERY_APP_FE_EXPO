import axios from "axios"
import { BASE_URL } from "./config"

export const getAllCategories = async () =>{
    try {
        const response = await axios.get(`${BASE_URL}/categories`)        
        return response.data
    } catch (error) {
        throw error
    }
}

export const getProductsByCategories = async (id:string) =>{
    try {
        const response = await axios.get(`${BASE_URL}/products/${id}`)
        return response.data
    } catch (error) {
        throw error
    }
}

export const getProductsBySearch = async (name:string) =>{
    try {
        const response = await axios.get(`${BASE_URL}/products/search?name=${name}`)
        return response.data
    } catch (error) {
        throw error
    }
}