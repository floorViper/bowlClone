import { createAction, handleActions } from 'redux-actions';
import { pender } from 'redux-pender';
import * as api from 'api/api';

const namespaces = 'charts';

/* Channel  */
const CHANNEL = `${namespaces}/CHANNEL`;
const CHANNEL_LIST = `${namespaces}/CHANNEL_LIST`;
/* Analytics Charts */
const BLOCK_CHART_MIN = `${namespaces}/BLOCK_CHART_MIN`;
const BLOCK_CHART_HOUR = `${namespaces}/BLOCK_CHART_HOUR`;
const TRANSACTION_CHART_MIN = `${namespaces}/TRANSACTION_CHART_MIN`;
const TRANSACTION_CHART_HOUR = `${namespaces}/TRANSACTION_CHART_HOUR`;
/* Dash Stats */
const DASHBOARD_STATS = `${namespaces}/DASHBOARD_STATS`;

/* Pie Graph */
const TRANSACTION_CHART_ORG = `${namespaces}/TRANSACTION_CHART_ORG`;

/* Notification */
// const NOTIFICATION_LOAD = `${namespaces}/NOTIFICATION_LOAD`;

const PEER_STATUS = `${namespaces}/PEER_STATUS`;

/* Actions */
export const getChannel = createAction(CHANNEL, api.channel);
export const getChannelList = createAction(CHANNEL_LIST, api.channelList);
export const getBlockPerHour = createAction(BLOCK_CHART_HOUR, api.blockPerHour);
export const getBlockPerMin = createAction(BLOCK_CHART_MIN, api.blockPerMin);
export const getDashStats = createAction(DASHBOARD_STATS, api.dashStats);
export const getPeerStatus = createAction(PEER_STATUS, api.peerStatus);
export const getTransactionByOrg = createAction(
  TRANSACTION_CHART_ORG,
  api.transactionByOrg
);
export const getTransactionPerHour = createAction(
  TRANSACTION_CHART_HOUR,
  api.transactionPerHour
);
export const getTransactionPerMin = createAction(
  TRANSACTION_CHART_MIN,
  api.transactionPerMin
);
/* state */
const initialState = {};

/* reducer */
export default handleActions(
  {
    ...pender({
      type: CHANNEL,
      onSuccess: (state, action) => {
        return { ...state, channel: action.payload.data };
      }
    }),
    ...pender({
      type: CHANNEL_LIST,
      onSuccess: (state, action) => {
        return { ...state, channelList: action.payload.data.channels };
      }
    }),
    ...pender({
      type: BLOCK_CHART_HOUR,
      onSuccess: (state, action) => {
        console.log('2');
        return { ...state, blockPerHour: action.payload.data.rows };
      }
    }),
    ...pender({
      type: BLOCK_CHART_MIN,
      onSuccess: (state, action) => {
        console.log('3');
        return { ...state, blockPerMin: action.payload.data.rows };
      }
    }),
    ...pender({
      type: DASHBOARD_STATS,
      onSuccess: (state, action) => {
        console.log('6');
        return { ...state, dashStats: action.payload.data };
      }
    }),
    ...pender({
      type: PEER_STATUS,
      onSuccess: (state, action) => {
        console.log('8');
        return { ...state, peerStatus: action.payload.data.peers };
      }
    }),
    ...pender({
      type: TRANSACTION_CHART_ORG,
      onSuccess: (state, action) => {
        console.log('9');
        return { ...state, transactionByOrg: action.payload.data.rows };
      }
    }),
    ...pender({
      type: TRANSACTION_CHART_HOUR,
      onSuccess: (state, action) => {
        console.log('12');
        const { rows } = action.payload.data;
        return { ...state, transactionPerHour: rows };
      }
    }),
    ...pender({
      type: TRANSACTION_CHART_MIN,
      onSuccess: (state, action) => {
        console.log('11');
        const { rows } = action.payload.data;
        return { ...state, transactionPerMin: rows };
      }
    })
  },
  initialState
);

// onPending: (state, action) => {
//   console.log('pendersPending');
//   console.log(state);
//   return state;
// },
// onFailure: (state, action) => {
//   console.log('penderFail');
//   return state;
// },

// const channelReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case CHANNEL: {
//       return action.payload.channel;
//     }
//     case CHANGE_CHANNEL: {
//       return action.payload.channel;
//     }
//     default: {
//       return state;
//     }
//   }
// };
