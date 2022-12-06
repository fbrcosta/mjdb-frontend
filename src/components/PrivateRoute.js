import React from 'react';
import { Redirect, Route, withRouter } from 'react-router-dom';

import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {
    isAuthenticated: state.token !== null
  }
}

const PrivateRoute = ({isAuthenticated, component: Component, ...rest}) => {
  return <Route {...rest} render = { props => 
      isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
      )
    }
  />
};

export default withRouter(connect(mapStateToProps)(PrivateRoute));
