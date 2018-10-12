/**
 *    SPDX-License-Identifier: Apache-2.0
 */
import { createAction, handleActions } from 'redux-actions';
import { pender } from 'redux-pender';
import * as api from 'api/api';
import moment from 'moment-timezone';

const namespaces = 'tables';

const BLOCK_LIST = `${namespaces}/BLOCK_LIST`;
const CHAINCODE_LIST = `${namespaces}/CHAINCODE_LIST`;
const CHANNELS = `${namespaces}/CHANNELS`;
const PEER_LIST = `${namespaces}/PEER_LIST`;
const TRANSACTION = `${namespaces}/TRANSACTION`;
const TRANSACTION_LIST = `${namespaces}/TRANSACTION_LIST`;

export const getBlockList = createAction(BLOCK_LIST, api.blockList);

export const getChaincodeList = createAction(CHAINCODE_LIST, api.chaincodeList);

export const getChannels = createAction(CHANNELS, api.channels);

export const getPeerList = createAction(PEER_LIST, api.peerList);

export const getTransaction = createAction(TRANSACTION, api.transaction);

export const getTransactionList = createAction(
  TRANSACTION_LIST,
  api.transactionList
);

const initialState = {};

export default handleActions(
  {
    ...pender({
      type: BLOCK_LIST,
      onSuccess: (state, action) => {
        console.log('1');
        return { ...state, blockList: action.payload.data.rows };
      }
    }),
    ...pender({
      type: CHAINCODE_LIST,
      onSuccess: (state, action) => {
        console.log('4');
        return { ...state, chaincodeList: action.payload.data.chaincode };
      }
    }),
    ...pender({
      type: CHANNELS,
      onSuccess: (state, action) => {
        console.log('5');
        const channels = action.payload.data.channels.map(item => {
          item.createdat = moment(item.createdat)
            .tz(moment.tz.guess())
            .format('M-D-YYYY h:mm A zz');
          return item;
        });
        return { ...state, channels };
      }
    }),
    ...pender({
      type: PEER_LIST,
      onSuccess: (state, action) => {
        console.log('7');
        return { ...state, peerList: action.payload.data.peers };
      }
    }),
    ...pender({
      type: TRANSACTION,
      onSuccess: (state, action) => {
        console.log('11');
        console.log(action.payload);
        const transaction = action.payload.data.row;
        // const transaction = action.payload.data.rows.map(item => {
        //   item.createdt = moment(item.createdt)
        //     .tz(moment.tz.guess())
        //     .format('M-D-YYYY h:mm A zz');
        //   return item;
        // });
        return { ...state, transaction };
      }
    }),
    ...pender({
      type: TRANSACTION_LIST,
      onSuccess: (state, action) => {
        console.log('10');
        console.log(action.payload);
        const transactionList = action.payload.data.rows.map(item => {
          item.createdt = moment(item.createdt)
            .tz(moment.tz.guess())
            .format('M-D-YYYY h:mm A zz');
          return item;
        });
        return { ...state, transactionList };
      }
    })
  },
  initialState
);

// export const blockListReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case BLOCK_LIST: {
//       return {
//         rows: action.payload.rows,
//         loaded: true,
//         errors: action.error
//       };
//     }
//     default: {
//       return state;
//     }
//   }
// };
