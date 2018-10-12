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

import classnames from 'classnames';
const line = {
  labels: [],
  datasets: [
    {
      label: 'dataset',
      fill: true,
      lineTension: 0.1,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: []
    }
  ]
};
export default class ChartStats extends Component {
  constructor(props) {
    console.log('constructor');
    super(props);
    this.state = {
      activeTab: '1',
      loading: false,
      lineData: {}
    };
  }
  // shouldComponentUpdate(nextProps, nextState) {
  //   return this.state.activeTab !== nextProps.activeTab;
  // }
  componentWillUpdate(nextProps, nextState) {}
  componentWillReceiveProps(nextProps) {
    // if (nextProps.currentChannel !== this.props.currentChannel) {
    //   this.syncData(nextProps.currentChannel);
    // }
  }

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

  timeDataSetup(chartData = [], ll) {
    console.log('log:::', ll);
    let dataMax = 0;
    let tmp = {
      labels: [],
      datasets: [
        {
          label: 'dataset',
          fill: true,
          lineTension: 0.1,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(75,192,192,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(75,192,192,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: []
        }
      ]
    };

    chartData.forEach(data => {
      if (parseInt(data.count, 10) > dataMax) {
        dataMax = parseInt(data.count, 10);
      }

      let datetime = moment(data.datetime)
        .tz(moment.tz.guess())
        .format('h:mm A');

      tmp.labels.push(datetime);
      //console.log('label::::::::', tmp.labels);
      tmp.datasets[0].data.push(data.count);
    });

    //dataMax = dataMax + 5;
    //console.log('tmp', tmp, 'line', line);
    //this.setState({ lineData: tmp });
    //console.log('sttldt::', this.state.lineData, this.state.activeTab);
    return tmp;
  }

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
                    //this.timeDataSetup(this.props.blockPerHour, 'bh');
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
                    //this.timeDataSetup(this.props.blockPerMin, 'bm');
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
                    //this.timeDataSetup(this.props.transactionPerHour, 'ph');
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
                {/* <LineChart lineData={lineData} /> */}
                <div className="chart-wrapper">
                  <Line
                    data={this.timeDataSetup(this.props.blockPerHour, 'bh')}
                    options={{
                      maintainAspectRatio: false
                    }}
                  />
                </div>
              </TabPane>
              <TabPane tabId="2" className="TabPane">
                <div className="chart-wrapper">
                  <Line
                    data={this.timeDataSetup(this.props.blockPerMin, 'bm')}
                    options={{
                      maintainAspectRatio: false
                    }}
                  />
                </div>
              </TabPane>
              <TabPane tabId="3" className="TabPane">
                <div className="chart-wrapper" />
                33
              </TabPane>
              <TabPane tabId="4" className="TabPane">
                <div className="chart-wrapper" />
                44
              </TabPane>
            </TabContent>
          </div>
        </CardBody>
      </Card>
    );
  }
}

// export default ChartStats;
