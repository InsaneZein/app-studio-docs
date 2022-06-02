const { resolve } = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const config = require('@redhat-cloud-services/frontend-components-config');

const { config: webpackConfig, plugins } = config({
  rootFolder: resolve(__dirname, '../'),
  sassPrefix: '.app-studio-docs, .appStudioDocs',
});

plugins.push(
  require('@redhat-cloud-services/frontend-components-config/federated-modules')({
    root: resolve(__dirname, '../'),
  })
);

module.exports = async (env) => {
  const { default: remarkGfm } = await import('remark-gfm');
  env && env.analyze === 'true' && plugins.push(new BundleAnalyzerPlugin());

  webpackConfig.module.rules.push({
    test: /\.mdx?$/,
    use: [
      {
        loader: '@mdx-js/loader',
        /** @type {import('@mdx-js/loader').Options} */
        options: {
          remarkPlugins: [remarkGfm],
        },
      },
    ],
  });
  return { ...webpackConfig, plugins };
};
