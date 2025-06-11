import { imageData } from '@/utils/dummyData';
import { screenWidth } from '@/utils/Scaling';
import AutoScroll from '@homielab/react-native-auto-scroll';
import React, { useMemo } from 'react';
import { Image, StyleSheet, View } from 'react-native';

const MemoizedRow = React.memo(({row,rowIndex}:{row:typeof imageData;rowIndex:number}) => {
    return (
        <View style={styles.row}>
            {row.map((image, index) => {
                const horizontalShift = rowIndex % 2 === 0? -18:18;
                return (
                    <View key={index} style={[styles.itemContainer,{transform:[{translateX:horizontalShift}]}]}>
                        <Image source={image} style={styles.image} />
                    </View>
                )
            })}
        </View>
    )
});
MemoizedRow.displayName = 'MemoizedRow';


const ProductSlider = () => {
    const rows = useMemo(() => {
        const result = [];
        for(let i = 0; i < imageData.length; i += 4) {
            result.push(imageData.slice(i, i + 4));
        }
        return result;
    },[])
  return (
    <View pointerEvents='none'>
      <AutoScroll duration={100000} endPaddingWidth={0} style={styles.autoScroll}>
            <View style={styles.autoScrollContainer}>
                {rows.map((row, index) => (
                    <MemoizedRow key={index} row={row} rowIndex={index}/>
                ))}
            </View>
       </AutoScroll>
    </View>
  )
}

export default ProductSlider

const styles = StyleSheet.create({
    autoScroll: {
        position: 'absolute',
        zIndex: -2
    },
    autoScrollContainer: {
        justifyContent:'center',
        alignItems:'center',
        overflow:'visible',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    row: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    itemContainer: {
        marginBottom:12,
        marginHorizontal:10,
        width:screenWidth * 0.26,
        height:screenWidth * 0.26,
        backgroundColor:"#f4f4f4",
        borderRadius:25,
        justifyContent:'center',
        alignItems:'center',
    }
})