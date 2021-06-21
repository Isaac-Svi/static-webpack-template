const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCSSExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')

module.exports = {
  entry: path.resolve(__dirname, '../src/script.js'),
  output: {
    filename: 'bundle.[contenthash].js',
    path: path.resolve(__dirname, '../dist'),
  },
  devtool: 'source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../src/index.html'),
      minify: true,
    }),
    new CopyWebpackPlugin({
      patterns: [{ from: path.resolve(__dirname, '../static') }],
    }),
    new MiniCSSExtractPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.(html)$/,
        use: ['html-loader'],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.css$/,
        use: [MiniCSSExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /.(jpg|png|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: { outputPath: 'assets/images/' },
          },
        ],
      },
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        use: [
          {
            loader: 'file-loader',
            options: { outputPath: 'assets/fonts/' },
          },
        ],
      },
      {
        test: /.(glsl|vs|fs|vert|frag)$/,
        exclude: /node_modules/,
        use: ['raw-loader'],
      },
    ],
  },
}
