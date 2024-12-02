import { StyleSheet, Text, View } from 'react-native'
import React, { useMemo } from 'react'
import Cell from './Cell';

const HorizontalPath = React.memo(({cells,color}) => 
  {
    const groupedCells = useMemo(()=>{
      const groups = []
      for(i=0;i<cells.length;i+=6)
      {
        groups.push(cells.slice(i,i+6))
      }
      return groups;
    },[cells]);
  return (
    <View style={{flexDirection:'column',
      alignItems:'center',
      width:'40%',
      height:'100%'
    }}>
     {groupedCells.map((group,groupIndex)=>(
      <View key={`gruop=${groupIndex}`} style={{flexDirection:'row',width:'16.7%',height:'33.3%',justifyContent:'center'}}  >
        {group.map((id)=>{
          return(
            <Cell key={`cell-${id}`} cell={true} id={id} color={color}/>
          )
          
        })}
      </View>
     ))}
    </View>
  )
});

export default HorizontalPath

const styles = StyleSheet.create({})
