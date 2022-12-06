import React from 'react';

import { withRouter } from 'react-router-dom';

import { connect } from 'react-redux';
import * as actions from '../store/actions/auth';

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(actions.logout())
  }
}

function LoginView(props) {
  // effect for
  React.useEffect(() => {
    props.logout();
  });

  return (
    <div />
  );
}

export default withRouter(connect(null, mapDispatchToProps)(LoginView));
