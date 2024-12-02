import {Alert, StyleSheet, Text, Animated, View, Easing} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {LinearGradient} from 'react-native-svg';
import {BackgroundImage} from '../helpers/GetIcon';
import {Image} from 'react-native';
import LottieView from 'lottie-react-native';
import DiceRoll from '../assets/animation/diceroll.json';
import {TouchableOpacity} from 'react-native'; // Correct import
import LottieAnimationView from 'lottie-react-native';
import Arrow from '../assets/images/arrow.png';
const Dice = React.memo(({color, rotate, player, data}) => {
  const diceNo = 5;
  const pileIcon = BackgroundImage.GetImage(color);
  const diceIcon = BackgroundImage.GetImage(diceNo - 1);
  const arrowAnim = useRef(new Animated.Value(0)).current;

  const [diceRolling, setDiceRolling] = useState(false);
  useEffect(() => {
    const animareArrow = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(arrowAnim, {
            toValue: 10,
            duration: 600,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
          }),
        ]),
      ).start();
    };
    animareArrow();
  }, []);
  return (
    <View style={[styles.flexRow, {transform: [{scaleX: rotate ? -1 : 1}]}]} s>
      <View style={styles.border1}>
        <View
          colors={['#0052be', '#5f9fcb', '#97c6c9']}
          start={{x: 0, y: 0.5}}
          end={{x: 1, y: 0.5}}>
          <View>
            <Image source={pileIcon} style={styles.pileIcon} />
          </View>
        </View>
      </View>
      <View style={styles.border2}>
        <View
          style={styles.dicegradient}
          colors={['#0052be', '#5f9fcb', '#97c6c9']}
          start={{x: 0, y: 0.5}}
          end={{x: 1, y: 0.5}}>
          <View style={styles.dicecontainer}>
            <TouchableOpacity>
              <Image source={diceIcon} style={styles.dice} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {diceRolling && (
        <LottieView
          source={DiceRoll}
          style={styles.rollingDice}
          loop={false}
          autoPlay
          cacheComposition={true}
          hardwareAccelerationAndroid
        />
      )}

      <Animated.View style={{transform: [{translateX: arrowAnim}]}}>
        <Image source={Arrow} style={{height: 30, width: 30}} />
      </Animated.View>
    </View>
  );
});

const styles = StyleSheet.create({
  flexRow: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  rollingDice: {
    height: 80,
    width: 80,
    zIndex: 99,
    top: -25,
    position: 'absolute',
  },
  dice: {
    height: 45,
    width: 45,
  },
  dicegradient: {
    borderWidth: 3,
    borderLeftWidth: 3,
    borderColor: '#f0ce2c',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dicecontainer: {
    backgroundColor: '#e8c0c1',
    borderWidth: 1,
    borderRadius: 5,
    width: 55,
    height: 55,
    paddingHorizontal: 8,
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  border1: {
    borderWidth: 3,
    borderRightWidth: 0,
    borderColor: '#f0ce2c',
  },
  border2: {
    padding: 1,
    backgroundColor: '#aac8ab',
    borderRadius: 10,
    borderLeftWidth: 3,
    borderColor: '#aac8ab',
  },
  pileIcon: {
    height: 35,
    width: 35,
  },
  pileContainer: {
    paddingHorizontal: 3,
  },
  linergrandient: {
    height: 50,
    width: 50,
  },
});

export default Dice;
