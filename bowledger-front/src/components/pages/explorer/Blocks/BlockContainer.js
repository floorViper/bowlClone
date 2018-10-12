import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as tableActions from 'store/modules/tables';
import Spinners from 'components/common/Spinners';
import BlockTables from './BlockTables';

class BlockContainer extends Component {
  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log('SCU::', nextProps, this.props);
  //   return this.props.transaction !== nextProps.transaction;
  // }
  // componentDidUpdate(prevProps, prevState, snapshot) {
  //   console.log('blockcontaienrCDU::', prevProps, this.props);
  // }
  render() {
    const { isLoading, channel } = this.props;
    //console.log('channel', channel.currentChannel);
    return (
      <div>
        {isLoading || !channel ? (
          <Spinners />
        ) : (
          <BlockTables
            blockList={this.props.blockList}
            transection={this.props.transaction}
            getTransaction={this.props.TableActions.getTransaction}
            currentChannel={channel.currentChannel}
          />
        )}
      </div>
    );
  }
}

export default connect(
  state => ({
    isLoading: state.base.isLoading,
    blockList: state.tables.blockList,
    channel: state.charts.channel,
    // getTransaction: props.getTransaction,
    transaction: state.tables.transaction
  }),
  dispatch => ({
    TableActions: bindActionCreators(tableActions, dispatch)
  })
)(BlockContainer);
