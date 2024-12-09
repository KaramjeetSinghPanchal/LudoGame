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
      announceWinner : (state,action)=>{
        state.winner = action.payload;
      },
      updatePlayerChance : (state,action)=>{
        state.chancePlayer = action.payload.chancePlayer;
        state.touchDiceBlock = false;
        state.isDiceRolled = false

      },
  },
});

export const {resetGame,announceWinner,updatePlayerChance,updateFireworks,unfreezDice,disableTouch,enableCellSelection,enablePileSelection,updateDiceNo} = gameSlice.actions;

export default gameSlice.reducer;
