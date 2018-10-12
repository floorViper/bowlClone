/**
 *    SPDX-License-Identifier: Apache-2.0
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as tableActions from 'store/modules/tables';
import { Modal } from 'reactstrap';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import matchSorter from 'match-sorter';
//import FontAwesome from 'react-fontawesome';
import find from 'lodash/find';
import Spinners from 'components/common/Spinners';
import BlockView from 'components/common/BlockView';
import TransactionView from 'components/common/TransactionView';

class BlockTables extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dialogOpen: false,
      loading: false,
      dialogOpenBlockHash: false,
      blockHash: {},
      blockModal: false,
      transactionModal: false
    };
  }

  handleDialogOpen = async tid => {
    console.log('ppppb', this.props);
    await this.props.TableActions.getTransaction(
      this.props.channel.currentChannel,
      tid
    );
    console.log('ppppa::', this.props.transaction);
    //this.setState({ dialogOpen: true });
    this.setState({ transactionModal: true });
    //this.toggleModal('transactionModal');
  };

  handleDialogClose = () => {
    //this.props.removeTransactionInfo();
    //this.setState({ dialogOpen: false });
    this.setState({ transactionModal: false });
    //this.toggleModal('transactionModal');
  };

  toggleModal(modalName) {
    this.setState({
      [modalName]: !this.state[modalName]
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
    this.toggleModal('blockModal');
  };

  handleDialogCloseBlockHash = () => {
    this.setState({ dialogOpenBlockHash: false });
    this.toggleModal('blockModal');
  };

  handleEye = (row, val) => {
    const data = Object.assign({}, this.state.selection, { [row.index]: !val });
    this.setState({ selection: data });
  };

  componentDidMount() {
    if (this.props.blockList === undefined) {
      return;
    }
    const selection = {};
    this.props.blockList.forEach(element => {
      selection[element.blocknum] = false;
    });
    this.setState({ selection: selection });
  }

  reactTableSetup = () => {
    return [
      {
        Header: 'Block Number',
        accessor: 'blocknum',
        filterMethod: (filter, rows) =>
          matchSorter(
            rows,
            filter.value,
            { keys: ['blocknum'] },
            { threshold: matchSorter.rankings.SIMPLEMATCH }
          ),
        filterAll: true,
        width: 150
      },
      {
        Header: 'Channel Name',
        accessor: 'channelname',
        filterMethod: (filter, rows) =>
          matchSorter(
            rows,
            filter.value,
            { keys: ['channelname'] },
            { threshold: matchSorter.rankings.SIMPLEMATCH }
          ),
        filterAll: true
      },
      {
        Header: 'Number of Tx',
        accessor: 'txcount',
        filterMethod: (filter, rows) =>
          matchSorter(
            rows,
            filter.value,
            { keys: ['txcount'] },
            { threshold: matchSorter.rankings.SIMPLEMATCH }
          ),
        filterAll: true,
        width: 150
      },
      {
        Header: 'Data Hash',
        accessor: 'datahash',
        filterMethod: (filter, rows) =>
          matchSorter(
            rows,
            filter.value,
            { keys: ['datahash'] },
            { threshold: matchSorter.rankings.SIMPLEMATCH }
          ),
        filterAll: true
      },
      {
        Header: 'Block Hash',
        accessor: 'blockhash',
        Cell: row => (
          <span>
            <a
              className="partialHash"
              onClick={() => this.handleDialogOpenBlockHash(row.value)}
              href="#/blocks"
            >
              <div className="fullHash" id="showTransactionId">
                {row.value}
              </div>{' '}
              {row.value.slice(0, 6)} {!row.value ? '' : '... '}
            </a>{' '}
          </span>
        ),
        filterMethod: (filter, rows) =>
          matchSorter(
            rows,
            filter.value,
            { keys: ['blockhash'] },
            { threshold: matchSorter.rankings.SIMPLEMATCH }
          ),
        filterAll: true
      },
      {
        Header: 'Previous Hash',
        accessor: 'prehash',
        filterMethod: (filter, rows) =>
          matchSorter(
            rows,
            filter.value,
            { keys: ['prehash'] },
            { threshold: matchSorter.rankings.SIMPLEMATCH }
          ),
        filterAll: true,
        width: 150
      },
      {
        Header: 'Transactions',
        accessor: 'txhash',
        Cell: row => (
          <ul>
            {row.value.map(tid => (
              <li
                key={tid}
                style={{
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis'
                }}
              >
                <a
                  className="partialHash"
                  onClick={() => this.handleDialogOpen(tid)}
                  href="#/blocks"
                >
                  <div className="fullHash" id="showTransactionId">
                    {tid}
                  </div>{' '}
                  {tid.slice(0, 6)} {!tid ? '' : '... '}
                </a>
              </li>
            ))}
          </ul>
        ),
        filterMethod: (filter, rows) =>
          matchSorter(
            rows,
            filter.value,
            { keys: ['txhash'] },
            { threshold: matchSorter.rankings.SIMPLEMATCH }
          ),
        filterAll: true
      }
    ];
  };

  render() {
    const { isLoading, blockList } = this.props;
    return isLoading || !blockList ? (
      <div>
        {' '}
        <Spinners />
      </div>
    ) : (
      <div>
        <ReactTable
          data={this.props.blockList}
          columns={this.reactTableSetup()}
          defaultPageSize={10}
          className="-striped -highlight"
          filterable
          minRows={0}
          showPagination={this.props.blockList.length < 5 ? false : true}
        />
        <Modal
          isOpen={this.state.blockModal}
          toggle={() => {
            this.setState({
              blockModal: !this.state.blockModal
            });
          }}
          className={'modal-lg ' + this.props.className}
        >
          <BlockView
            blockHash={this.state.blockHash}
            onClose={this.handleDialogCloseBlockHash}
          />
        </Modal>
        <Modal
          isOpen={this.state.transactionModal}
          toggle={() => {
            this.setState({
              transactionModal: !this.state.transactionModal
            });
          }}
          className={'modal-lg ' + this.props.className}
        >
          <TransactionView
            transaction={this.props.transaction}
            onClose={this.handleDialogClose}
          />
        </Modal>
        {/* <Dialog
          open={this.state.dialogOpen}
          onClose={this.handleDialogClose}
          fullWidth={true}
          maxWidth={'md'}
        >
          <TransactionView
            transaction={this.props.transaction}
            onClose={this.handleDialogClose}
          />
        </Dialog>

        <Dialog
          open={this.state.dialogOpenBlockHash}
          onClose={this.handleDialogCloseBlockHash}
          fullWidth={true}
          maxWidth={'md'}
        >
          <BlockView
            blockHash={this.state.blockHash}
            onClose={this.handleDialogCloseBlockHash}
          />
        </Dialog> */}
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
)(BlockTables);
