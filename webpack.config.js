const path = require('path');

module.exports = {
  mode: 'production',
  entry: './client/components/App.jsx',
  output: {
    path: path.resolve(__dirname, './public'),
    filename: 'bundle.js',
  },
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-react', '@babel/preset-env'],
          plugins: [['babel-plugin-styled-components', { fileName: false }]],
        },
      },
    }],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.es6'],
  },
};
