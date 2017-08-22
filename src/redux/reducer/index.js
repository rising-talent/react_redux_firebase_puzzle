import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import loginReducer from './r_login.js';
import settingReducer  from './r_setting.js'
import checkReducer  from './r_check.js'
import rankingReducer  from './r_ranking.js'

const reducer = combineReducers({
    loginReducer,
    rankingReducer,
    checkReducer,
    routing: routerReducer
});

export default reducer;