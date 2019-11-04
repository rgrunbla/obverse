import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Chat from "./js/components/chat";
import Login from "./js/components/login";
import PrivateRoute from "./js/components/privateRoute";
import { dispatchGroupchatMessage, initApi, storeBookmark } from './js/redux/actions';



class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Switch>
          <PrivateRoute exact path="/" component={Chat} />
          <PrivateRoute exact path="/rooms/:id" component={Chat} />
          <Route path="/login" component={Login} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default connect(null, null)(App);
