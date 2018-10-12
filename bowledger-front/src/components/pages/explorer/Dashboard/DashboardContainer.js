import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
// import * as chartActions from 'store/modules/charts';
// import * as tableActions from 'store/modules/tables';

import DashboardTemplate from './DashboardTemplate';

import DashboardHead from './DashboardHead';
import PeersHelth from './PeersHelth';
import ChartStats from './ChartStats';
import TimelineStream from './TimelineStream';
import OrgPieChart from './OrgPieChart';
import Spinners from 'components/common/Spinners';

//import { Promise } from 'core-js';

class DashBoardContainer extends Component {
  state = {
    notifications: []
  };

  setNotifications = blockList => {
    let notificationsArr = [];
    if (blockList !== undefined) {
      for (let i = 0; i < 3 && blockList && blockList[i]; i++) {
        const block = blockList[i];
        const notify = {
          title: `Block ${block.blocknum} `,
          type: 'block',
          time: block.createdt,
          txcount: block.txcount,
          datahash: block.datahash,
          blockhash: block.blockhash
        };
        notificationsArr.push(notify);
      }
    }
    this.setState({ notifications: notificationsArr });
  };
  componentDidMount() {
    //console.log('cdm');
    this.setNotifications(this.props.blockList);
  }
  componentDidUpdate(prevProps, prevState) {
    //console.log('cdu::', prevProps, this.props);
    if (prevProps.blockList !== this.props.blockList) {
      this.setNotifications(this.props.blockList);
    }
  }
  render() {
    const {
      isLoading,
      dashStats,
      peerStatus,
      transactionByOrg,
      transactionPerHour,
      transactionPerMin,
      blockPerHour,
      blockPerMin
    } = this.props;
    return (
      <div>
        {isLoading ? (
          <Spinners />
        ) : (
          <div>
            <DashboardTemplate
              dashboardHead={<DashboardHead dashStats={dashStats} />}
              peersHelth={<PeersHelth peerStatus={peerStatus} />}
              chartStats={
                <ChartStats
                  transactionperHour={transactionPerHour}
                  transactionPerMin={transactionPerMin}
                  blockPerHour={blockPerHour}
                  blockPerMin={blockPerMin}
                />
              }
              timelineStream={
                <TimelineStream
                  notifications={this.state.notifications}
                  blockList={this.props.blockList}
                />
              }
              orgPieChart={<OrgPieChart transactionByOrg={transactionByOrg} />}
            />
          </div>
        )}
      </div>
    );
  }
}

export default connect(
  state => ({
    isLoading: state.base.isLoading,
    // channel: state.charts.channel,
    // channelList: state.charts.channelList,
    blockList: state.tables.blockList,
    dashStats: state.charts.dashStats,
    peerStatus: state.charts.peerStatus,
    transactionByOrg: state.charts.transactionByOrg,
    transactionPerHour: state.charts.transactionPerHour,
    transactionPerMin: state.charts.transactionPerMin,
    blockPerHour: state.charts.blockPerHour,
    blockPerMin: state.charts.blockPerMin
  }),
  null
  // dispatch => ({
  //   ChartActions: bindActionCreators(chartActions, dispatch),
  //   TableActions: bindActionCreators(tableActions, dispatch)
  // })
)(DashBoardContainer);
