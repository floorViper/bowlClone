import React, { Component } from 'react';
import {
  Container,
  Row,
  Col,
  CardGroup,
  Card,
  CardBody,
  Button,
  Input,
  InputGroup,
  InputGroupAddon
} from 'reactstrap';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as authActions from 'store/modules/auth';
import Toastr from 'components/common/Toastr';

class LoginUI extends Component {
  handleChange = e => {
    const { value, name } = e.target;
    console.log('vn', value, name);
    const { AuthActions } = this.props;
    AuthActions.changeInput({ name, value });
  };

  handleLogin = async () => {
    const { AuthActions, userName, passWord, history } = this.props;
    try {
      // 로그인 시도
      await AuthActions.localLogin({ userName, passWord });
      localStorage.logged = 'true';
      const { loginResult } = this.props;
      console.log('loginRe::', loginResult);
      localStorage.loginResult = JSON.stringify(loginResult);
      history.push('/explorer/dahboard');
    } catch (e) {
      console.log(e.response.data.message);
    }
  };

  render() {
    const { handleChange, handleLogin } = this;
    const { userName, passWord, error } = this.props;
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup className="mb-4">
                <Card className="p-4">
                  <CardBody>
                    <h1>Login</h1>
                    <p className="text-muted">Sign In to your account</p>
                    <InputGroup className="mb-3">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="icon-user" />
                        </span>
                      </div>
                      <Input
                        type="text"
                        placeholder="Username"
                        name="userName"
                        value={userName}
                        onChange={handleChange}
                      />
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="icon-lock" />
                        </span>
                      </div>
                      <Input
                        type="password"
                        placeholder="Password"
                        name="passWord"
                        value={passWord}
                        onChange={handleChange}
                      />
                    </InputGroup>
                    <Row>
                      <Toastr error={error} />
                    </Row>
                    <Row>
                      <Col xs="6">
                        <Button
                          color="primary"
                          className="px-4"
                          onClick={handleLogin}
                        >
                          Login
                        </Button>
                      </Col>
                      <Col xs="6" className="text-right">
                        <Button color="link" className="px-0">
                          Forgot password?
                        </Button>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
                <Card
                  className="text-white bg-primary py-5 d-md-down-none"
                  style={{ width: 44 + '%' }}
                >
                  <CardBody className="text-center">
                    <div>
                      <h2>Sign up</h2>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit, sed do eiusmod tempor incididunt ut labore et
                        dolore magna aliqua.
                      </p>
                      <Button color="primary" className="mt-3" active>
                        Register Now!
                      </Button>
                    </div>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default connect(
  state => ({
    userName: state.auth.userName,
    passWord: state.auth.passWord,
    loginResult: state.auth.loginResult,
    error: state.auth.error
  }),
  dispatch => ({
    AuthActions: bindActionCreators(authActions, dispatch)
  })
)(withRouter(LoginUI));
