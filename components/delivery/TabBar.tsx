import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Colors, Fonts } from '@/utils/Constants'
import CustomText from '../ui/CustomText';
import { RFValue } from 'react-native-responsive-fontsize';

interface TabBarProps {
    selectedTab : 'available' | 'delivered';
    onTabChange : (tab: 'available' | 'delivered') => void;
}

const TabBar = ({selectedTab,onTabChange}:TabBarProps) => {
  return (
    <View style={styles.tabContainer}>
        <TouchableOpacity
        activeOpacity={0.7}
        style={[styles.tab, selectedTab === 'available' && styles.activeTab]}
        onPress={() => onTabChange('available')}
        >
            <CustomText fontSize={RFValue(11)}
            fontFamily={Fonts.SemiBold}
            style={[
                styles.tabText,
                selectedTab === 'available' 
                ? styles.activeTabText 
                : styles.inactiveTabText
            ]}
            >
                Available
            </CustomText>

        </TouchableOpacity>

        <TouchableOpacity
        activeOpacity={0.7}
        style={[styles.tab, selectedTab !== 'available' && styles.activeTab]}
        onPress={() => onTabChange('delivered')}
        >
            <CustomText fontSize={RFValue(11)}
            fontFamily={Fonts.SemiBold}
            style={[
                styles.tabText,
                selectedTab !== 'available' 
                ? styles.activeTabText 
                : styles.inactiveTabText
            ]}
            >
                Delivered
            </CustomText>

        </TouchableOpacity>
    </View>
  )
}

export default TabBar

const styles = StyleSheet.create({
    tabContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 10,
    },
    tab: {
        paddingVertical: 10,
        borderRadius: 25,
        borderWidth: 2,
        width: '38%',
        margin: 10,
        borderColor: Colors.border,
        alignItems: 'center',
    },
    activeTab: {
        backgroundColor: Colors.secondary,
        borderColor: Colors.secondary,
    },
    tabText: {
        color: Colors.text,
    },
    activeTabText: {
        color: '#fff',
    },
    inactiveTabText: {
        color: Colors.disabled,
    },
})