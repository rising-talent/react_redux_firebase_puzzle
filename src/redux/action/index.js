import * as loginActions from './a_login'
import * as checkActions from './a_check'
import * as settingActions from './a_setting'
import * as rankingActions from './a_ranking'
import * as firebaseActions from './a_firebase'

export const ActionCreators = Object.assign({},
  loginActions,
  checkActions,
  settingActions,
  rankingActions,
  firebaseActions
);