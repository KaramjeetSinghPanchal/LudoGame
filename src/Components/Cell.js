import {StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useMemo} from 'react';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Pile from './Pile';
// import {ArrowRightIcon, StarIcon} from 'react-native-heroicon'
import {ArrowRightIcon, StarIcon} from 'react-native-heroicons/outline';
import {SafeSpots, StarSpot, ArrowSpot} from '../helpers/PlotData';
import {RFValue} from 'react-native-responsive-fontsize';
import {useDispatch, useSelector} from 'react-redux';
import {selectCurrentPostions} from './redux/reducers/gameSelectors';
import { handleForwardThunk } from './redux/reducers/gameAction';
const Cell = ({cell, color, index, id}) => {
  const dispatch = useDispatch();
  const plottedPieces = useSelector(selectCurrentPostions);

  const isSafeSpot = useMemo(() => {
    return Array.isArray(SafeSpots) && SafeSpots?.includes(id);
  }, [id, SafeSpots]);

  const isStarSpot = useMemo(() => {
    return Array.isArray(StarSpot) && StarSpot?.includes(id);
  }, [id, StarSpot]);

  const isArrowSpot = useMemo(() => {
    return Array.isArray(ArrowSpot) && ArrowSpot?.includes(id);
  }, [id, ArrowSpot]);

  const peicesAtPosition = useMemo(
    () => plottedPieces.filter(item => item.pos == id),
    [plottedPieces, id],
  );

  const handlePress = useCallback((playerNo, pieceId) => {
    //Forward the pokect
    dispatch(handleForwardThunk(playerNo,pieceId,id))

  }, [dispatch, id]);

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: isSafeSpot ? color : 'white',
        },
      ]}>
      {isStarSpot && <StarIcon size={20} color="gray" />}
      {isArrowSpot && (
        <ArrowRightIcon
          style={{
            transform: [
              {
                rotate:
                  id === 38
                    ? '180deg'
                    : id === 25
                    ? '90deg'
                    : id === 51
                    ? '-90deg'
                    : '0deg',
              },
            ],
          }}
          size={RFValue(12)}
        />
      )}
      {peicesAtPosition?.map((piece, index) => {
        const playerNo =
          piece.id[0] === 'A'
            ? 1
            : piece.id[0] === 'B'
            ? 2
            : piece.id[0] === 'C'
            ? 3
            : 4;

        const pieceColor =
          playerNo === 1
            ? Colors.red
            : playerNo == 2
            ? Colors.green
            : playerNo == 3
            ? Colors.yellow
            : Colors.blue;

        return (
          <View
            key={piece.id}
            style={[
              styles.pieceContainer,
              {
                transform: [
                  {
                    scale: peicesAtPosition.length == 1 ? 1 : 0.7,
                  },
                  {
                    translateX:
                      peicesAtPosition.length === 1
                        ? 0
                        : index % 2 === 0
                        ? -6
                        : 6,
                  },
                  {
                    translateY:
                      peicesAtPosition.length === 1 ? 0 : index < 2 ? -6 : 6,
                  },
                ],
              },
            ]}>
            <Pile
              cell={true}
              player={playerNo}
              onPress={() => handlePress(playerNo, piece.id)}
              pieceId={piece.id}
              color={pieceColor}
            />
          </View>
        );
      })}
    </View>
  );
};

export default React.memo(Cell);

const styles = StyleSheet.create({
  container: {
    borderWidth: 0.4,
    borderColor: Colors.borderColor,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pieceContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    zIndex: 99,
  },
});
