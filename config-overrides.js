// module.exports = function override(config) {
//     config.resolve.fallback = {
//       path: require.resolve("path-browserify"),
//       os: require.resolve("os-browserify/browser"),
//       crypto: require.resolve("crypto-browserify"),
//     };
//     return config;
//   };
const webpack = require("webpack");

module.exports = function override(config) {
  config.resolve.fallback = {
    path: require.resolve("path-browserify"),
    buffer: require.resolve("buffer/"),
    stream: require.resolve("stream-browserify"),
    crypto: require.resolve("crypto-browserify"),
    assert: require.resolve("assert/"),
    process: require.resolve("process/browser"),
    os: require.resolve("os-browserify/browser"),
  };

  config.plugins = (config.plugins || []).concat([
    new webpack.ProvidePlugin({
      Buffer: ["buffer", "Buffer"],
      process: "process/browser",
    }),
  ]);

  return config;
};
