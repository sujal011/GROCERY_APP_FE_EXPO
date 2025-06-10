import {MMKV} from "react-native-mmkv"

export const tokenStorage = new MMKV({
    id:'token-storage',
    encryptionKey:'sujal011@grocerystorage'
})

export const Storage = new MMKV({
    id:'my-app-storage',
    encryptionKey:'sujal011@grocerystorage'
})

export const mmkvStorage = {
    setItem:(key:string,value:string)=>{
        Storage.set(key,value)
    },
    getItem:(key:string)=>{
        const value = Storage.getString(key)
        return value ?? null
    },
    removeItem:(key:string)=>{
        Storage.delete(key)
    }
    
}