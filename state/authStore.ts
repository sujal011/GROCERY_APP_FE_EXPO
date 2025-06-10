import { create } from "zustand";
import { persist,createJSONStorage } from "zustand/middleware";
import { mmkvStorage } from "./storage";

interface AuthStore{
    user:Record<string,any> | null;
    setUser: (user:any) => void;
    setCurrentOrder: (order:any) => void;
    currentOrder: Record<string,any> | null;
    logout:() => void;
}

export const useAuthStore = create<AuthStore>()(
    persist(
        (set,get)=>({
            user:null,
            currentOrder:null,
            setUser:(data:any)=>set({user:data}),
            setCurrentOrder:(order:any)=>set({currentOrder:order}),
            logout:()=>{
                mmkvStorage.removeItem('accessToken')
                mmkvStorage.removeItem('refreshToken')
                set({user:null,currentOrder:null})
            }

        }),
        {
            name:'auth-storage',
            storage:createJSONStorage(()=>mmkvStorage),
        }
    )
)