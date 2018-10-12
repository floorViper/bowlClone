import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authActions from 'store/modules/auth';
import GeneralUsersView from './GeneralUsersView';

class GeneralUsersContainer extends Component {
  async componentDidMount() {
    const { AuthActions } = this.props;
    try {
      await AuthActions.userPermissionList();
    } catch (e) {
      console.log(e);
    }
  }
  handleSubmit = async (formRef, permission) => {
    const { AuthActions } = this.props;
    const param = {
      user_id: [],
      permission
    };

    formRef.user_id.forEach((item, idx) => {
      item.checked && param['user_id'].push(item.value);
    });
    if (param.user_id.length === 0) {
      return;
    }
    try {
      await AuthActions.userPermissionReq(param);
      await AuthActions.userPermissionList();
    } catch (e) {
      console.log(e);
    }
    formRef.user_id.forEach((item, idx) => {
      item.checked = false;
    });
    formRef.selectAll.checked = false;
  };
  handleSelectAll = formRef => {
    const checked = formRef.selectAll.checked;
    formRef.user_id.forEach((item, idx) => {
      item.checked = checked;
    });
  };

  render() {
    return (
      <GeneralUsersView
        userPermissionList={this.props.userPermissionList}
        onSubmit={this.handleSubmit}
        onSelectAll={this.handleSelectAll}
      />
      // <div>dfs</div>
    );
  }
}

export default connect(
  state => ({
    userPermissionList: state.auth.userPermissionList
  }),
  dispatch => ({
    AuthActions: bindActionCreators(authActions, dispatch)
  })
)(GeneralUsersContainer);
