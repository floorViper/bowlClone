import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as authActions from 'store/modules/auth';
import { bindActionCreators } from 'redux';
import {
  Nav,
  NavItem,
  NavbarToggler,
  NavbarBrand,
  NavLink,
  Button
} from 'reactstrap';
import { withRouter } from 'react-router-dom';
import HeaderDropdown from './HeaderDropdown';

class MainHeader extends Component {
  sidebarToggle(e) {
    e.preventDefault();
    document.body.classList.toggle('sidebar-hidden');
  }

  sidebarMinimize(e) {
    e.preventDefault();
    document.body.classList.toggle('sidebar-minimized');
  }

  mobileSidebarToggle(e) {
    e.preventDefault();
    document.body.classList.toggle('sidebar-mobile-show');
  }
  handleLoginPage(history) {
    //const { history } = this.props;
    //arrow function 안쓰니까 this가 함수자체
    history.push('/login');
    return;
  }
  handleLogout = () => {
    const { AuthActions } = this.props;
    AuthActions.localLogout();
    localStorage.clear();
    this.props.history.replace('/login');
  };

  render() {
    //console.log("dddd",this.props.loginResult)

    return (
      <header className="app-header navbar">
        <NavbarToggler className="d-lg-none" onClick={this.mobileSidebarToggle}>
          <span className="navbar-toggler-icon" />
        </NavbarToggler>
        <NavbarBrand href="/" />
        <NavbarToggler
          className="d-md-down-none mr-auto"
          onClick={this.sidebarToggle}
        >
          <span className="navbar-toggler-icon" />
        </NavbarToggler>
        <Nav className="ml-auto" navbar>
          {this.props.loginResult.authorized ? (
            <HeaderDropdown
              accnt
              onLogout={this.handleLogout}
              user={this.props.loginResult}
            />
          ) : (
            <Button
              color="success"
              onClick={() => {
                this.handleLoginPage(this.props.history);
              }}
            >
              <i className="fa fa-magic" />
              &nbsp; LOGIN
            </Button>
          )}
          {/* {console.log('propss::', this.props)} */}
        </Nav>
      </header>
    );
  }
}

export default connect(
  state => ({
    loginResult: state.auth.loginResult
  }),
  dispatch => ({
    AuthActions: bindActionCreators(authActions, dispatch)
  })
)(withRouter(MainHeader));
