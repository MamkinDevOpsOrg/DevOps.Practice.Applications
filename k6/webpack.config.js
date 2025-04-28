const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/load_script_rds.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'load_script_rds.bundle.js',
    libraryTarget: 'commonjs',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
        exclude: /node_modules/,
      },
    ],
  },
  target: 'web',
  externals: /k6(\/.*)?/,
};
