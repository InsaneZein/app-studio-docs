/* global */
const webpack = require('webpack');
const { resolve } = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const config = require('@redhat-cloud-services/frontend-components-config');

const insightsProxy = {
  https: false,
  ...(process.env.BETA && { deployment: 'beta/apps' }),
};

const webpackProxy = {
  deployment: process.env.BETA ? 'beta/apps' : 'apps',
  useProxy: true,
  proxyVerbose: true,
  env: 'stage-beta',
  // localChrome: '/Users/hq/SoftwareDev/arivepr/insights-chrome/build/',
  appUrl: process.env.BETA ? ['/beta/hac/app-studio-docs'] : ['/hac/app-studio-docs'],
};

const { config: webpackConfig, plugins } = config({
  rootFolder: resolve(__dirname, '../'),
  debug: true,
  sassPrefix: '.rbac, .my-user-access',
  client: { overlay: false },
  ...(process.env.PROXY ? webpackProxy : insightsProxy),
});

plugins.push(
  require('@redhat-cloud-services/frontend-components-config/federated-modules')({
    root: resolve(__dirname, '../'),
  })
);

plugins.push(
  new webpack.DefinePlugin({
    API_BASE: JSON.stringify('/api/rbac/v1'),
  })
);

module.exports = (env) => {
  env && env.analyze === 'true' && plugins.push(new BundleAnalyzerPlugin());

  module.exports = {
    module: {
      rules: [
        {
          test: /.mdx?$/,
          use: ['babel-loader',
                '@mdx-js/loader']
        }
      ]
    }
  }

  return { ...webpackConfig, plugins };
};