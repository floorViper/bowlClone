import React from 'react';
import { Row, Col, CardGroup } from 'reactstrap';
import Widget04 from './Widget04';

const DashboardHead = ({ dashStats }) => {
  if (dashStats == undefined) {
    console.log('return head');
    return null;
  }
  //console.log('pprrrooopp', dashStats);
  return (
    <div>
      <CardGroup className="mb-4">
        <Widget04
          icon="fa fa-cube fa-lg"
          color="info"
          header={dashStats.latestBlock}
          value="25"
        >
          Blocks
        </Widget04>
        <Widget04
          icon="fa fa-list-alt fa-lg"
          color="success"
          header={dashStats.txCount}
          value="25"
        >
          Transactions
        </Widget04>
        <Widget04
          icon="fa fa-users fa-lg"
          color="warning"
          header={dashStats.peerCount}
          value="25"
        >
          Nodes
        </Widget04>
        <Widget04
          icon="fa fa-handshake-o fa-lg mt-1"
          color="primary"
          header={dashStats.chaincodeCount}
          value="25"
        >
          ChainCodes
        </Widget04>
      </CardGroup>
    </div>
  );
};

export default DashboardHead;
