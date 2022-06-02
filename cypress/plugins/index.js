module.exports = async (on, config) => {
  if (config.testingType === 'component') {
    const { startDevServer } = require('@cypress/webpack-dev-server');
    const webpackConfig = await require('../../config/ct.webpack.config.js')();

    on('dev-server:start', (options) => startDevServer({ options, webpackConfig }));
  }
};
