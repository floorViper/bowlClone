/*
*SPDX-License-Identifier: Apache-2.0
*/

const Platform = require('./fabric/Platform.js');

class PlatformBuilder {
  static async build(pltfrm) {
    if (pltfrm == 'fabric') {
      const platform = new Platform();
      await platform.initialize();
      return platform;
    }

    throw 'Invalid Platform';
  }
}

module.exports = PlatformBuilder;
