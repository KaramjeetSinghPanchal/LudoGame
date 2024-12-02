import { StyleSheet, Text, View } from 'react-native'
import React, { useMemo } from 'react'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import Pile from './Pile'
// import {ArrowRightIcon, StarIcon} from 'react-native-heroicon'
import { ArrowRightIcon,StarIcon } from 'react-native-heroicons/outline';
import { SafeSpots,StarSpot,ArrowSpot } from '../helpers/PlotData'
import { RFValue } from 'react-native-responsive-fontsize'
const Cell = ({cell,color,index,id}) => {

  const isSafeSpot = useMemo(() => {
    return Array.isArray(SafeSpots) && SafeSpots?.includes(id);
  }, [id, SafeSpots]);

const isStarSpot = useMemo(() => {
  return Array.isArray(StarSpot) && StarSpot?.includes(id);
}, [id, StarSpot]);

const isArrowSpot = useMemo(() => {
  return Array.isArray(ArrowSpot) && ArrowSpot?.includes(id);
}, [id, ArrowSpot]);
 
  return ( 
 
    <View style={[styles.container,{
      backgroundColor:isSafeSpot?color:'white'
    },
    ]}>
      {isStarSpot && <StarIcon size={20} color="gray"/>}
      {isArrowSpot && (
        <ArrowRightIcon
  style={{
    transform: [
      {
        rotate:
          id === 38 ? '180deg' : id === 25 ? '90deg' : id === 51 ? '-90deg' : '0deg',
      },
    ],
  }}
  size={RFValue(12)}
/>

      )}
    {/* <Pile
    cell={true}
    player={2}
    onpress={()=>{}}
    pieceId={2}
    color={Colors.green}
    /> */}
    {/* <Text>{id}</Text> */}
    </View>

  )
}

export default React.memo(Cell)

const styles = StyleSheet.create({
  container:{
    borderWidth:0.4,
    borderColor:Colors.borderColor,
    width:'100%',
    height:'100%',
    justifyContent:'center',
    alignItems:'center'
  },
  pieceContainer:{
    position:'absolute',
    top:0,
    bottom:0,
    zIndex:99 
  }
})