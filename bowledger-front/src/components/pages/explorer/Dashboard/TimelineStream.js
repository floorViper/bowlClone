/**
 *    SPDX-License-Identifier: Apache-2.0
 */

import React, { Component } from 'react';
import { Timeline, TimelineEvent } from 'react-event-timeline';

import { Badge } from 'reactstrap';
import Timeago from 'react-timeago';
import find from 'lodash/find';
import BlockView from 'components/common/BlockView';
import blockOpen from 'public/img/blockOpen.png';

import {
  Row,
  Col,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Card,
  CardHeader,
  CardBody
} from 'reactstrap';

class TimelineStream extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      notifications: [],
      dialogsaOpenBlockHash: false,
      blockHash: {},
      primary: false
    };
    this.togglePrimary = this.togglePrimary.bind(this);
  }
  togglePrimary() {
    this.setState({
      primary: !this.state.primary
    });
  }
  handleDialogOpenBlockHash = async rowValue => {
    const data = find(this.props.blockList, item => {
      return item.blockhash === rowValue;
    });
    await this.setState({
      dialogOpenBlockHash: true,
      blockHash: data
    });
    this.togglePrimary();
  };

  handleDialogCloseBlockHash = () => {
    this.setState({ dialogOpenBlockHash: false });
    this.togglePrimary();
  };

  render() {
    return (
      <Card>
      <CardHeader>
        <i className="fa fa-align-justify" /> TimelineStream
      </CardHeader>
      <CardBody>
        <div className="scrollable-card">
          <Timeline>
            {this.props.notifications.map(item => (
              <TimelineEvent
                key={item.title}
                title={item.title}
                icon={<i className="fa fa-cube fa-lg"/>}
                iconColor="#0D3799"
                container="card"
                className="timeline-event"
                titleStyle={{ fontWeight: 'bold' }}
                style={{ width: '65%' }}
                cardHeaderStyle={{
                  backgroundColor: '#6283D0',
                  fontSize: '13pt'
                }}
                contentStyle={{
                  backgroundColor: 'transparent'
                }}
                buttons={
                  <a
                    className="blockLink"
                    href="#/"
                    onClick={() =>
                      this.handleDialogOpenBlockHash(item.blockhash)
                    }
                  >
                    <img
                      src={blockOpen}
                      alt="View Blocks"
                      className="blockOpen"
                    />
                  </a>
                }
              >
                {/* <Typography variant="body1"> */}
                  <h6>
                  <div>
                  <b className="timeLineText"> Datahash:</b> {item.datahash}{' '}
                  <br />
                  <b className="timeLineText"> Number of Tx:</b> {item.txcount}
                </div>
                </h6>
                {/* </Typography> */}
                <h5 className="timeLineText">
                  <Badge className="timeLineText">
                    <Timeago
                      className="timeLineText"
                      date={item.time}
                      live={false}
                      minPeriod={60}
                    />
                  </Badge>
                </h5>
              </TimelineEvent>
            ))}
          </Timeline>
        </div>

        <Modal
          isOpen={this.state.primary}
          toggle={() => {
            this.setState({
              primary: !this.state.primary
            });
          }}
          className={'modal-lg ' + this.props.className}
        >
         
            <BlockView
              blockHash={this.state.blockHash}
              onClose={this.handleDialogCloseBlockHash}
            />
         
          
        </Modal>
      </CardBody>
      </Card>
    );
  }
}

export default TimelineStream;
