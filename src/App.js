import React from 'react';
import { Router, Route, Switch, Redirect } from "react-router-dom";

import { createBrowserHistory } from "history";
import { connect } from 'react-redux';

import * as actions from './store/actions/auth';

import LoginView from './views/LoginView';
import LogoutView from './views/LogoutView';
import Admin from './layouts/Admin';
import PrivateRoute from './components/PrivateRoute';

const mapStateToProps = state => {
  return {
    internalAuthChecked: state.internalAuthChecked,
    isAuthenticated: state.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  }
}

const hist = createBrowserHistory();

function App(props) {
  // effect for when user logs in
  React.useEffect(() => {
    props.onTryAutoSignup();
  });

  return (
    <div>
      { 
        !props.internalAuthChecked ? (
          <p>loading</p>
        ) : (
          <Router history={hist}>
            <Switch>
              <Route exact path="/login">
                { 
                  props.isAuthenticated ? ( 
                    <Redirect to="/mjdb/statistics" />
                  ) : (
                    <LoginView />
                  )
                }
              </Route>
              <PrivateRoute exact path="/logout" component={LogoutView} />
              <PrivateRoute path="/mjdb" component={Admin} />
              <Redirect exact from="/" to="/mjdb/statistics" />
              <Route render={() => <h1>Not found: { window.location.pathname } </h1>} />
            </Switch>
          </Router>
        )
      }
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
