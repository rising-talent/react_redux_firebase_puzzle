import * as types from '../action/types.js'
import createReducer from './createReducer'
import { combineReducers } from 'redux';

const temp_files = createReducer([], {
  [types.TEMP_FILES](state, action) {
    return action.files
  },
});

const settingReducer = combineReducers({
  temp_files,
})

export default settingReducer