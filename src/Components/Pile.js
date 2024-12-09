import {
  StyleSheet,
  Text,
  View,
  Animated,
  Easing,
  TouchableOpacity,
} from 'react-native';
import React, {useCallback, useEffect, useMemo, useRef} from 'react';
import {Image} from 'react-native';
import {BackgroundImage} from '../helpers/GetIcon';
import {Circle, Svg} from 'react-native-svg';
import {useSelector} from 'react-redux';
import {
  selectCellSelection,
  selectDiceNo,
  selectPocketPileSelection,
} from './redux/reducers/gameSelectors';
const Pile = ({color, cell, player, onPress, pieceId}) => {
  const rotation = useRef(new Animated.Value(0)).current;
  const currentPlayerPileSelection = useSelector(selectPocketPileSelection);
  const currentPlayerCellSelection = useSelector(selectCellSelection);
  const diceNo = useSelector(selectDiceNo);
  const playerpieces = useSelector(state => state.game[`player${player}`]);
  const pileImage = BackgroundImage.GetImage(color);

  const isPileEnabled = useMemo(
    () => player === currentPlayerCellSelection,
    [player, currentPlayerCellSelection],
  );

  const isCellEnabled = useMemo(
    () => player === currentPlayerCellSelection,
    [player, currentPlayerCellSelection],
  );

const isForwardable = useCallback(()=> {
  const piece = playerpieces?.find(item=> item.is === pieceId)
  return piece && piece.travelCount + diceNo
},[playerpieces, pieceId,diceNo] )

  useEffect(() => {
    const rotateAnimation = Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    );
    rotateAnimation.start();
    return () => rotateAnimation.stop();
  }, [rotation]);

  const rotateInterpolate = useMemo(
    () =>
      rotation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
      }),
    [rotation],
  );
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.hollowCircle}>
        <View style={styles.dashedCircleContainer}>
          <Animated.View
            style={[
              styles.dashedCircle,
              {transform: [{rotate: rotateInterpolate}]},
            ]}>
            <Svg height="18" width="18">
              <Circle
                cx="10"
                cy="10"
                r="8"
                stroke="red"
                strokeWidth="2"
                strokeDasharray="8 8"
                strokeDashoffset="0"
                fill="transparent"
              />
            </Svg>
          </Animated.View>
        </View>
        <Image
          source={pileImage}
          style={{
            width: 32,
            height: 32,
            position: 'abolute',
            bottom: 30,
            left: -5,
          }}
        />
      </View>
    </TouchableOpacity>
  );
};

export default Pile;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    alignSelf: 'center',
  },
  hollowCircle: {
    width: 25,
    height: 25,
    position: 'absolute',
    borderRadius: 25,
    borderWidth: 2,
    borderColor: 'black',
    justifyContent: 'center',
    marginLeft: -12,
    bottom: -2,
  },
  dashedCircleContainer: {
    marginTop: 40,
  },
  dashedCircle: {
    marginTop: -15,
  },
});
