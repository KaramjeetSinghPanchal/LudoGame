import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Wrapper from '../Components/Wrapper';
import MenuIcon from '../assets/images/menu.png';
import {deviceHeight, deviceWidth} from '../constants/Scalling';
import Dice from '../Components/Dice';
import FourTringles from '../Components/FourTringles';
import {Colors} from '../constants/Colors';
import Pocket from '../Components/Pocket';
import {Plot1Data, Plot2Data, Plot3Data, Plot4Data} from '../helpers/PlotData';
import VerticalPath from '../Components/VerticalPath';
import HorizontalPath from '../Components/HorizontalPath';
import StartGame from '../assets/images/start.png';
import { useSharedValue } from 'react-native-reanimated';
import { opacity } from 'react-native-reanimated';
import {useSelector} from 'react-redux';
import {
  selectDiceNo,
  selectDiceTouch,
  selectPlayer1,
  selectPlayer2,
  selectPlayer3,
  selectPlayer4,
} from '../Components/redux/reducers/gameSelectors';
import {useIsFocused} from '@react-navigation/native';
import Animated from 'react-native-reanimated';

const LuddoboardScreen = () => {
  const player1 = useSelector(selectPlayer1);
  const player2 = useSelector(selectPlayer2);
  const player3 = useSelector(selectPlayer3);
  const player4 = useSelector(selectPlayer4);
  const isDiceTouch = useSelector(selectDiceTouch);
  const winner = useSelector(state => state.game.winner); //Getting the winner person
  
  const [showStartImage, setShowStartImage] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false); //For menu's state
  // const opacity = useRef(new Animated.Value(1)).current;  // Create an animated value for opacity
  const isFocused = useIsFocused();  // Hook from react-navigation to check if the screen is focused

  // useEffect(() => {
  //   let blinkAnimation;
  //   let timeout;

  //   if (isFocused) {
  //     setShowStartImage(true);
      
  //     // Creating a fade effect using opacity
  //     blinkAnimation = Animated.loop(
  //       Animated.sequence([
  //         Animated.timing(opacity, {
  //           toValue: 0,  // Fade to transparent
  //           duration: 500,  // Duration of each fade
  //           useNativeDriver: true,  // Use native driver for performance
  //         }),
  //         Animated.timing(opacity, {
  //           toValue: 1,  // Fade back to visible
  //           duration: 500,  // Duration of each fade
  //           useNativeDriver: true,  // Use native driver for performance
  //         }),
  //       ])
  //     );

  //     blinkAnimation.start();

  //     // Stop animation after 3 seconds
  //     timeout = setTimeout(() => {
  //       blinkAnimation.stop();  // Stop the animation
  //       setShowStartImage(false);  // Hide the image
  //     }, 3000);
  //   }

  //   // Clean up when the component unmounts or is no longer focused
  //   return () => {
  //     blinkAnimation.stop();
  //     clearTimeout(timeout);
  //   };
  // }, [isFocused]);

  return (
    <Wrapper>
      <TouchableOpacity style={{position: 'absolute', top: 60, left: 20}}>
        <Image source={MenuIcon} style={{width: 30, height: 30}} />
        <Text>LuddoboardScreen </Text>
      </TouchableOpacity>

      <View style={styles.container}>
        <View style={styles.flexRow} pointerEvents={isDiceTouch?'none':'auto'}>
          <Dice color={Colors.green} player={2} data={player2}/>
          <Dice color={Colors.yellow} rotate data={player3} player={3}/>
        </View>
        {/* -------------------------- */}
        <View style={styles.ludoBoard}>
          <View style={styles.plotcontainer}>
            <Pocket color={Colors.green} player={2} data={player2}/>
            <VerticalPath cells={Plot2Data} color={Colors.yellow} />
            <Pocket color={Colors.yellow} player={3} data={player3}/>
          </View>

          <View style={styles.pathContainer}>
            <HorizontalPath cells={Plot1Data} colorr={Colors.green} />
            <FourTringles 
            player1 = {player1}
            player2 = {player2}
            player3 = {player3}
            player4 = {player4}
            />
            <HorizontalPath cells={Plot3Data} color={Colors.blue} />
          </View>

          <View style={styles.plotcontainer}>
            <Pocket color={Colors.red} player={1} data={player1}/>
            <VerticalPath cells={Plot4Data} color={Colors.red} />
            <Pocket color={Colors.blue} player={4} data={player4}/>
          </View>
        </View>
        {/* --------------------------- */}

        <View style={styles.flexRow} pointerEvents={isDiceTouch?'none':'auto'}>
          <Dice color={Colors.red} player={1} data={player1}/>
          <Dice color={Colors.blue} rotate player={4} data={player4} />
        </View>
      </View>

      {!showStartImage && (
        <Animated.Image
          source={StartGame}
          style={{
            width: deviceWidth * 0.5,
            height: deviceWidth * 0.2,
            position: 'absolute',
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            // opacity: 1,

            alignContent: 'center',
            top: '360',
          }}
        />
      )}
    </Wrapper>
  );
};

export default LuddoboardScreen;

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    justifyContent: 'center',
    height: deviceHeight * 0.5,
    width: deviceWidth,
    marginTop: 120,
  },
  flexRow: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 30,
  },
  pathContainer: {
    flexDirection: 'row',
    width: '100%',
    height: '20%',
    justifyContent: 'space-between',
    backgroundColor: '#1E5162',
  },
  ludoBoard: {
    width: '100%',
    height: '100%',
    alignSelf: 'center',
    padding: 10,
  },
  plotcontainer: {
    width: '100%',
    height: '40%',
    flexDirection: 'row',
    backgroundColor: '#ccc',
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
  },
});
