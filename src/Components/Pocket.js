import {StyleSheet, Text, View} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import Pile from './Pile';
import React, {useMemo, useRef, useEffect} from 'react'; // Add useEffect here
import {useDispatch} from 'react-redux';
import {unfreezDice} from './redux/reducers/gameSlice';

const Pocket = React.memo(({color, player, data}) => {
  const dispatch = useDispatch();
  const handlePress = async value => {
    let playerNo = value?.id[0];
    switch (playerNo) {
      case 'A':
        playerNo = 'player1';
        break;
      case 'B':
        playerNo = 'player2';
        break;
      case 'C':
        playerNo = 'player3';
        break;
      case 'D':
        playerNo = 'player4';
        break;
    }

    dispatch(
      updatePlayerPieceValue({
        playerNo: playerNo,
        pieceId: value.id,
        pos: startingPoints[parseInt(playerNo.match(/\d+/)[0], 10) - 1],
        traverCount: 1,
      }),
    );
    dispatch(unfreezDice());
  };
  useEffect(() => {
    console.warn(color);
  }, []);
  return (
    <View style={[styles.container, {backgroundColor: color}]}>
      <View style={styles.childFrame}>
        <View style={styles.flexrow}>
          <Plot
            pieceNo={0}
            onPress={handlePress}
            data={data}
            player={player}
            color={color}
          />
          <Plot
            pieceNo={1}
            onPress={handlePress}
            data={data}
            player={player}
            color={color}
          />
        </View>

        <View style={[styles.flexrow, {marginTop: 20}]}>
          <Plot pieceNo={0} onPress={handlePress} data={data} player={player} color={color} />
          <Plot pieceNo={1} onPress={handlePress} data={data} player={player} color={color} />
        </View>
      </View>
    </View>
  );
});

const Plot = ({pieceNo, player, color,data,onPress}) => {
  return (
    <View style={[styles.plot, {backgroundColor: color}]}>
      {data && data[pieceNo[0] == onPress[0]]?
       <Pile color={color} player={player} />
    :''}
     
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
