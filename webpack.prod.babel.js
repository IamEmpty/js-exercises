import '@babel/polyfill';
import path from 'path';
import webpack from 'webpack';
import SizePlugin from 'size-plugin';
import MinifyPlugin from 'babel-minify-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ScriptExtHtmlWebpackPlugin from 'script-ext-html-webpack-plugin';
import { GenerateSW } from 'workbox-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import OptimizeCssAssetsPlugin from 'optimize-css-assets-webpack-plugin';

const plugins = [
  new SizePlugin(),
  new CleanWebpackPlugin(['dist'], {
    beforeEmit: true,
  }),
  new CopyWebpackPlugin([
    {
      context: 'static',
      from: '**/*.{png,svg,ico}',
    },
    {
      from: 'manifest.json',
      toType: 'dir',
    },
  ]),
  new MinifyPlugin(),
  new HtmlWebpackPlugin({
    template: 'src/index-template.html',
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeScriptTypeAttributes: true,
    },
  }),
  new ScriptExtHtmlWebpackPlugin({
    defaultAttribute: 'defer',
  }),
  new webpack.HashedModuleIdsPlugin(),
  new MiniCssExtractPlugin({
    filename: '[contenthash].min.css',
    chunkFilename: '[id].[contenthash].min.css',
  }),
  new GenerateSW({
    swDest: 'sw.js',
    clientsClaim: true,
    skipWaiting: true,
  }),
];

const module = {
  rules: [
    {
      test: /\.(js|jsx)$/,
      exclude: /(node_modules)/,
      use: {
        loader: 'babel-loader',
      },
    },
    {
      test: /\.css$/,
      use: [
        MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: {
            modules: true,
          },
        },
      ],
    },
  ],
};

const config = {
  mode: 'production',
  entry: {
    app: ['@babel/polyfill', './src/index.tsx'],
  },
  plugins,
  module,
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  output: {
    filename: '[name].[chunkhash].min.js',
    chunkFilename: '[name].[chunkhash].min.js',
    path: path.resolve(__dirname, 'dist'),
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: false,
      }),
      new OptimizeCssAssetsPlugin({}),
    ],
  },
};

export default config;
