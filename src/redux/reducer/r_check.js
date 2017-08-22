import * as types from '../action/types.js'
import createReducer from './createReducer'
import { combineReducers } from 'redux';

const welcome_to_check = createReducer('', {
  [types.WELCOME](state, action) {
    return 'WELCOME'
  },
});

const times = createReducer(0, {
  [types.SET_TIMES](state, action) {
    return action.data
  },
});

const yNumber = createReducer(0, {
  [types.SET_Y_NUMBER](state, action) {
    return action.data
  },
});

const nNumber = createReducer(0, {
  [types.SET_N_NUMBER](state, action) {
    return action.data
  },
});

const checkReducer = combineReducers({
  times,
  yNumber,
  nNumber
})

export default checkReducer