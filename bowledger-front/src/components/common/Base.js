import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as baseActions from 'store/modules/base';
import * as authActions from 'store/modules/auth';
import * as chartActions from 'store/modules/charts';
import * as tableActions from 'store/modules/tables';

class Base extends Component {
  initialize = async () => {
    const { AuthActions } = this.props;
    if (localStorage.logged === 'true') {
      AuthActions.tempLogin();
    }
    AuthActions.checkLogin();
  };

  getData = async () => {
    const { BaseActions, ChartActions, TableActions } = this.props;
    try {
      await BaseActions.loading();
      await ChartActions.getChannel();
      await ChartActions.getChannelList();
    } catch (e) {
      console.log(e);
    }
    const { currentChannel } = this.props.channel;
    console.log('channel....:', this.props.channel, this.props.channelList);
    let that = this;
    await Promise.all([
      TableActions.getBlockList(currentChannel),
      ChartActions.getBlockPerHour(currentChannel),
      ChartActions.getBlockPerMin(currentChannel),
      //TableActions.getChaincodeList(currentChannel), //
      //TableActions.getChannels(), //
      ChartActions.getDashStats(currentChannel),
      TableActions.getPeerList(currentChannel),
      ChartActions.getPeerStatus(currentChannel),
      ChartActions.getTransactionByOrg(currentChannel),
      //TableActions.getTransactionList(currentChannel), //
      ChartActions.getTransactionPerMin(currentChannel),
      ChartActions.getTransactionPerHour(currentChannel)
    ]).then(function(value) {
      console.log('완료', value);
      that.props.BaseActions.loading();
    });
  };

  componentDidMount() {
    this.initialize();
    this.getData();
  }

  render() {
    return (
      <div>
        {/* 전역적으로 사용하는컴포넌트들이 있다면 여기에서 렌더링합니다. */}
      </div>
    );
  }
}
export default connect(
  state => ({
    channel: state.charts.channel,
    channelList: state.charts.channelList
    // blockList: state.tables.blockList,
    // dashStats: state.charts.dashStats,
    // peerStatus: state.charts.peerStatus,
    // transactionByOrg: state.charts.transactionByOrg,
    // transactionPerHour: state.charts.transactionPerHour,
    // transactionPerMin: state.charts.transactionPerMin,
    // blockPerHour: state.charts.blockPerHour,
    // blockPerMin: state.charts.blockPerMin
  }),
  dispatch => ({
    BaseActions: bindActionCreators(baseActions, dispatch),
    AuthActions: bindActionCreators(authActions, dispatch),
    ChartActions: bindActionCreators(chartActions, dispatch),
    TableActions: bindActionCreators(tableActions, dispatch)
  })
)(Base);
