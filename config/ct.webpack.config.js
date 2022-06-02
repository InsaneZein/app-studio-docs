const { resolve } = require('path');

module.exports = async () => {
  const { default: remarkGfm } = await import('remark-gfm');

  const webpackConfig = {
    entry: resolve(__dirname, '../src/AppEntry.js'),
    output: {
      path: resolve(__dirname, 'dist'),
      filename: 'bundle.js',
    },
    resolve: {
      extensions: ['*', '.js', '.jsx'],
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          },
        },
        {
          test: /\.s?[ac]ss$/,
          use: ['style-loader', 'css-loader', 'sass-loader'],
        },
        {
          test: /\.(jpg|png|svg|gif|woff|woff2)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
                outputPath: '../assets/images/',
              },
            },
          ],
        },
        {
          test: /\.mdx?$/,
          use: [
            {
              loader: '@mdx-js/loader',
              /** @type {import('@mdx-js/loader').Options} */
              options: {
                remarkPlugins: [remarkGfm],
                providerImportSource: '@mdx-js/react',
              },
            },
          ],
        },
      ],
    },
  };

  return webpackConfig;
};
