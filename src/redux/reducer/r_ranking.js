import * as types from '../action/types.js'
import createReducer from './createReducer'
import { combineReducers } from 'redux';


const welcome_to_ranking = createReducer('', {
  [types.WELCOME](state, action) {
    return 'WELCOME'
  },
});

const top_players = createReducer([], {
  [types.TOP_PLAYERS](state, action) {
    return action.data
  },
});

const rankingReducer = combineReducers({
  top_players,
  welcome_to_ranking
})

export default rankingReducer