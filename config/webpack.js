const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = (env, { mode }) => ({
  entry: {
    main: './src/index.ts'
  },
  mode: mode,
  devtool: mode === 'production' ? 'source-map' : 'inline-source-map',
  output: {
    filename: '[name]-bundle.js',
    path: path.resolve(__dirname, '../dist')
  },
  devServer: {
    port: 8080,
    static: 'dist',
    client: {
      overlay: true
    }
  },
  module: {
    rules: [
      {
        test: /\.ts$/i,
        use: 'ts-loader',
        exclude: /(node_modules)/
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      hash: true,
      template: './src/index.ejs',
      filename: '../dist/index.html'
    }),
    new CleanWebpackPlugin()
  ]
})