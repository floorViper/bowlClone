import React, { Component } from 'react';
import { Row, Col, Card, CardHeader, CardBody } from 'reactstrap';

import 'spinkit/css/spinkit.css';

class Spinners extends Component {
  render() {
    return (
      <div className="animated">
        <Card>
          <CardHeader className="card-header">
            <i className="fa fa-spinner" /> Wave
          </CardHeader>
          <CardBody>
            <div className="sk-wave">
              <div className="sk-rect sk-rect1" />
              &nbsp;
              <div className="sk-rect sk-rect2" />
              &nbsp;
              <div className="sk-rect sk-rect3" />
              &nbsp;
              <div className="sk-rect sk-rect4" />
              &nbsp;
              <div className="sk-rect sk-rect5" />
            </div>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default Spinners;
