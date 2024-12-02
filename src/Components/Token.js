import {Alert, StyleSheet, Text, View} from 'react-native';
import {useEffect} from 'react';
import React from 'react';

const Token = ({color}) => {
  return (
    <View>
      <View
        style={{
          height: 25,
          width: 26,
          borderWidth: 1,
          borderColor: 'black',
          backgroundColor: color,
        }}>
        {' '}
      </View>
      <View
        style={{
          height: 25,
          width: 26,
          borderWidth: 1,
          borderColor: 'black',
          backgroundColor: color,
        }}>
        {' '}
      </View>
    </View>
  );
};

export default Token;

const styles = StyleSheet.create({});
