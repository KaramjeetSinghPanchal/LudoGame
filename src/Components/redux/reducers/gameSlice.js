import {createSlice} from '@reduxjs/toolkit';
import {initialState} from './initialState';
export const gameSlice = createSlice({
  name: 'game',
  initialState: initialState,
  reducers: {
    reserGame: () => initialState,
    updateDiceNo: (state, action) => {
      state.diceNo = action.payload.diceNo;
      state.isDiceRolled = true;
    },
    enablePileSelection: (state, action) => {
      state.touchDiceBlock = true;
      state.pileSelectionPlayer = action.payload.playerNo;
    },
    enableCellSelection: (state, action) => {
      state.touchDiceBlock = true;
      state.cellSelectionPlayer = action.payload.playerNo;
    },
    disableTouch: (state, action) => {
      state.touchDiceBlock = true;
      state.cellSelectionPlayer = -1;
      state.pileSelectionPlayer = -1;
    },
    unfreezDice: (state, action) => {
      state.touchDiceBlock = false;
      state.isDiceRolled = false;
    },
    updateFireworks: (state, action) => {
      state.fireworks = action.payload;
    },
    announceWinner: (state, action) => {
      state.winner = action.payload;
    },
    updatePlayerChance: (state, action) => {
      state.chancePlayer = action.payload.chancePlayer;
      state.touchDiceBlock = false;
      state.isDiceRolled = false;
    },
    updatePlayerPieceValue: (state, action) => {
      const {playerNo, pieceId, pos, travelCount} = action.payload;
      const playerPieces = state[plano];
      const piece = playerPieces.find(p => p.id === pieceId);
      state.pileSelectionPlayer = -1;
      if (piece) {
        //piece id confirmation
        piece.pos = pos;
        piece.travelCount = travelCount;
        const currentPositionndex = state.currentPositions.findIndex(
          (p = p.id === pieceId),
        );

        if (pos == 0) {
          if (currentPositionndex !== -1) {
            state.currentPositions.splice(currentPositionndex, 1);
          }
        } else {
          if (currentPositionndex !== -1) {
            state.currentPositions[currentPositionndex] = {
              id: pieceId,
              pos,
            };
          } else {
            state.currentPositions.push({id: pieceId, pos});
          }
        }
      }
    },
  },
});

export const {
  resetGame,
  announceWinner,
  updatePlayerChance,
  updateFireworks,
  unfreezDice,
  disableTouch,
  enableCellSelection,
  enablePileSelection,
  updateDiceNo,
  updatePlayerPieceValue
} = gameSlice.actions;

export default gameSlice.reducer;
