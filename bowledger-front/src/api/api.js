import axios from 'axios';
//import queryString from 'query-string';

//charts
export const channel = () => axios.get('/api/curChannel');
export const channelList = () => axios.get('/api/channels');
export const blockPerHour = channel =>
  axios.get(`/api/blocksByHour/${channel}/1`);
export const blockPerMin = channel =>
  axios.get(`/api/blocksByMinute/${channel}/1`);
export const dashStats = channel => axios.get(`/api/status/${channel}`);
export const peerStatus = channel => axios.get(`/api/peersStatus/${channel}`);
export const transactionByOrg = channel => axios.get(`/api/txByOrg/${channel}`);

//tables
export const blockList = channel =>
  axios.get(`/api/blockAndTxList/${channel}/0`);

export const chaincodeList = channel => axios.get(`/api/chaincode/${channel}`);

export const channels = () => axios.get('/api/channels/info');

export const peerList = channel => axios.get(`/api/peers/${channel}`);

export const transaction = (channel, transactionId) =>
axios.get(`/api/transaction/${channel}/${transactionId}`);

export const transactionList = channel =>
  axios.get(`/api/txList/${channel}/0/0/`);

export const transactionPerHour = channel =>
  axios.get(`/api/txByHour/${channel}/1`);

export const transactionPerMin = channel =>
  axios.get(`/api/txByMinute/${channel}/1`);

// const channel = () => dispatch =>
//   get('/api/curChannel')
//     .then(resp => {
//       console.log('resp::', resp);
//       dispatch(actions.getChannel(resp));
//     })
//     .catch(error => {
//       console.error(error);
//     });
