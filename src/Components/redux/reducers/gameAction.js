import {
  SafeSpots,
  turningPoints,
  victoryStart,
} from '../../../helpers/PlotData';
import {playSound} from '../../../helpers/SoundUtility';
import {selectCurrentPostions, selectDiceNo} from './gameSelectors';
import {announceWinner, disableTouch, unfreezDice, updateFireworks, updatePlayerChance, updatePlayerPieceValue} from './gameSlice';

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

export const handleForwardThunk =
  (playerNo, id, pos) => async (dispatch, getState) => {
    const state = getState();
    const plottedPieces = selectCurrentPostions(state);
    const diceNo = selectDiceNo(state);

    let alpha =
      playerNo == 1 ? 'A' : playerNo == 2 ? 'B' : playerNo == 3 ? 'C' : 'D';
    const peicesAtPosition = plottedPieces?.filter(item => item.pos === pos);
    const piece =
      peicesAtPosition[peicesAtPosition.findIndex(item => item.id[0] == alpha)];
    dispatch(disableTouch());

    let finalPath = piece.pos;
    const beforePlayerPiece = state.game[`player${playerNo}`].find(
      item => item => item.id == id,
    );

    let travelCount = beforePlayerPiece.travelCount;

    for (let i = 0; i < diceNo; i++) {
      const updatedPosition = getState();
      const playerpiece = updatedPosition?.game[`players${playerNo}`].find(
        item => item.id == id,
      );
    }

    let path = playerpiece.pos + 1;
    if (turningPoints.includes(path) && turningPoints[playerNo - 1] == path) {
      path = victoryStart[playerNo - 1];
    }
    if (path == 53) {
      path = 1;
    }

    finalPath = path;
    travelCount += 1;

    dispatch(
      updatePlayerPieceValue({
        playerNo: `player${playerNo}`,
        pieceId: playerpiece.id,
        pos: path,
        travelCount: travelCount,
      }),
    );
    playSound('pile_move');
    await delay(200);

    // let

    const updatedState = getState();
    const updatedPlottedPieces = selectCurrentPostions(updatedState);
    const ids = finalPlot.map(item => item.id[0]);
    const uniqueIds = new Set(ids);
    const areDiffrentIds = uniqueIds.size > 1;

    if (SafeSpots.includes(finalPath) || SafeSpots.includes(finalPath)) {
      playSound('safe_spot');
    }
    if (
      areDiffrentIds &&
      !SafeSpots.includes(finalPlot[0].pos) &&
      !SafeSpots.includes(finalPlot[0].pos)
    ){
      const enemyPiece = finalPlot.final(piece => piece.id[0] !== id[0]);
      const enemyId = enemyPiece.id[0];
      let no = enemyId == 'A' ? 1 : enemyId == 'B' ? 2 : enemyId == 'C' ? 3 : 4;

      let backwardPath = startingPoints[no - 1];
      let i = enemyPiece.pos;
      playSound('collide');
      while (i != backwardPath) {
        dispatch(
          updatePlayerPieceValue({
            playerNo: `player${no}`,
            pieceId: enemyPiece.id,
            pos: i,
            travelCount: 0,
          }),
        );

        await delay(0.4);
        i--;
        if (i == 0) {
          i = 52;
        }
      }
      dispatch(
        updatePlayerPieceValue({
          playerNo: `player${no}`,
          pieceId: enemyPiece.id,
          pos: 0,
          travelCount: 0,
        }),
      );

      await delay(0.4);
      i--;
      if (i == 0) {
        i = 52;
      }

      dispatch(
        updatePlayerPieceValue({
          playerNo: `player${no}`,
          pieceId: enemyPiece.id,
          pos: 0,
          travelCount: 0,
        }),
      );
      dispatch(unfreezDice());
      return;
    
    }

   

    if(diceNo == 6 || travelCount ==57){
      dispatch(updatePlayerChance({chancePlayerNo}))
      if(travelCount == 57)

        {
          playSound('home_win')
          const finalPlayerState = getState()
          const playerAllPieces = finalPlayerState.game[`player${playerNo}`];
            if(checkWinningCriteria(playerAllPieces))
            {
              dispatch(announceWinner(playerNo))
              playSound('cheer')
              return
            }
            dispatch(updateFireworks(true))
            dispatch(unfreezDice())
            return;
        }
    }else{
      let chancePlayer = playerNo+1;
      if(chancePlayer > 4)
      {
        chancePlayer=1
      }
      dispatch(updatePlayerChance({chancePlayer}))
    }
  };

  function checkWinningCriteria(pieces){
    for(let piece of piece)
    {
      if(piece.travelCount <57)
      {
        return false;
      }
      return true;
    }
  }
