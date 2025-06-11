import { NoticeHeight } from '@/utils/Scaling'
import { View, Text, StyleSheet, Animated } from 'react-native'
import React from 'react'
import Notice from './Notice'
const NOTICE_HEIGHT = -(NoticeHeight + 12)

export default function NoticeAnimation({ noticePosition, children }: { noticePosition: any, children: React.ReactNode }) {
    return (
        <View style={styles.container}>
            <Animated.View style={[styles.noticeContainer, { transform: [{ translateY: noticePosition }] }]}>
                <Notice />
            </Animated.View>
            <Animated.View style={[styles.contentContainer, {
                paddingTop: noticePosition.interpolate({
                    inputRange: [NOTICE_HEIGHT, 0],
                    outputRange: [0, NOTICE_HEIGHT+20]
                })
            }]}>
                {children}
            </Animated.View>
        </View>
    )
}

const styles = StyleSheet.create({
    noticeContainer: {
        width: '100%',
        zIndex: 999,
        position: 'absolute'
    },
    contentContainer: {
        flex: 1,
        width: '100%'
    },
    container: {
        flex: 1,
        backgroundColor: '#fff'
    }
});