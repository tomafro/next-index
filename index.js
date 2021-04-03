const path = require("path");

module.exports = ({ ...nextConfig } = {}) => {
  return Object.assign({}, nextConfig, {
    webpack(config, options) {
      config.module.rules.push({
        test: /\.index/,
        use: [{
          loader: path.resolve(__dirname, "dist/loader"),
          options: config
        }]
      });

      if (typeof nextConfig.webpack === "function") {
        return nextConfig.webpack(config, options);
      }
      else {
        return config;
      }
    }
  });
};
