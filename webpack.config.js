const path = require('path');

module.exports = {
  entry: ['babel-polyfill', './client/app.js'] // assumes your entry point is the app.js in the client of your project folder
  mode: 'development',
  output: {
    path: path.join(__dirname, 'public'), // assumes your bundle.js will also be in the public of your project folder
    filename: 'bundle.js',
  },
  devtool: 'source-maps',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};
