/*
*SPDX-License-Identifier: Apache-2.0
*/

const EventEmitter = require('events').EventEmitter;

const blockMetrics = require('./metrics').blockMetrics;
const txMetrics = require('./metrics').txMetrics;

class BlockListener extends EventEmitter {
  constructor(blockScanner) {
    super();
    this.blockScanner = blockScanner;

    this.on('createBlock', (block) => {
      blockMetrics.push(1);
      txMetrics.push(block.data.data.length);
    });

    this.on('syncChaincodes', () => {
      blockScanner.syncChaincodes();
    });

    this.on('syncPeerlist', () => {
      blockScanner.syncPeerlist();
    });

    this.on('syncChannels', () => {
      blockScanner.syncChannels();
    });
    // ====================Orderer BE-303=====================================
    this.on('syncOrdererlist', () => {
      blockScanner.syncOrdererlist();
    });
    // ====================Orderer BE-303=====================================
    this.on('syncBlock', async () => {
      await blockScanner.syncBlock();
      blockScanner.syncChannelEventHubBlock();
    });
  }
}

module.exports = BlockListener;
