/**
 *    SPDX-License-Identifier: Apache-2.0
 */

import React, { Component } from 'react';
// import FontAwesome from "react-fontawesome";
import { CopyToClipboard } from 'react-copy-to-clipboard';

import { Table, Card, CardBody, CardTitle } from 'reactstrap';

const blockIcon = {
  color: '#79c879',
  margin: '20px'
};

class BlockView extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      loading: false
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ loading: false });
  }
  componentWillMount() {
    const theme = sessionStorage.getItem('toggleTheme') === 'true';
    this.setState({ toggleClass: theme });
  }
  handleClose = () => {
    this.props.onClose();
  };

  render() {
    const { blockHash } = this.props;
    if (!blockHash) {
      return (
        <div className={this.state.toggleClass ? 'dark-theme' : ''}>
          <Card>
            <CardTitle className="dialogTitle">
              <i className="fa fa-address-book fa-lg mt-4" />
              Block Details
            </CardTitle>
            <CardBody>
              <span className="loading-wheel">
                {' '}
                loading..
                {/* <FontAwesome name="circle-o-notch" size="3x" spin /> */}
              </span>
            </CardBody>
          </Card>
        </div>
      );
    } else {
      return (
        <div className="dialog">
          <Card>
            <CardTitle className="dialogTitle">
              <i className="fa fa-cube fa-lg" />
              Block Details
              <button onClick={this.handleClose} className="closeBtn">
                {/* <FontAwesome name="close" /> */}
                <i className="fa fa-close fa-lg" />
              </button>
            </CardTitle>
            <CardBody>
              <Table striped hover responsive className="table-striped">
                <tbody>
                  <tr>
                    <th>Channel name:</th>
                    <td>{blockHash.channelname}</td>
                  </tr>
                  <tr>
                    <th>ID</th>
                    <td>{blockHash.id}</td>
                  </tr>
                  <tr>
                    <th>Block Number</th>
                    <td>{blockHash.blocknum}</td>
                  </tr>
                  <tr>
                    <th>Created at</th>
                    <td>{blockHash.createdt}</td>
                  </tr>

                  <tr>
                    <th>Number of Transactions</th>
                    <td>{blockHash.txcount}</td>
                  </tr>
                  <tr>
                    <th>Block Hash</th>
                    <td>
                      {blockHash.blockhash}
                      <button className="copyBtn">
                        <div className="copyMessage">Copy</div>
                        <CopyToClipboard text={blockHash.blockhash}>
                          <i className="fa fa-copy fa-lg" />
                        </CopyToClipboard>
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <th>Data Hash</th>
                    <td>
                      {blockHash.datahash}
                      <button className="copyBtn">
                        <div className="copyMessage">Copy</div>
                        <CopyToClipboard text={blockHash.datahash}>
                          <i className="fa fa-copy fa-lg" />
                        </CopyToClipboard>
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <th>Prehash</th>
                    <td>
                      {blockHash.prehash}
                      <button className="copyBtn">
                        <div className="copyMessage">Copy</div>
                        <CopyToClipboard text={blockHash.prehash}>
                          <i className="fa fa-copy fa-lg" />
                        </CopyToClipboard>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </div>
      );
    }
  }
}

export default BlockView;
