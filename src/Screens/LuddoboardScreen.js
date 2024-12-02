import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
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
const LuddoboardScreen = () => {
  return (
    <Wrapper>
      <TouchableOpacity style={{position: 'absolute', top: 60, left: 20}}>
        <Image source={MenuIcon} style={{width: 30, height: 30}} />
        <Text>LuddoboardScreen </Text>
      </TouchableOpacity>

      <View style={styles.container}>
        <View style={styles.flexRow}>
          <Dice color={Colors.green} />
          <Dice color={Colors.yellow} rotate />
        </View>
        {/* -------------------------- */}
        <View style={styles.ludoBoard}>
          <View style={styles.plotcontainer}>
            <Pocket color={Colors.green} player={2} />
            <VerticalPath cells={Plot2Data} color={Colors.yellow} />
            <Pocket color={Colors.yellow} player={3} />
          </View>

          <View style={styles.pathContainer}>
            <HorizontalPath cells={Plot1Data} colorr={Colors.green} />
           <FourTringles />
            <HorizontalPath cells={Plot3Data} color={Colors.blue} />
          </View>

          <View style={styles.plotcontainer}>
            <Pocket color={Colors.red} player={1} />
            <VerticalPath cells={Plot4Data} color={Colors.red} />
            <Pocket color={Colors.blue} player={4} />
          </View>
        </View>
        {/* --------------------------- */}

        <View style={styles.flexRow}>
          <Dice color={Colors.red} />
          <Dice color={Colors.blue} rotate />
        </View>
      </View>
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
