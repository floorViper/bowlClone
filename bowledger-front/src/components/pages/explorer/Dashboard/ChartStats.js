/**
 *    SPDX-License-Identifier: Apache-2.0
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment-timezone';
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Card,
  CardHeader,
  CardBody
} from 'reactstrap';
import { Line } from 'react-chartjs-2';
import TimeChart from './TimeChart';
import classnames from 'classnames';

export default class ChartStats extends Component {
  constructor(props) {
    console.log('constructor');
    super(props);
    this.state = {
      activeTab: '1',
      loading: false
    };
  }

  componentWillUpdate(nextProps, nextState) {}

  componentDidMount() {
    //console.log('state', this.state.activeTab);
    // if (
    //   this.props.blockPerHour == undefined ||
    //   this.props.blockPerMin == undefined ||
    //   this.props.transactionPerHour == undefined ||
    //   this.props.transactionPerMin == undefined
    // ) {
    //   console.log('returnPer');
    //   return null;
    // }
    //   setInterval(() => {
    //     this.syncData(this.props.currentChannel);
    //   }, 60000);
    // }
    // syncData = currentChannel => {
    //   this.props.getBlocksPerMin(currentChannel);
    //   this.props.getBlocksPerHour(currentChannel);
    //   this.props.getTransactionPerMin(currentChannel);
    //   this.props.getTransactionPerHour(currentChannel);
  }

  timeDataSetup = (chartData = []) => {
    let displayData;
    let dataMax = 0;
    displayData = chartData.map(data => {
      if (parseInt(data.count, 10) > dataMax) {
        dataMax = parseInt(data.count, 10);
      }

      return {
        datetime: moment(data.datetime)
          .tz(moment.tz.guess())
          .format('h:mm A'),
        count: data.count
      };
    });

    dataMax = dataMax + 5;

    return {
      displayData: displayData,
      dataMax: dataMax
    };
  };

  toggle = tab => {
    this.setState({
      activeTab: tab
    });
  };

  render() {
    let { lineData } = this.state;
    let {
      transactionperHour,
      transactionPerMin,
      blockPerHour,
      blockPerMin
    } = this.props;

    return (
      <Card>
        <CardHeader>
          Line Chart
          <div className="card-actions">
            <a href="http://www.chartjs.org">
              <small className="text-muted">docs</small>
            </a>
          </div>
        </CardHeader>
        <CardBody>
          <div className="chartCard">
            <Nav tabs>
              <NavItem>
                <NavLink
                  className={classnames({
                    active: this.state.activeTab === '1'
                  })}
                  onClick={() => {
                    this.toggle('1');
                  }}
                >
                  BLOCKS / HOUR
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({
                    active: this.state.activeTab === '2'
                  })}
                  onClick={async () => {
                    this.toggle('2');
                  }}
                >
                  BLOCKS / MIN
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({
                    active: this.state.activeTab === '3'
                  })}
                  onClick={() => {
                    this.toggle('3');
                  }}
                >
                  TX / HOUR
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({
                    active: this.state.activeTab === '4'
                  })}
                  onClick={() => {
                    this.toggle('4');
                  }}
                >
                  TX / MIN
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent
              activeTab={this.state.activeTab}
              className="activeChartTab"
            >
              <TabPane tabId="1" className="TabPane">
                <TimeChart chartData={this.timeDataSetup(blockPerHour)} />
              </TabPane>
              <TabPane tabId="2" className="TabPane">
                <TimeChart chartData={this.timeDataSetup(blockPerMin)} />
              </TabPane>
              <TabPane tabId="3" className="TabPane">
                <TimeChart chartData={this.timeDataSetup(transactionperHour)} />
              </TabPane>
              <TabPane tabId="4" className="TabPane">
                <TimeChart chartData={this.timeDataSetup(transactionPerMin)} />
              </TabPane>
            </TabContent>
          </div>
        </CardBody>
      </Card>
    );
  }
}

// export default ChartStats;
