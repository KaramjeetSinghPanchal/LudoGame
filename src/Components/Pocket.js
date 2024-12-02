import {StyleSheet, Text, View} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import Pile from './Pile';
import React, { useMemo, useRef, useEffect } from 'react'; // Add useEffect here

const Pocket = React.memo(({color, player}) => {
  useEffect(() => {
    console.warn(color);
  }, []);
  return (
    <View style={[styles.container, {backgroundColor: color}]}>
      <View style={styles.childFrame}>

        <View style={styles.flexrow}>
          <Plot pieceNo={0} player={player} color={color} />
          <Plot pieceNo={1} player={player} color={color} />
        </View>

        <View style={[styles.flexrow, {marginTop: 20}]}>
          <Plot pieceNo={0} player={player} color={color} />
          <Plot pieceNo={1} player={player} color={color} />
        </View>

      </View>

      
    </View>

    
  );
});

const Plot = ({pieceNo, player, color}) => {
  return (
    <View style={[styles.plot, {backgroundColor: color}]}>
      <Pile color={color} player={player} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 0.4,
    justifyContent: 'center',
    alignItems: 'center',
    width: '40%',
    height: '100%',
  },
  childFrame: {
    backgroundColor: 'white',
    width: '70%',
    height: '70%',
    borderWidth: 0.4,
    padding: 15,
    borderColor: Colors.borderColor,
  },
  flexrow: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: '40%',
  },
  // plot: {
  //   height:'80%',
  //   width:'36%',
  //   borderWidth:
  // },
});

export default Pocket;
