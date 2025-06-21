import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Colors, Fonts } from '@/utils/Constants';
import Feather from '@expo/vector-icons/Feather';
import { RFValue } from 'react-native-responsive-fontsize';
import RollingBar from 'react-native-rolling-bar'
import CustomText from '../ui/CustomText';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useRouter } from 'expo-router';

const searchItems = ['Search "sweets"','Search "milk"',"Search for ata,dal,coke",'Search "chips"', 'Search "Pooja thali"']

const SearchBar = ({ onPress }: { onPress?: () => void }) => {
    const router = useRouter();
    return (
        <TouchableOpacity style={styles.container} activeOpacity={0.8} onPress={onPress ? onPress : () => router.push('/SearchScreen')}>
            <Feather name="search" size={RFValue(20)} color={Colors.text} />
            <RollingBar interval={3000} defaultStyle={false} customStyle={styles.textContainer}>
               {
                searchItems.map((item,index)=>(
                    <CustomText 
                    variant='h6'
                    fontFamily={Fonts.Medium}
                    key={index}
                    >
                        <Text>{item}</Text>
                    </CustomText>
                ))
               }
            </RollingBar>
            <View style={styles.divider} />
            <FontAwesome name="microphone" size={RFValue(20)} color={Colors.text} />

        </TouchableOpacity>
    );
};

export default SearchBar;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F3F4F7',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 10,
        borderWidth: 0.6,
        borderColor: Colors.border,
        marginTop: 15,
        overflow: 'hidden',
        marginHorizontal: 10,
        paddingHorizontal: 10,
    },
    textContainer: {
        width: '90%',
        paddingLeft: 10,
        height: 50,
    },
    divider: {
        width: 1,
        height: 24,
        backgroundColor: '#ddd',
        marginHorizontal: 10,
    },
});