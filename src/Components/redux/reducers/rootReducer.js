import {combineReducers} from 'redux';
import gameSlice from './gameSlice'; 

const rootReducer = combineReducers({
    game:gameSlice
})
export default rootReducer;
