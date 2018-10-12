import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authActions from 'store/modules/auth';
import MainTemplate from 'components/pageTemplate/MainTemplate';
//import { withRouter } from 'react-router-dom';

class Home extends Component {
  async componentDidMount() {
    const { history, AuthActions } = this.props;
    await AuthActions.checkLogin();
    //console.log('hstr', history, loginResult);
    this.props.loginResult.authorized
      ? history.push('/explorer/dashboard')
      : history.push('/login');
  }
  render() {
    return <MainTemplate>loading..</MainTemplate>;
  }
}

export default connect(
  state => ({
    loginResult: state.auth.loginResult
  }),
  dispatch => ({
    AuthActions: bindActionCreators(authActions, dispatch)
  })
)(Home);
