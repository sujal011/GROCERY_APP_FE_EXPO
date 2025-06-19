import { View, StyleSheet } from 'react-native';
import React from 'react';
import CustomText from '../ui/CustomText'; // Replace with your actual CustomText component import
import Ionicons from '@expo/vector-icons/Ionicons';
import { Colors, Fonts } from '@/utils/Constants';
import { RFValue } from 'react-native-responsive-fontsize';

type WalletItemProps = {
    icon: string;
    label: string;
};

const WalletItem= ({ icon, label }:WalletItemProps) => {
    return (
        <View style={styles.walletItemContainer}>
            <Ionicons name={icon} color={Colors.text} size={RFValue(20)}/>
            <CustomText fontSize={RFValue(8)} fontFamily={Fonts.Medium}>{label}</CustomText>
        </View>
    );
};

const styles = StyleSheet.create({
    walletItemContainer: {
        alignItems: 'center',
    },
});

export default WalletItem;