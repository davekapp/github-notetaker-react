var webpack = require("webpack");

var envReplacements = new webpack.DefinePlugin({
  __SERVER_URL__:    JSON.stringify(process.env.SERVER_URL || 'http://localhost:3000'),
  __FIREBASE_HOST__: JSON.stringify(process.env.FIREBASE_HOST)
});

module.exports = {
  devtool: "source-map",

  entry: "./app/App.js",
  output: {
    filename: "public/bundle.js"
  },
  module: {
    loaders: [
      {test: /\.js$/, loader: 'jsx-loader?harmony'}
    ]
  },
  plugins: [envReplacements]
};
