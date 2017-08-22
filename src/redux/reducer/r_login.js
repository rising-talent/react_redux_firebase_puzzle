import * as types from '../action/types.js'
import createReducer from './createReducer'
import { combineReducers } from 'redux';

const initialState = {
    goal: '1234',
    inProg: false,
    history: [],
    isSuccessed: false
};

const goal = createReducer('1234', {
  [types.SET_GOAL_NUMBER](state, action) {
    return action.data
  },
});

const level = createReducer('4', {
  [types.SET_LEVEL](state, action) {
    return action.data
  },
});

const isComplex = createReducer(false, {
  [types.SET_COMPLEXITY](state, action) {
    return action.data
  },
});

const inProg = createReducer(false , {
  [types.SET_GOAL_NUMBER](state, action) {
    return false
  },
  [types.SET_TIMES](state, action) {
    if(action.data == 0) return false
    else return true
  },
});

const history = createReducer([], {
  [types.SET_HISTORY](state, action) {
    return action.data
  },
});

const isSuccessed = createReducer(false, {
  [types.SUCCESS](state, action) {
    return action.data
  },
});

const isFailed = createReducer(false, {
  [types.FAIL](state, action) {
    return action.data
  },
});

const userInfo = createReducer({userId: '', trophy: 0, username: '', email: '', image: ''}, {
  [types.USER_INFO](state, action) {
    return action.data
  },
});

const loginReducer = combineReducers({
  goal,
  level,
  inProg,
  history,
  isSuccessed,
  userInfo,
  isComplex,
  isFailed
})

export default loginReducer

// export function goal(state = '1234', action) {
//   switch (action.type) {
//     case types.SET_GOAL_NUMBER:
//       return action.data
//     default: 
//       return state
//   }
// }

// export function times(state = 0, action) {
//   switch (action.type) {
//     case types.SET_TIMES:
//       return action.data
//     default: 
//       return state
//   }
// }