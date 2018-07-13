const path = require("path");

module.exports = {
  entry: {
    main: "./index.js"
  },
  output: {
    filename: "[name]-bundle.js",
    path: path.resolve(__dirname, "dist")
  },
  resolve: {
    modules: ["node_modules"]
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        query: {
          presets: [],
          plugins: ["transform-react-jsx"]
        }
      }
    ]
  }
};
