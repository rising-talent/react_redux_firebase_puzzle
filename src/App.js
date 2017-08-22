import React, { Component } from 'react';

import Login from './scene/login'
import Setting from './scene/setting'
import Ranking from './scene/ranking'
import Check from './scene/check'
import reducer from './redux/reducer/index.js';
import injectTapEventPlugin from 'react-tap-event-plugin';

import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';
import { compose, createStore, applyMiddleware } from 'redux';
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import promise from 'redux-promise-middleware';


const loggerMiddleware = createLogger();
const routeMiddleware = routerMiddleware(browserHistory);
const promiseMiddleware = promise()

const middleware = compose(applyMiddleware(  promiseMiddleware,  thunkMiddleware,  loggerMiddleware ), window.devToolsExtension ? window.devToolsExtension() : f => f);
const store = createStore(reducer, {}, middleware);
const history = syncHistoryWithStore(browserHistory, store);
injectTapEventPlugin();


class App extends Component {
  render() {
    return (
        <Provider store={store}>
          <Router history={history}>
            <Route path="/">
              <IndexRoute component={Login} />
              <Route path="setting" component={Setting} />
              <Route path="top_players" component={Ranking} />
              <Route path="check" component={Check} />
            </Route>
          </Router>
        </Provider>
    );
  }
}

export default App;
