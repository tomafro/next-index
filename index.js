const path = require("path");

module.exports = ({ ...nextConfig } = {}) => {
  return Object.assign({}, nextConfig, {
    webpack(config, _options) {
      config.module.rules.push({
        test: /\.index/,
        use: [{
          loader: path.resolve(__dirname, "dist/loader"),
          options: config
        }]
      });
      return config;
    }
  });
};
