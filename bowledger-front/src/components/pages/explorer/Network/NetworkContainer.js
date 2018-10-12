import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
// import * as chartActions from 'store/modules/charts';
// import * as tableActions from 'store/modules/tables';
import Peers from './Peers';
import Spinners from 'components/common/Spinners';

//import { Promise } from 'core-js';

class NetworkContainer extends Component {
  render() {
    const { isLoading, peerList } = this.props;
    console.log('peer::', peerList, isLoading);

    return (
      <div>
        {isLoading || !peerList ? <Spinners /> : <Peers peerList={peerList} />}
      </div>
    );
  }
}

export default connect(
  state => ({
    isLoading: state.base.isLoading,
    peerList: state.tables.peerList
  }),
  null
)(NetworkContainer);
