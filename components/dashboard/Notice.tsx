import { View, StyleSheet } from 'react-native'
import React from 'react'
import { NoticeHeight } from '@/utils/Scaling'
import CustomText from '../ui/CustomText';
import { Fonts } from '@/utils/Constants';
import { Defs, G, Path, Svg, Use } from 'react-native-svg';
import { wavyData } from '@/utils/dummyData';

export default function Notice() {
    return (
        <View style={{ height: NoticeHeight, width: '100%', overflow: 'hidden' }}>
            <View style={styles.container}>
                <View style={styles.noticeContainer}>
                    <CustomText
                        style={styles.heading}
                        variant='h6'
                        fontFamily={Fonts.SemiBold}
                    >
                        It&apos;s raining near this location
                    </CustomText>
                    <CustomText
                        variant='h9'
                        style={styles.textCenter}
                    >
                        Our delivery partners may take longer to reach you.
                    </CustomText>
                </View>
            </View>
            <Svg
                width='100%'
                height='35'
                fill='#CCD5E4'
                viewBox='0 0 4000 1000'
                style={styles.wave}
            >
                <Defs>
                    <Path id='wavepath' d={wavyData} />
                </Defs>
                <G>
                    <Use href="#wavepath" y="321" />
                </G>
            </Svg>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#CCD5E4',
        width: '100%'
    },
    noticeContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#CCD5E4',
        width: '100%'
    },
    textCenter: {
        textAlign: 'center',
        marginBottom: 8
    },
    heading: {
        color: '#2D3875',
        marginBottom: 8,
        textAlign: 'center'
    },
    wave: {
        width: '100%',
        transform: [{ rotateX: '180deg' }]
    }
});