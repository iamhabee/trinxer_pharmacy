import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, Switch, Redirect } from "react-router-dom";

import 'antd/dist/antd.css';
import './global.css'
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/styles/tailwind.css";
// layouts
import Admin from "layouts/Admin.js";
import Auth from "layouts/Auth.js";

// views without layouts
import Landing from "views/Landing.js";
import Profile from "views/Profile.js";
import Index from "views/Index.js";

import { createBrowserHistory } from 'history'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import createSagaMiddleware from 'redux-saga'
import reducers from './redux/rootReducer'
import sagas from './redux/rootSaga'
// middleware
const history = createBrowserHistory()
const sagaMiddleware = createSagaMiddleware()
const store = createStore(reducers, applyMiddleware(sagaMiddleware))
sagaMiddleware.run(sagas)

const data = localStorage.getItem("trinxer_admin")
ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Switch>
        {/* add routes with layouts */}
        <Route path="/auth" component={Auth} />
        <Route path="/admin" component={Admin} />
        {/* add routes without layouts */}
        <Route path="/landing" exact component={Landing} />
        <Route path="/profile" exact component={Profile} />
        <Route path="/" exact component={Index} />
        {/* add redirect for first page */}
        <Redirect from="*" to="/auth" />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById("root")
);
export { store, history }