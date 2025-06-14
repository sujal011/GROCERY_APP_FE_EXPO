import { useCartStore } from "@/state/cartStore"
import { Colors, Fonts } from "@/utils/Constants";
import { Pressable, StyleSheet, View } from "react-native"
import CustomText from "./ui/CustomText";
import { RFValue } from "react-native-responsive-fontsize";
import AntDesign from "@expo/vector-icons/AntDesign";

const UniversalAdd = ({item}:{item:any})=>{
    const count = useCartStore(state => state.getItemCount(item._id))
    const {addItem,removeItem} = useCartStore();

    return(
        <View style={[styles.container,{backgroundColor:count === 0 ? '#fff':Colors.secondary}]} >
           {
            count === 0?
            <Pressable onPress={()=>addItem(item)} style={styles.add}>
                <CustomText fontSize={RFValue(7)} fontFamily={Fonts.SemiBold} style={styles.addText}>
                    ADD
                </CustomText>

            </Pressable>
            :(
                <View style={styles.counterContainer}>
                    <Pressable onPress={()=>removeItem(item._id)}>
                        <AntDesign name="minus" color="#FFF" size={RFValue(13)} />
                    </Pressable>
                <CustomText
                    fontFamily={Fonts.SemiBold}
                    style={styles.text}
                    fontSize={RFValue(9)}
                >
                    {count}
                </CustomText>
                <Pressable onPress={()=>addItem(item)}>
                        <AntDesign name="plus" color="#FFF" size={RFValue(13)} />
                    </Pressable>
                </View>
            )
           }
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        alignItems: 'center',
        justifyContent:'center',
        borderWidth:1,
        borderColor:Colors.secondary,
        width:65,
        borderRadius:8
    },
    add:{
        width:'100%',
        alignItems:'center',
        justifyContent:'center',
        paddingHorizontal:2,
        paddingVertical:5,
        margin:0
    },
    addText:{
        color:Colors.secondary,
    },
    counterContainer:{
        flexDirection:'row',
        alignItems:'center',
        width:'100%',
        paddingHorizontal:4,
        paddingVertical:6,
        justifyContent:'space-between'
    },
    text:{
        color:'#fff'
    }
})

export default UniversalAdd