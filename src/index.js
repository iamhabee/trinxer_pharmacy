import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, Switch, Redirect } from "react-router-dom";

import 'antd/dist/antd.css';
import './global.css'
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/styles/tailwind.css";
// layouts
import Admin from "layouts/Admin";
import Auth from "layouts/Auth";
import About from "layouts/About";
import Products from "layouts/Product";

// views without layouts
import Landing from "views/Landing";
import Profile from "views/Profile";
import Blogs from "views/Blogs";
import Services from "views/Services";
import Contact from "views/Contact";
import PrivateLabelling from "views/PrivateLabelling";
import Index from "views/Index";

import { createBrowserHistory } from 'history'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import createSagaMiddleware from 'redux-saga'
import reducers from './redux/rootReducer'
import sagas from './redux/rootSaga'
import BlogDetails from "views/BlogDetails";
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
        <Route path="/" exact component={Landing} />
        <Route path="/auth" component={Auth} />
        <Route path="/admin" component={Admin} />
        <Route path="/about" component={About} />
        <Route path="/products" component={Products} />
        {/* add routes without layouts */}
        <Route path="/services" exact component={Services} />
        <Route path="/contact" exact component={Contact} />
        <Route path="/blogs" exact component={Blogs} />
        <Route path="/blog-details/:id" exact component={BlogDetails} />
        <Route path="/private-labelling" exact component={PrivateLabelling} />
        <Route path="/profile" exact component={Profile} />
        <Route path="/admin-home" exact component={Index} />
        {/* add redirect for first page */}
        <Redirect from="*" to="/" />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById("root")
);
export { store, history }