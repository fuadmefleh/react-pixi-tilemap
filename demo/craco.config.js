module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // Webpack 5 doesn't polyfill Node.js modules by default
      // We need to configure fallbacks for modules used by tmx-parser and other dependencies
      webpackConfig.resolve.fallback = {
        ...webpackConfig.resolve.fallback,
        fs: false,
        path: false,
        zlib: false,
        buffer: false,
        stream: false,
        util: false,
      };

      // Fix for @pixi/react issue with react-reconciler/constants
      // https://github.com/pixijs/pixi-react/issues/421
      webpackConfig.module.rules.push({
        test: /\.m?js$/,
        resolve: {
          fullySpecified: false,
        },
      });

      return webpackConfig;
    },
  },
};
