import React, { Component } from 'react';
import { Button, Card, CardHeader, CardBody, CardFooter } from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import { connect } from 'react-redux';

class Toastr extends Component {
  constructor(props) {
    super(props);

    this.notify = this.notify.bind(this);
    this.error = this.error.bind(this);
    this.success = this.success.bind(this);
    this.info = this.info.bind(this);
    this.warn = this.warn.bind(this);
    this.clear = this.clear.bind(this);
  }
  shouldComponentUpdate(nextProps, nextState) {
    // return false 하면 업데이트를 안함
    return this.props.error !== nextProps.error;
    //return true;
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    const { error } = this.props;
    //console.log('cdu::', prevProps);
    if (error) {
      console.log(error.data.message);
      this.error(error.data.message);
    }
  }

  notify() {
    // default type
    return toast('Hello World!');
  }
  error(msg) {
    // add type: 'error' to options
    return toast.error(msg);
  }
  success() {
    // add type: 'success' to options
    return toast.success('Success...');
  }
  info() {
    // add type: 'info' to options
    return toast.info('Info');
  }
  warn() {
    // add type: 'warning' to options
    return toast.warn('Warning...');
  }
  clear() {
    // Remove all toasts !
    return toast.dismiss();
  }

  render() {
    const containerStyle = {
      zIndex: 1999
    };

    return (
      <div className="animated">
        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          asd
          style={containerStyle}
        />
        {/* <Card>
          <CardHeader>
            <i className="icon-info" /> Toastr
            <div className="card-actions">
              <a href="https://github.com/fkhadra/react-toastify">
                <small className="text-muted">docs</small>
              </a>
            </div>
          </CardHeader>
          <CardBody>
            <p>React Toastify component</p>
            <Button color="secondary" onClick={this.notify}>
              Notify
            </Button>
            <Button color="danger" onClick={this.error}>
              Error
            </Button>
            <Button color="info" onClick={this.info}>
              Info
            </Button>
            <Button color="success" onClick={this.success}>
              Success
            </Button>
            <Button color="warning" onClick={this.warn}>
              Warning
            </Button>
          </CardBody>
          <CardFooter>
            <Button color="primary" onClick={this.clear}>
              Clear All
            </Button>
          </CardFooter>
        </Card> */}
      </div>
    );
  }
}
export default Toastr;
// export default connect(
//   state => ({
//     error: state.auth.error
//   }),
//   dispatch => ({})
// )(Toastr);
