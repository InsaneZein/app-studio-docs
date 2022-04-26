const { resolve } = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const config = require('@redhat-cloud-services/frontend-components-config');
const { default: remarkGfm } = require('remark-gfm');

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
  sassPrefix: '.app-studio-docs, .appStudioDocs',
  debug: true,
  client: { overlay: false },
  ...webpackProxy,
});

plugins.push(
  require('@redhat-cloud-services/frontend-components-config/federated-modules')({
    root: resolve(__dirname, '../'),
  })
);

webpackConfig.module.rules.push({
  test: /\.mdx?$/,
  use: [
    {
      loader: '@mdx-js/loader',
      /** @type {import('@mdx-js/loader').Options} */
      options: {
        plugins: [
          { remarkPlugins: [remarkGfm] },
        ]
      }, // we will need some of this
    },
  ],
});

module.exports = (env) => {
  env && env.analyze === 'true' && plugins.push(new BundleAnalyzerPlugin());
  return { ...webpackConfig, plugins };
};
